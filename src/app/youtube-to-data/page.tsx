"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";
import HomeBreadcrumb from "@/components/HomeBreadcrumb";
import { z, ZodTypeAny } from "zod";
import { Input } from "@/components/ui/input";
import { getDataFromVideo } from "./action";

const defaultSchema = {
  results: {
    type: "array",
    items: {
      type: "object",
      properties: {
        title: { type: "string" },
        summary: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        rating: { type: "string" },
        ratingFrom1To5: { type: "number" },
      },
    },
  },
};

export default function () {
  const [actionData, action, pending] = useActionState(getDataFromVideo, null);

  useEffect(() => {
    if (actionData?.error) {
      setError(actionData.error);
    } else if (actionData?.success) {
      setResult(actionData?.result);
      setError(undefined);
    }
  }, [actionData]);

  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<any>({});
  const [prompt, setPrompt] = useState<string>(`Extract data results (0, 1 or more) from a video transcript.
		
The rating system is:
- Awesometacular
- I'd buy it on Blu-Ray
- It's a good time, no alcohol required
- Better if you're drunk
- Not going to remember it in T-minus X
- Dogshit`);
  const [videoUrl, setVideoUrl] = useState<string>("https://www.youtube.com/watch?v=PJORkfmnmdY&t=1s");
  const [schema, setSchema] = useState<string>(JSON.stringify(defaultSchema, null, 2));

  function getObjSchema() {
    try {
      return JSON.parse(schema);
    } catch (e) {
      return null;
    }
  }
  return (
    <div className="mx-auto max-w-2xl space-y-3 p-12">
      <HomeBreadcrumb title="AI: Structured Outputs" />
      <h1 className="text-3xl font-bold">AI: Structured Outputs</h1>
      <div>
        <form action={action} className="space-y-2">
          <input type="hidden" name="action" value="submission" readOnly hidden />
          <Input
            name="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="OpenAI API Key"
            style={{ WebkitTextSecurity: "disc" } as any}
          />
          <Input name="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="YouTube video URL" required />
          <Textarea name="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Prompt" required />
          <Textarea name="schema" value={schema} onChange={(e) => setSchema(e.target.value)} rows={10} placeholder="Schema" required />

          {/* {JSON.stringify(zodSchema, null, 2)} */}

          <div className="flex justify-end">
            <Button type="submit" disabled={pending || !getObjSchema()} className={clsx(pending && "base-spinner")}>
              Submit
            </Button>
          </div>
        </form>

        <div className="mt-4">
          <div className="dark:dark-prose prose">
            <h2 className="text-xl font-bold">Result</h2>
            {pending ? (
              <div className="rounded-md bg-secondary p-2 text-muted-foreground">Loading...</div>
            ) : error ? (
              <div className="rounded-md bg-secondary p-2 text-red-500">{error}</div>
            ) : (
              <pre>{JSON.stringify(result || "Nothing yet", null, 2)}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
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
