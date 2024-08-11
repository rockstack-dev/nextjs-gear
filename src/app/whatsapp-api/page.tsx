"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import clsx from "clsx";
import HomeBreadcrumb from "@/components/HomeBreadcrumb";
import { Input } from "@/components/ui/input";
import { submissionAction } from "./actions";
import Link from "next/link";

export default function () {
  const [actionData, action, pending] = useActionState(submissionAction, null);

  useEffect(() => {
    if (actionData?.success) {
      toast.success(actionData.success);
    } else if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  return (
    <div className="mx-auto max-w-2xl space-y-3 p-12">
      <HomeBreadcrumb title="WhatsApp API" />
      <h1 className="text-3xl font-bold">Next.js WhatsApp API</h1>
      <div>
        <form action={action} className="space-y-1">
          <input type="hidden" name="action" value="submission" readOnly hidden />
          <Input name="meta-token" defaultValue="" placeholder="META token (not required when set as an environment variable)" />
          <Input name="business-phone-number-id" defaultValue="" placeholder="Business phone number ID" required />
          <Input name="end-user-number" defaultValue="" placeholder="End-user number (must be a valid WhatsApp test number)" required />
          <Textarea name="message" defaultValue="Hi" placeholder="Message..." required disabled={pending} />

          <div className="mt-1 flex items-center justify-end space-x-2">
            <Button asChild variant="link" size="sm">
              <Link href="https://developers.facebook.com/apps/creation/">Create a Facebook App</Link>
            </Button>
            <Button type="submit" disabled={pending} className={clsx(pending && "base-spinner")}>
              Submit
            </Button>
          </div>
        </form>

        <div className="mt-3 rounded-lg border border-yellow-300 bg-yellow-100 p-3 text-xs text-yellow-900 opacity-50">
          Webhooks will only work with when you've set up the <pre className="inline">META_TOKEN</pre> environment variable.
        </div>
      </div>
    </div>
  );
}
