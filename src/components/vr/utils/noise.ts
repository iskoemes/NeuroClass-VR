// src/components/vr/utils/noise.ts

/**
 * Простая, но качественная multi-octave функция для генерации холмов
 * Детерминированная (одинаковые координаты = одинаковая высота)
 * Быстрая и подходит для VR (не используем тяжёлые библиотеки)
 */
export function generateTerrainHeight(
  x: number,
  z: number,
  scale: number = 0.018,
  heightScale: number = 14,
  octaves: number = 7
): number {
  let height = 0;
  let amplitude = 1;
  let frequency = scale;

  for (let i = 0; i < octaves; i++) {
    const nx = x * frequency + i * 12.34;
    const nz = z * frequency + i * 34.56;

    // Простая имитация Perlin-подобного шума через синусы
    height += amplitude * (
      Math.sin(nx) * Math.cos(nz) * 0.8 +
      Math.sin(nx * 1.7) * Math.cos(nz * 1.3) * 0.5
    );

    amplitude *= 0.48;     // каждый следующий слой слабее
    frequency *= 2.02;     // и более детальный
  }

  return height * heightScale;
}