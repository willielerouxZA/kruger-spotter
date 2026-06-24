"use client";
import { useState, useEffect, useCallback } from "react";
import { animals, SPOTTER_MULTIPLIERS, PLAYERS, type Animal } from "../data/animals";

export interface Sighting {
  id: string;
  animalName: string;
  playerName: string;
  points: number;
  order: number; // 1st, 2nd, 3rd, 4th spotter
  timestamp: number;
}

const STORAGE_KEY = "kruger-spotter-sightings";

export function useGameState() {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setSightings(JSON.parse(stored));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(sightings));
  }, [sightings, loaded]);

  const getSpottersForAnimal = useCallback(
    (animalName: string) => sightings.filter((s) => s.animalName === animalName),
    [sightings]
  );

  const logSighting = useCallback(
    (animal: Animal, playerName: string) => {
      const existing = sightings.filter((s) => s.animalName === animal.name);
      const alreadySpotted = existing.find((s) => s.playerName === playerName);
      if (alreadySpotted) return;

      const order = existing.length;
      if (order >= 4) return;

      const points = Math.round(animal.basePoints * SPOTTER_MULTIPLIERS[order]);
      const sighting: Sighting = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        animalName: animal.name,
        playerName,
        points,
        order: order + 1,
        timestamp: Date.now(),
      };

      setSightings((prev) => [...prev, sighting]);
    },
    [sightings]
  );

  const undoLastSighting = useCallback(() => {
    setSightings((prev) => prev.slice(0, -1));
  }, []);

  const getScores = useCallback(() => {
    const scores: Record<string, number> = {};
    PLAYERS.forEach((p) => (scores[p] = 0));
    sightings.forEach((s) => (scores[s.playerName] = (scores[s.playerName] || 0) + s.points));
    return PLAYERS.map((name) => ({ name, score: scores[name] })).sort((a, b) => b.score - a.score);
  }, [sightings]);

  const resetGame = useCallback(() => {
    setSightings([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { sightings, animals, logSighting, undoLastSighting, getScores, getSpottersForAnimal, resetGame, loaded };
}
