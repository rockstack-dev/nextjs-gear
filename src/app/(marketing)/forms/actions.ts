export async function formSubmissionAction(prevState: any, form: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const action = form.get("action");
  if (action === "submission") {
    const message = form.get("message");
    return {
      success: "Form submitted: " + message,
    };
  }
  return {
    error: "Invalid action",
  };
}
