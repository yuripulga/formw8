"use client";

import React from "react";
import Image from "next/image";
import { useWizard } from "@/context/wizard-context";

/**
 * ScreensaverFormBackground
 * Renderiza a primeira página completa do formulário W-8 no aspect ratio original (8.5x11)
 * flutuando suavemente pelo fundo como um protetor de tela clássico,
 * com baixa opacidade, blur sutil e aceleração de hardware 100% via CSS nativo (Zero Libs).
 */
export function ScreensaverFormBackground() {
  const { step } = useWizard();
  const imageSrc = "/forms/screensaver-form-sample.png";
  const isVisible = step === 1;

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 select-none transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-[0.13]" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Eixo X: Movimento horizontal com velocidade constante e reflexão nas bordas laterais */}
      <div className="animate-screensaver-x absolute top-0 left-0">
        {/* Eixo Y: Movimento vertical com velocidade constante e período coprimo para cobertura total */}
        <div className="animate-screensaver-y">
          <div className="w-[150px] sm:w-[180px] md:w-[200px] aspect-[229/257] relative rounded-xl border border-slate-300/70 dark:border-zinc-700/60 shadow-2xl overflow-hidden bg-white dark:bg-zinc-900 blur-[0.2px]">
            <Image
              src={imageSrc}
              alt="Formulário Fiscal W-8BEN-E"
              fill
              sizes="(max-width: 768px) 150px, 200px"
              className="object-contain p-1.5"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
