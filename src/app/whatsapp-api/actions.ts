"use server";

export async function submissionAction(prevState: any, form: FormData) {
  const action = form.get("action");
  if (action === "submission") {
    let metaToken = form.get("meta-token")?.toString() || process.env.META_TOKEN;
    if (!metaToken) {
      return { error: "Missing META_TOKEN environment variable" };
    }
    const business_phone_number_id = form.get("business-phone-number-id");
    const end_user_umber = form.get("end-user-number");
    const message = form.get("message");
    const response = await fetch(`https://graph.facebook.com/v20.0/${business_phone_number_id}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${metaToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: end_user_umber,
        text: { body: message },
        //  context: {
        //    message_id: message.id,
        //  },
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      return {
        error: data.error.message + " " + data.error.code,
      };
    }
    return {
      success: "Message sent successfully",
    };
  }
  return {
    error: "Invalid action",
  };
}
