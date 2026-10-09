"use client";

import React from "react";
import Image from "next/image";

/**
 * AmbientBackground / CloudBackground
 * Modo Claro: Imagem de nuvens suaves (/images/clouds-bg.jpg).
 * Modo Noturno: Imagem de céu estrelado à noite (/images/starry-night-bg.jpg).
 */
export function CloudBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Modo Claro: Imagem de nuvens suaves */}
      <div className="w-full h-full relative opacity-35 dark:hidden transition-opacity duration-700">
        <Image
          src="/images/clouds-bg.jpg"
          alt="Textura suave de nuvens no fundo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Fusão de gradiente no tema claro */}
        <div className="absolute inset-0 bg-gradient-to-b from-app-surface/50 via-transparent to-app-surface/70" />
      </div>

      {/* 2. Modo Noturno: Imagem estática de céu estrelado à noite */}
      <div className="w-full h-full relative hidden dark:block opacity-30 transition-opacity duration-700">
        <Image
          src="/images/starry-night-bg.jpg"
          alt="Céu estrelado à noite no fundo"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Fusão de gradiente no tema escuro para profundidade e legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-app-surface/60 via-transparent to-app-surface/80" />
      </div>
    </div>
  );
}
