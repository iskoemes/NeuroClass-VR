import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-4o-mini'),     // можно поменять на 'gpt-4o'
      messages,
      temperature: 0.7,

      system: `Ты — дружелюбный и очень умный AI-тьютор платформы NeuroClass VR.
Ты объясняешь сложные темы нейронных сетей, машинного обучения и ИИ простым, но точным языком.
Используй аналогии, примеры и поощряй студента. Отвечай только на русском языке.
Будь мотивирующим и увлекательным, как настоящий преподаватель будущего.`,
    });

    // ← Вот исправление
    return result.toTextStreamResponse({
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: unknown) {
    console.error('OpenAI Error:', error);

    return new Response(
      JSON.stringify({ error: 'Ошибка при обращении к OpenAI' }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}