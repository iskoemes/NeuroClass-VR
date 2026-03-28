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
    <div className="h-screen w-full overflow-hidden relative bg-black">
      {/* Enter VR */}
      <button
        onClick={() => xrStore.enterVR()}
        className="absolute top-6 left-6 z-50 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl flex items-center gap-3 shadow-lg transition-all active:scale-95"
      >
        🥽 Enter VR
      </button>

      <Canvas
        camera={{ position: [0, 8, 22], fov: 50 }}
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

      {/* AI кнопка */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="absolute top-6 right-6 neon-button px-6 py-4 rounded-3xl flex items-center gap-3 text-lg font-medium hover:scale-105 transition-all border border-cyan-400/30 z-50"
      >
        💬 AI-тьютор
        <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
      </button>

      {/* Чат */}
      {isChatOpen && (
        <div className="absolute top-0 right-0 h-full w-96 glass border-l border-white/10 flex flex-col z-50">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-bold text-cyan-300">AI-тьютор</h2>

            <button
              onClick={() => setIsChatOpen(false)}
              className="text-2xl text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4 text-sm">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                    msg.isUser
                      ? 'bg-cyan-500/20 text-cyan-100'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-white/10 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Спроси что-нибудь..."
              disabled={isLoading}
              className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400"
            />

            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="neon-button px-6 rounded-xl disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Нижняя панель */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass px-8 py-4 rounded-3xl flex gap-6 text-sm border border-white/10 z-50">
        <button
          className="neon-button px-6 py-3 rounded-xl"
          onClick={() => setIsChatOpen(true)}
        >
          💬 Спросить AI
        </button>

        <button
          className="neon-button px-6 py-3 rounded-xl"
          onClick={() => window.history.back()}
        >
          ← Выйти
        </button>
      </div>
    </div>
  );
}