import { NextRequest, NextResponse } from 'next/server';

let vscodeStatus = {
  isActive: false,
  currentFile: '',
  currentLine: 0,
  lastActive: ''
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    vscodeStatus = {
      isActive: true,
      ...data,
    };
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to parse data" }, { status: 400 });
  }
}

export async function GET() {
  try {
    return NextResponse.json(vscodeStatus);
  } catch (error) {
    return NextResponse.json({ error: "VS Code status unavailable" }, { status: 500 });
  }
}
