import { parsePhoneNumber } from "libphonenumber-js";

export async function GET(request: Request) {
  if (!process.env.META_TOKEN) {
    throw new Error("Missing META_TOKEN environment variable");
  }
  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");
  console.log({ mode, token, challenge });
  // check the mode and token sent are correct
  if (mode === "subscribe" && token === "abc123") {
    // respond with 200 OK and challenge token from the request
    console.log("Webhook verified successfully!");
    return new Response(challenge, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    return new Response(null, { status: 403 });
  }
}

export async function POST(request: Request) {
  if (!process.env.META_TOKEN) {
    throw new Error("Missing META_TOKEN environment variable");
  }
  const body = await request.json();

  console.log("Received body:", body);
  const message = body.entry?.[0]?.changes[0]?.value?.messages?.[0];
  console.log("Received message:", message);
  console.log("Received entry:", body.entry[0].changes[0].value.contacts);

  // // check if the incoming message contains text
  if (message?.type === "text") {
    const business_phone_number_id = body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
    console.log("Received business_phone_number_id:", business_phone_number_id);
    const parsedNumber = parsePhoneNumber("+" + message.from);
    // TODO: fix this, in my case message.from is {COUNTRY(2)}{CITY(1)}{NUMBER(10)} but I need {COUNTRY(2)}{NUMBER(10)}
    let toPhoneWithoutCity = parsedNumber.countryCallingCode + parsedNumber.nationalNumber.substring(1);
    console.log({ toPhoneWithoutCity });
    const response = await fetch(`https://graph.facebook.com/v20.0/${business_phone_number_id}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.META_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: toPhoneWithoutCity,
        text: { body: "Echo: " + message.text.body },
        context: {
          message_id: message.id,
        },
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Error sending message:", data);
      return new Response(JSON.stringify(data), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    console.log("Message sent:", data);
    return new Response(JSON.stringify(data), { status: 200 });
  }
  return new Response(null, { status: 200 });
}
