import { NextResponse } from 'next/server';

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  try {
    // Access token alma
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token!,
      }),
    });

    const tokenData = await tokenResponse.json();

    // Şu an çalan şarkıyı alma
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok && response.status !== 204) {
      throw new Error('Spotify API error');
    }

    if (response.status === 204) {
      return NextResponse.json({ isPlaying: false });
    }

    const data = await response.json();
    
    return NextResponse.json({
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((artist: any) => artist.name).join(', '),
      album: data.item.album.name,
      albumImageUrl: data.item.album.images[0].url,
      songUrl: data.item.external_urls.spotify,
      duration: data.item.duration_ms,
      progress: data.progress_ms
    });

  } catch (error) {
    console.error('Spotify API Hatası:', error);
    return NextResponse.json({ error: 'Spotify API error' }, { status: 500 });
  }
}
