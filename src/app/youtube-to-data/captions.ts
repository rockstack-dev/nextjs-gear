import ytdl from "ytdl-core";
import https from "https";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z, ZodTypeAny } from "zod";

export async function captions({
  videoUrl,
  languages,
  apiKey,
  schemaObject,
  prompt,
}: {
  videoUrl: string;
  languages: string[];
  apiKey: string;
  schemaObject: any;
  prompt: string;
}) {
  try {
    const info = await ytdl.getInfo(videoUrl).catch((e) => {
      throw new Error(`Could not get video info: ${e.message}`);
    });
    const tracks = info.player_response?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

    if (!tracks || tracks.length === 0) {
      console.log("No captions available for this video");
      return;
    }

    console.log(`Found captions for ${tracks.length} languages:`, tracks.map((t) => t.name.simpleText).join(", "));

    for (const lang of languages) {
      let track = tracks.find((t) => t.languageCode === lang);
      if (!track && tracks.length > 0) {
        track = tracks[0];
        console.log(`${lang}: Falling back to ${track.languageCode}`);
      }

      if (track) {
        return await processTrack({ track, info, lang, videoUrl, apiKey, schemaObject, prompt });
      } else {
        console.log("Could not find captions for", lang);
        throw new Error(`Could not find captions for ${lang}`);
      }
    }
  } catch (err: any) {
    console.error("Error fetching video info:", err);
    throw err;
  }
  return null;
}

async function processTrack({
  track,
  info,
  lang,
  videoUrl,
  apiKey,
  schemaObject,
  prompt,
}: {
  track: ytdl.captionTrack;
  info: ytdl.videoInfo;
  lang: string;
  videoUrl: string;
  apiKey: string;
  schemaObject: string;
  prompt: string;
}) {
  const captionsString = await downloadCaptions(track.baseUrl).catch((e) => {
    throw new Error(`Error downloading captions: ${e.message}`);
  });

  const cleanedText = cleanText(captionsString);

  const openai = createOpenAI({ apiKey });

  const schema = jsonSchemaToZod(schemaObject).catch((e: any) => {
    throw new Error(`Error converting schema to Zod: ${e.message}`);
  });
  const result = await generateObject({
    model: openai("gpt-4o-2024-08-06", {
      structuredOutputs: true,
    }),
    schema,
    prompt: `${prompt}

### TRANSCRIPT:
${cleanedText}`,
  });

  const videoData = {
    title: info.videoDetails.title,
    url: videoUrl,
    language: lang,
    thumbnails: info.videoDetails.thumbnails,
    author: {
      name: info.videoDetails.author.name,
      user: info.videoDetails.author.user,
      url: info.videoDetails.author.channel_url,
    },
    keywords: info.videoDetails.keywords,
    captions: cleanedText,
    extractedData: result.object,
  };

  return videoData;
}

async function downloadCaptions(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(`${url}`, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(data);
        });

        res.on("error", (err) => {
          reject(err);
        });
      })
      .on("error", (err) => reject(err));
  });
}

function cleanText(data: string) {
  return data
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/&amp;#39;/g, "'")
    .replace(/&amp;quot;/g, '"')
    .trim();
}

const determineSchemaType = (schema: any): string => {
  if (!schema.hasOwnProperty("type")) {
    if (Array.isArray(schema)) {
      return "array";
    } else {
      return typeof schema;
    }
  }
  return schema.type;
};

const jsonSchemaToZod = (schema: any): ZodTypeAny => {
  const type = determineSchemaType(schema);

  switch (type) {
    case "string":
      return z.string().nullable();
    case "number":
      return z.number().nullable();
    case "boolean":
      return z.boolean().nullable();
    case "array":
      return z.array(jsonSchemaToZod(schema.items)).nullable();
    case "object":
      const shape: Record<string, ZodTypeAny> = {};
      for (const key in schema) {
        if (key !== "type") {
          shape[key] = jsonSchemaToZod(schema[key]);
        }
      }
      return z.object(shape);
    default:
      throw new Error(`Unsupported schema type: ${type}`);
  }
};
