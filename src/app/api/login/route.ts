import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    const { email, username } = body;
    console.log(email)
    return NextResponse.json({ email, username });
}