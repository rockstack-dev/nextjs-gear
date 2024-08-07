"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";
import HomeBreadcrumb from "@/components/HomeBreadcrumb";
import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z, ZodTypeAny } from "zod";
import { Input } from "@/components/ui/input";

const defaultSchema = {
  name: { type: "string" },
  steps: {
    type: "array",
    items: {
      type: "object",
      properties: {
        name: { type: "string" },
        ingredients: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              quantity: { type: "string" },
            },
          },
        },
      },
    },
  },
};

export default function () {
  const formRef = useRef<HTMLFormElement>(null);

  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<any>();
  const [prompt, setPrompt] = useState<string>("Generate a recipe for: Aguachile");
  const [schema, setSchema] = useState<string>(JSON.stringify(defaultSchema, null, 2));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!apiKey) {
      toast("Please provide an API key");
      return;
    }

    const objSchema = getObjSchema();
    if (!objSchema) {
      toast("Invalid schema");
      return;
    }

    setIsLoading(true);
    const openai = createOpenAI({
      apiKey,
    });
    try {
      const result = await generateObject({
        model: openai("gpt-4o-2024-08-06", {
          structuredOutputs: true,
        }),
        schema: jsonSchemaToZod(objSchema),
        prompt,
      });
      setResult(result);
      setIsLoading(false);
    } catch (e: any) {
      setError(e.message);
      setIsLoading(false);
    }
  }

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
        <form ref={formRef} onSubmit={onSubmit} method="post" className="space-y-1">
          <input type="hidden" name="action" value="submission" readOnly hidden />
          <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="API Key" style={{ WebkitTextSecurity: "disc" } as any} required />
          <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Prompt" required />
          <Textarea value={schema} onChange={(e) => setSchema(e.target.value)} rows={10} placeholder="Schema" required />

          {/* {JSON.stringify(zodSchema, null, 2)} */}

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading || !getObjSchema()} className={clsx(isLoading && "base-spinner")}>
              Submit
            </Button>
          </div>
        </form>

        <div>
          {error && <div className="text-red-500">{error}</div>}
          {result && (
            <div>
              <h2 className="text-xl font-bold">Result</h2>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
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
