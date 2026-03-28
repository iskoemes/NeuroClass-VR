// src/components/vr/scenes/ancient-rome/Terrain.tsx
'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { generateTerrainHeight } from '../../utils/noise';

const Terrain: React.FC = () => {
  const terrainMesh = useMemo(() => {
    const WORLD_SIZE = 220;      // большой мир для ощущения масштаба в VR
    const SEGMENTS = 128;        // хороший баланс качества и производительности для VR

    // Создаём геометрию плоскости
    const geometry = new THREE.PlaneGeometry(
      WORLD_SIZE, 
      WORLD_SIZE, 
      SEGMENTS, 
      SEGMENTS
    );

    const positions = geometry.attributes.position.array as Float32Array;

    // Применяем шум к каждой вершине (Y координата)
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      
      // Генерируем высоту холмов
      positions[i + 1] = generateTerrainHeight(x, z);
    }

    // Обновляем геометрию и пересчитываем нормали для правильного освещения
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    // Материал земли в стиле Древнего Рима (песчаная, слегка шероховатая)
    const material = new THREE.MeshStandardMaterial({
      color: '#c2a47e',      // теплый песочный цвет
      roughness: 0.92,
      metalness: 0.05,
      flatShading: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    
    // Поворачиваем плоскость, чтобы она лежала на земле
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    mesh.position.y = -0.15;   // небольшой отступ, чтобы модели не тонули

    return mesh;
  }, []);

  return <primitive object={terrainMesh} />;
};

export default Terrain;