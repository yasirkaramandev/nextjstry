import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const scopes = ['user-read-currently-playing', 'user-read-playback-state'].join(' ');
  
  const params = new URLSearchParams({
    client_id: clientId!,
    response_type: 'code',
    redirect_uri: 'https://nextjstry-git-main-yasirs-projects-f703138c.vercel.app/api/spotify/callback',
    scope: scopes,
    show_dialog: 'true'
  });

  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}
