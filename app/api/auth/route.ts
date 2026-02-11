import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { shortKey } = await request.json();
    
    const LOGS_SHORT_KEY = process.env.LOGS_SHORT_KEY || '';
    const API_KEY = process.env.API_KEY || '';
    
    if (shortKey === LOGS_SHORT_KEY) {
      return NextResponse.json({ apiKey: API_KEY });
    }
    
    return NextResponse.json({ error: 'Invalid key' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
