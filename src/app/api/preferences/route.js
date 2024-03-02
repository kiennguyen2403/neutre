import { auth, clerkClient } from '@clerk/nextjs';

export async function POST(req) {
  const { userId } = auth();
  const body = await req.json()
  if (userId) {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        preferences: body.topics,
      },
    });
  }
  return Response.json({ success: true });
}
