"use server";

import { captions } from "./captions";

export async function getDataFromVideo(prev: any, form: FormData) {
  const apiKey = form.get("apiKey")?.toString() || process.env.OPENAI_API_KEY;
  const videoUrl = form.get("videoUrl")?.toString();
  const prompt = form.get("prompt")?.toString();
  const schemaString = form.get("schema")?.toString();
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
    });
    return { success: "Data generated", result };
  } catch (e: any) {
    return { error: e.message };
  }
}
