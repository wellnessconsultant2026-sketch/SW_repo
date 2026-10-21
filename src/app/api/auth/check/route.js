import { NextResponse } from 'next/server';
import { checkAuthFromRequest } from '@/lib/serverAuth';

export async function GET(request) {
  const isAuth = checkAuthFromRequest(request);
  return NextResponse.json(
    { authenticated: isAuth }, 
    { status: 200 }
  );
}
