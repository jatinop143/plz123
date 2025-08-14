import { HappyIndexResults } from './Schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from './DB';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 });
  }

  try {
    const results = await db.select()
      .from(HappyIndexResults)
      .where(eq(HappyIndexResults.userId, userId))
      .orderBy(HappyIndexResults.date);
    
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}