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
  tokenId,
  cookie,
}: {
  videoUrl: string;
  languages: string[];
  apiKey: string;
  schemaObject: any;
  prompt: string;
  cookie?: string;
  tokenId?: string;
}) {
  try {
    console.log({ cookie, tokenId });
    const info: ytdl.videoInfo = await new Promise((resolve, reject) => {
      const video = ytdl(videoUrl, {
        requestOptions: {
          headers: {
            cookie,
            // Optional. If not given, ytdl-core will try to find it.
            // You can find this by going to a video's watch page, viewing the source,
            // and searching for "ID_TOKEN".
            ...(tokenId ? { "x-youtube-identity-token": tokenId } : {}),
          },
        },
      });

      video.on("info", async (info: ytdl.videoInfo) => {
        console.log("title:", info.videoDetails.title);
        console.log("rating:", info.player_response.videoDetails.averageRating);
        console.log("uploaded by:", info.videoDetails.author.name);
        const captions = info.player_response.captions?.playerCaptionsTracklistRenderer.captionTracks;
        if (!captions || captions.length === 0) {
          throw new Error("No captions available for this video");
        }
        resolve(info);
      });

      video.on("error", (err) => {
        reject(err);
      });
    });

    console.log({ info });

    // const info = await video
    //   .getInfo(videoUrl, {
    //     requestOptions: {
    //       headers: {
    //         cookie,
    //         "x-youtube-identity-token": tokenId,
    //       },
    //     },
    //   })
    //   .catch((e) => {
    //     throw new Error(`Could not get video info: ${e.message}`);
    //   });

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
        return await processTrack({ track, info, lang, videoUrl, apiKey, schemaObject, prompt, cookie, tokenId });
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
  cookie,
  tokenId,
}: {
  track: ytdl.captionTrack;
  info: ytdl.videoInfo;
  lang: string;
  videoUrl: string;
  apiKey: string;
  schemaObject: string;
  prompt: string;
  cookie?: string;
  tokenId?: string;
}) {
  const captionsString = await downloadCaptions({ url: track.baseUrl, cookie, tokenId }).catch((e) => {
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

async function downloadCaptions({ url, cookie, tokenId }: { url: string; cookie?: string; tokenId?: string }): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(
        `${url}`,
        {
          headers: {
            cookie,
            ...(tokenId ? { "x-youtube-identity-token": tokenId } : {}),
          },
        },
        (res) => {
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
        }
      )
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
