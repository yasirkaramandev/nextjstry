import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!client_id || !client_secret || !refresh_token) {
      throw new Error('Spotify credentials are missing');
    }

    // Token al
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token');
    }

    const { access_token } = await tokenResponse.json();

    // Şarkı bilgisini al
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: 'no-store'
    });

    // Şarkı çalmıyorsa
    if (response.status === 204) {
      return NextResponse.json({
        isPlaying: false,
        title: 'Not Playing',
        artist: 'No Artist',
        album: 'No Album',
        albumImageUrl: '',
        songUrl: '',
        duration: 0,
        progress: 0
      });
    }

    if (!response.ok) {
      throw new Error('Failed to fetch currently playing track');
    }

    const data = await response.json();

    if (!data.item) {
      throw new Error('No track data available');
    }

    return NextResponse.json({
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((artist: any) => artist.name).join(', '),
      album: data.item.album.name,
      albumImageUrl: data.item.album.images[0].url,
      songUrl: data.item.external_urls.spotify,
      duration: data.item.duration_ms,
      progress: data.progress_ms || 0
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Spotify API Hatası:', error);
    return NextResponse.json({
      isPlaying: false,
      title: 'Error',
      artist: 'Could not fetch data',
      album: '',
      albumImageUrl: '',
      songUrl: '',
      duration: 0,
      progress: 0
    }, { status: 200 }); // 500 yerine 200 döndür ama hata durumunu belirt
  }
}
