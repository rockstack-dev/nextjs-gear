import { YoutubeTranscript } from "youtube-transcript";
import { Innertube } from "youtubei.js/web";

export async function captions({ videoUrl }: { videoUrl: string }) {
  try {
    const youtube = await Innertube.create({
      lang: "en",
      location: "US",
      retrieve_player: false,
    });

    try {
      const info = await youtube.getInfo(videoUrl);
      const transcriptData = await info.getTranscript();
      console.log({
        transcriptData,
      });
      const transcriptSnippets = transcriptData.transcript.content?.body?.initial_segments.map((segment) => segment.snippet.text || "") || [];
      console.log({
        transcriptSnippets,
      });
      return cleanText(transcriptSnippets.join(" "));
    } catch (error) {
      console.error("Error fetching transcript:", error);
      throw error;
    }

    // const trascript = await YoutubeTranscript.fetchTranscript(videoUrl)
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((e) => {
    //     throw new Error(`Could not get video transcript: ${e.message}`);
    //   });
    // console.log({
    //   transcriptLength: trascript.length,
    // });
    // return cleanText(trascript.map((t) => t.text).join(" "));
  } catch (err: any) {
    console.error("Error fetching video info:", err);
    throw err;
  }
  return null;
}

function cleanText(data: string) {
  return data
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/&amp;#39;/g, "'")
    .replace(/&amp;quot;/g, '"')
    .trim();
}
