import { NextResponse } from 'next/server';

const API_BASE = 'https://rushia-production.up.railway.app/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function GET() {
  try {
    const response = await fetch(`${API_BASE}/logs/stats`, {
      headers: {
        'x-api-key': API_KEY || '',
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Stats proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}