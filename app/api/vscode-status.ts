import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

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

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  return NextResponse.json(currentStatus, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const headersList = headers();
    const origin = headersList.get('origin') || '';
    
    // Basit rate limiting
    const now = Date.now();
    if (now - new Date(currentStatus.lastActive).getTime() < 1000) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429, headers: corsHeaders }
      );
    }

    const body = await req.json();
    const { currentFile, currentLine } = body;

    // Veri doğrulama
    if (!currentFile || typeof currentLine !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Geçersiz veri formatı' },
        { status: 400, headers: corsHeaders }
      );
    }

    currentStatus = {
      ...currentStatus,
      isActive: true,
      currentFile,
      currentLine,
      lastActive: new Date().toISOString()
    };

    return NextResponse.json(
      { success: true, data: currentStatus },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('API Hatası:', error);
    return NextResponse.json(
      { success: false, error: 'İşlem başarısız' },
      { status: 500, headers: corsHeaders }
    );
  }
}
