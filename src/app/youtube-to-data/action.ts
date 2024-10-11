"use server";

import { captions } from "./captions";

export async function getDataFromVideo(prev: any, form: FormData) {
  const apiKey = form.get("apiKey")?.toString() || process.env.OPENAI_API_KEY;
  const videoUrl = form.get("videoUrl")?.toString();
  const prompt = form.get("prompt")?.toString();
  const schemaString = form.get("schema")?.toString();
  const tokenId = form.get("tokenId")?.toString();
  const cookie = form.get("cookie")?.toString();
  if (!tokenId || !cookie) {
    if (process.env.NODE_ENV !== "development") {
      return { error: "YouTube cookie and X-YouTube-Identity-Token headers are required in production so YouTube captions can be fetched." };
    }
  }
  if (!apiKey || !videoUrl || !prompt || !schemaString) {
    return { error: "Missing required fields" };
  }
  let schemaObject: any | null = null;
  try {
    schemaObject = JSON.parse(schemaString);
  } catch (e) {
    return { error: "Invalid schema" };
  }
  try {
    const result = await captions({
      videoUrl: videoUrl,
      languages: ["en"],
      apiKey: apiKey,
      schemaObject,
      prompt,
      tokenId,
      cookie,
    });
    return { success: "Data generated", result };
  } catch (e: any) {
    return { error: e.message };
  }
}
