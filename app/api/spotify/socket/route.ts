import { NextRequest } from 'next/server';

const handler = async (req: NextRequest) => {
  try {
    const { socket, response } = Deno.upgradeWebSocket(req);
    
    const sendSpotifyData = async () => {
      const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(await res.json()));
      }
    };

    socket.onopen = () => {
      console.log("WebSocket bağlantısı açıldı");
      sendSpotifyData();
      setInterval(sendSpotifyData, 1000);
    };

    return response;
  } catch (err) {
    console.error("WebSocket hatası:", err);
    return new Response("WebSocket hatası", { status: 500 });
  }
};

export { handler as GET };
