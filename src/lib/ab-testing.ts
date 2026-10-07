"use client";

import { useState, useEffect } from "react";

export interface ABExperiment<T extends string = string> {
  id: string;
  variants: readonly T[];
  weights?: number[]; // Optional custom distribution weights (sum to 1.0)
  defaultVariant: T;
}

/**
 * Deterministically retrieves or assigns a variant for a given experiment.
 * Persists the assignment in localStorage for consistent visitor experience.
 */
export function getOrAssignVariant<T extends string>(experiment: ABExperiment<T>): T {
  if (typeof window === "undefined") {
    return experiment.defaultVariant;
  }

  // Check URL search parameters for manual testing/preview (e.g. ?variant=b, ?v=b, ?ab=variantC)
  try {
    const params = new URLSearchParams(window.location.search);
    const paramVal =
      params.get(`ab_${experiment.id}`) ||
      params.get("ab") ||
      params.get("variant") ||
      params.get("v");

    if (paramVal) {
      const normalized = paramVal.trim().toLowerCase();
      const match = experiment.variants.find((v) => {
        const vLower = v.toLowerCase();
        return (
          vLower === normalized ||
          vLower === `variant${normalized}` ||
          vLower.replace("variant", "") === normalized
        );
      });

      if (match) {
        const storageKey = `formw8_ab_${experiment.id}`;
        try {
          window.localStorage.setItem(storageKey, match);
        } catch {
          // ignore
        }
        return match;
      }
    }
  } catch {
    // Fail silently
  }

  const storageKey = `formw8_ab_${experiment.id}`;

  try {
    const existing = window.localStorage.getItem(storageKey);
    if (existing && (experiment.variants as readonly string[]).includes(existing)) {
      return existing as T;
    }

    // Assign new variant based on weights or uniform random distribution
    let chosen: T;
    if (experiment.weights && experiment.weights.length === experiment.variants.length) {
      const rand = Math.random();
      let cumulative = 0;
      chosen = experiment.variants[experiment.variants.length - 1];
      for (let i = 0; i < experiment.variants.length; i++) {
        cumulative += experiment.weights[i];
        if (rand < cumulative) {
          chosen = experiment.variants[i];
          break;
        }
      }
    } else {
      const randomIndex = Math.floor(Math.random() * experiment.variants.length);
      chosen = experiment.variants[randomIndex];
    }

    window.localStorage.setItem(storageKey, chosen);

    // Track experiment exposure in Google Analytics if present
    trackExperimentExposure(experiment.id, chosen);

    return chosen;
  } catch {
    return experiment.defaultVariant;
  }
}

/**
 * Dispatches an event to Google Analytics / GTag when an experiment is seen.
 */
export function trackExperimentExposure(experimentId: string, variantId: string): void {
  if (typeof window === "undefined") return;

  try {
    const win = window as unknown as {
      gtag?: (command: string, eventName: string, params: Record<string, unknown>) => void;
      dataLayer?: Array<Record<string, unknown>>;
    };

    if (typeof win.gtag === "function") {
      win.gtag("event", "experience_impression", {
        experiment_id: experimentId,
        variant_id: variantId,
        non_interaction: true,
      });
    } else if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event: "experience_impression",
        experiment_id: experimentId,
        variant_id: variantId,
      });
    }
  } catch {
    // Fail silently without affecting user experience
  }
}

/**
 * React hook for consuming an A/B test experiment with hydration-safe state.
 */
export function useABTest<T extends string>(experiment: ABExperiment<T>): {
  variant: T;
  isReady: boolean;
} {
  const [variant, setVariant] = useState<T>(experiment.defaultVariant);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const assigned = getOrAssignVariant(experiment);
    setVariant(assigned);
    setIsReady(true);
  }, [experiment]);

  return { variant, isReady };
}
