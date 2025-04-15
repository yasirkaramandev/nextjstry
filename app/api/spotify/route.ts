import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.spotify.com/v1';

async function getAccessToken() {
  const basic = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basic}`,
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });

  return response.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();
    
    // Spotify'dan örnek bir playlist'in son şarkısını al
    const response = await fetch(`${BASE_URL}/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks?limit=1`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await response.json();
    const track = data.items[0]?.track;

    if (!track) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json({
      isPlaying: true,
      title: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(', '),
      album: track.album.name,
      albumImageUrl: track.album.images[0]?.url,
      songUrl: track.external_urls.spotify
    });
  } catch (error) {
    return NextResponse.json({ isPlaying: false, error: 'Spotify API hatası' });
  }
}
