import { NextRequest, NextResponse } from 'next/server';

interface VSCodeStatus {
  isActive: boolean;
  currentProject: string;
  currentFile: string;
  currentLine: number;
  lastActive: string;
}

let currentStatus: VSCodeStatus = {
  isActive: false,
  currentProject: "nextjstry",
  currentFile: "",
  currentLine: 0,
  lastActive: new Date().toISOString()
};

export async function GET() {
  return NextResponse.json(currentStatus);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentFile, currentLine } = body;

    // Durumu güncelle
    currentStatus = {
      ...currentStatus,
      isActive: true,
      currentFile,
      currentLine,
      lastActive: new Date().toISOString()
    };

    // Son aktiviteden 5 dakika sonra durumu inaktif yap
    setTimeout(() => {
      if (new Date().getTime() - new Date(currentStatus.lastActive).getTime() > 300000) {
        currentStatus.isActive = false;
      }
    }, 300000);

    return NextResponse.json({ success: true, data: currentStatus });
  } catch (error) {
    console.error('API Hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Geçersiz veri' }, 
      { status: 400 }
    );
  }
}
