import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import notificationapi from "npm:notificationapi-node-server-sdk";

notificationapi.init(
  Deno.env.get("NOTIFICATIONAPI_CLIENT_ID"),
  Deno.env.get("NOTIFICATIONAPI_CLIENT_SECRET")
);

serve(async (req) => {
  const { firstName, userId, email, phoneNumber } = await req.json();

  await notificationapi.send({
    notificationId: "welcome",
    user: {
      id: email,
      email: email,
      number: phoneNumber,
    },
    mergeTags: {
      // these are the dynamic parameters that are used in the notificaiton content
      firstName,
    },
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
