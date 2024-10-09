"use server";

import { captions } from "./captions";

export async function getDataFromVideo(prev: any, form: FormData) {
  const videoUrl = form.get("videoUrl")?.toString();
  if (!videoUrl) {
    return { error: "Missing required fields" };
  }
  try {
    const result = await captions({
      videoUrl: videoUrl,
    });
    return { success: "Data generated", result };
  } catch (e: any) {
    return { error: e.message };
  }
}
