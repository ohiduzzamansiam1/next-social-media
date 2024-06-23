import { UserJSON, WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import prisma from '../../../../../prisma/db'

export async function POST(req: Request) {

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type;
  
    const user = JSON.parse(body).data as UserJSON;

    if (eventType === "user.created") {
      await prisma.user.create({
        data: {
          id: user.id,
          username: user.username ?? "",
          name: user.first_name ?? "" + " " + user.last_name ?? "",
          avatar: user.image_url || "/noAvatar.png",
          cover:
            "https://images.pexels.com/photos/1037993/pexels-photo-1037993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      });

      return new Response("User has been created.", { status: 200 });
    }

    if (eventType === "user.updated") {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          username: user.username ?? "",
          avatar: user.image_url || "/noAvatar.png",
        },
      });

      return new Response("User has been updated.", { status: 200 });
    }

    if (eventType === "user.deleted") {
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });

      return new Response("User has been deleted.", { status: 200 });
    }

  return new Response('', { status: 200 })
}