"use client";

import { formSubmissionAction } from "@/app/(marketing)/forms/actions";
import clsx from "clsx";
import { useActionState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

export default function FormSubmission() {
  const [actionData, action, pending] = useActionState(formSubmissionAction, null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.success) {
      toast.success(actionData.success);
      formRef.current?.reset();
    } else if (actionData?.error) {
      toast.error(actionData.error);
      formRef.current?.reset();
    }
  }, [actionData]);
  return (
    <form ref={formRef} action={action} className="space-y-1">
      <input type="hidden" name="action" value="submission" readOnly hidden />
      <Textarea name="message" defaultValue="My form submission message" rows={3} />

      <div className="flex justify-end">
        <Button type="submit" disabled={pending} className={clsx(pending && "base-spinner")}>
          Submit
        </Button>
      </div>
    </form>
  );
}
