import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' });
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://nextjstry-git-main-yasirs-projects-f703138c.vercel.app/api/spotify/callback',
      }),
    });

    const data = await response.json();

    return new NextResponse(`
      <html>
        <body style="background: #1a202c; color: white; font-family: monospace; padding: 2rem;">
          <h1>Spotify Refresh Token:</h1>
          <p style="background: #2d3748; padding: 1rem; border-radius: 4px;">${data.refresh_token}</p>
          <p>Bu token'ı .env.local dosyanıza ve Vercel environment variables'a ekleyin.</p>
        </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Token exchange failed' });
  }
}
