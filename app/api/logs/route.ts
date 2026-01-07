import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://rushia-production.up.railway.app/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = new URL(`${API_BASE}/logs`);
    
    // Forward query parameters
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    const response = await fetch(url.toString(), {
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
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const response = await fetch(`${API_BASE}/logs`, {
      method: 'DELETE',
      headers: {
        'x-api-key': API_KEY || '',
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to clear logs' }, { status: 500 });
  }
}