import { NextResponse } from 'next/server';

export async function GET() {
  const encoder = new TextEncoder();
  const customReadable = new ReadableStream({
    async start(controller) {
      while (true) {
        try {
          const { access_token } = await getAccessToken();
          const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          const data = await response.json();
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch (error) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: true })}\n\n`));
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  });

  return new NextResponse(customReadable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}
