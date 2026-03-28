// src/app/vr/page.tsx
'use client';

import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { createXRStore } from '@react-three/xr';

// 🔥 ДОБАВИЛИ
import { InteractionManager } from '@/components/vr/systems/InteractionManager';

// Динамические импорты только для 3D-части
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => ({ default: mod.Canvas })),
  { ssr: false }
);

const XR = dynamic(
  () => import('@react-three/xr').then((mod) => ({ default: mod.XR })),
  { ssr: false }
);

const OrbitControls = dynamic(
  () => import('@react-three/drei').then((mod) => ({ default: mod.OrbitControls })),
  { ssr: false }
);

import Classroom from '@/components/vr/Classroom';
import HoloAITutor, { HoloAITutorRef } from '@/components/vr/HoloAITutor';

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

export default function VRPage() {
  const xrStore = useMemo(() => createXRStore(), []);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Я твой AI-тьютор в NeuroClass VR. Чем сегодня займёмся?',
      isUser: false,
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const holoTutorRef = useRef<HoloAITutorRef>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const userMessage: Message = { id: Date.now(), text: userText, isUser: true };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    holoTutorRef.current?.startSpeaking?.();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.isUser ? 'user' : 'assistant',
            content: m.text,
          })),
        }),
      });

      if (!response.ok) throw new Error('Network error');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiText = '';
      const aiMessageId = Date.now() + 1;

      setMessages((prev) => [...prev, { id: aiMessageId, text: '', isUser: false }]);

      if (!reader) throw new Error('No reader');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        if (chunk.length > 0) {
          aiText += chunk;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId ? { ...msg, text: aiText } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error('Chat error:', error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: 'Ошибка соединения с AI. Попробуй ещё раз.',
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
      holoTutorRef.current?.stopSpeaking?.();
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-zinc-950">
      <button
        type="button"
        onClick={() => xrStore.enterVR()}
        className="absolute left-6 top-20 z-50 rounded-lg border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/15 active:scale-[0.98]"
      >
        Войти в VR
      </button>

      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 9, 24], fov: 48 }}
        shadows="soft"
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={(state) => {
          state.gl.xr.enabled = true;
        }}
      >
        <Suspense fallback={null}>
          <XR store={xrStore}>

            {/* 🔥 ДОБАВЛЕН GAZE MANAGER */}
            <InteractionManager />

            <ambientLight intensity={0.65} />

            <pointLight
              position={[10, 15, 10]}
              intensity={2.2}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />

            <Classroom />

            <HoloAITutor ref={holoTutorRef} />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={8}
              maxDistance={45}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI * 0.95}
            />
          </XR>
        </Suspense>
      </Canvas>

      <button
        type="button"
        onClick={() => setIsChatOpen(true)}
        className="absolute right-6 top-20 z-50 flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/15"
      >
        ИИ-тьютор
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
      </button>

      {/* Чат */}
      {isChatOpen && (
        <div className="glass absolute right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 sm:max-w-sm">
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <h2 className="text-base font-semibold text-white">ИИ-тьютор</h2>

            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              className="rounded-md px-2 py-1 text-lg leading-none text-white/55 transition hover:bg-white/10 hover:text-white"
              aria-label="Закрыть чат"
            >
              ×
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-5 text-sm">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-2.5 ${
                    msg.isUser
                      ? 'bg-white text-zinc-900'
                      : 'border border-white/10 bg-white/5 text-white/90'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 border-t border-white/10 p-5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Напишите вопрос…"
              disabled={isLoading}
              className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="shrink-0 rounded-lg border border-white/15 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-white/90 disabled:opacity-45"
            >
              Отправить
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-3 rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3 backdrop-blur-sm">
        <button
          type="button"
          className="rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
          onClick={() => setIsChatOpen(true)}
        >
          Спросить ИИ
        </button>

        <button
          type="button"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10"
          onClick={() => window.history.back()}
        >
          Назад
        </button>
      </div>
    </div>
  );
}