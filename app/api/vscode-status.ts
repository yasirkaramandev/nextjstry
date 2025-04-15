import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentFile, currentLine, lastActive } = body;

    console.log("Dosya:", currentFile);
    console.log("Satır:", currentLine);
    console.log("Son Aktif:", lastActive);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Hatası:', error);
    return NextResponse.json({ success: false, error: 'Geçersiz veri' }, { status: 400 });
  }
}
