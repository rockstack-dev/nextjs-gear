import { YoutubeTranscript } from "youtube-transcript";

export async function captions({ videoUrl }: { videoUrl: string }) {
  try {
    const trascript = await YoutubeTranscript.fetchTranscript(videoUrl)
      .then((data) => {
        return data;
      })
      .catch((e) => {
        throw new Error(`Could not get video transcript: ${e.message}`);
      });
    console.log({
      transcriptLength: trascript.length,
    });
    return cleanText(trascript.map((t) => t.text).join(" "));
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
