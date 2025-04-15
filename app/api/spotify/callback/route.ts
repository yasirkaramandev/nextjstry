import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Kod bulunamadı' });
  }

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
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
        redirect_uri: 'http://localhost:3000/api/spotify/callback',
      }),
    });

    const data = await tokenResponse.json();
    console.log('İşte Refresh Token:', data.refresh_token);

    return NextResponse.json({ 
      message: 'Refresh token konsolda, .env.local dosyanıza ekleyin' 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Token alınamadı' });
  }
}
