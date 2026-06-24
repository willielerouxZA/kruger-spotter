"use client";
import { useState } from "react";
import { useGameState } from "./hooks/useGameState";
import { animals, PLAYERS, SPOTTER_MULTIPLIERS, type Animal } from "./data/animals";

const RARITY_ORDER = ["legendary", "rare", "uncommon", "common", "very_common"] as const;
const RARITY_LABELS: Record<string, string> = {
  legendary: "Legendary",
  rare: "Rare",
  uncommon: "Uncommon",
  common: "Common",
  very_common: "Very Common",
};
const RARITY_BG: Record<string, string> = {
  legendary: "bg-yellow-500/20 border-yellow-500/50 text-yellow-400",
  rare: "bg-purple-500/20 border-purple-500/50 text-purple-400",
  uncommon: "bg-blue-500/20 border-blue-500/50 text-blue-400",
  common: "bg-green-500/20 border-green-500/50 text-green-400",
  very_common: "bg-gray-500/20 border-gray-500/50 text-gray-400",
};
const RARITY_BADGE: Record<string, string> = {
  legendary: "bg-yellow-500 text-black",
  rare: "bg-purple-500 text-white",
  uncommon: "bg-blue-500 text-white",
  common: "bg-green-500 text-white",
  very_common: "bg-gray-500 text-white",
};
const CATEGORIES = ["All", "Big 5", "Predator", "Antelope", "Mammal", "Bird", "Reptile", "Primate"];

type Tab = "scoreboard" | "spot" | "history";

export default function Home() {
  const game = useGameState();
  const [tab, setTab] = useState<Tab>("scoreboard");
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [rarityFilter, setRarityFilter] = useState<string>("All");
  const [showReset, setShowReset] = useState(false);

  if (!game.loaded) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading...</div>;
  }

  const scores = game.getScores();
  const filteredAnimals = animals.filter((a) => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryFilter !== "All" && a.category !== categoryFilter) return false;
    if (rarityFilter !== "All" && a.rarity !== rarityFilter) return false;
    return true;
  });

  const grouped = RARITY_ORDER.reduce(
    (acc, rarity) => {
      const list = filteredAnimals.filter((a) => a.rarity === rarity);
      if (list.length > 0) acc.push({ rarity, animals: list });
      return acc;
    },
    [] as { rarity: string; animals: Animal[] }[]
  );

  return (
    <div className="max-w-lg mx-auto pb-24 px-4">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold">🦁 Kruger Spotter</h1>
        <p className="text-gray-400 text-sm mt-1">Family Safari Scoring Game</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-6">
        {(["scoreboard", "spot", "history"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${
              tab === t ? "bg-white/15 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {t === "scoreboard" ? "🏆 Scores" : t === "spot" ? "👀 Spot" : "📋 History"}
          </button>
        ))}
      </div>

      {/* SCOREBOARD TAB */}
      {tab === "scoreboard" && (
        <div>
          <div className="space-y-3">
            {scores.map((player, i) => (
              <div
                key={player.name}
                className={`flex items-center gap-4 p-4 rounded-xl border ${
                  i === 0 && player.score > 0
                    ? "border-yellow-500/50 bg-yellow-500/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="text-3xl font-bold w-10 text-center">
                  {i === 0 && player.score > 0 ? "👑" : `#${i + 1}`}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{player.name}</div>
                  <div className="text-gray-400 text-sm">
                    {game.sightings.filter((s) => s.playerName === player.name).length} sightings
                  </div>
                </div>
                <div className="text-2xl font-bold">{player.score}</div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">
                {new Set(game.sightings.map((s) => s.animalName)).size}
              </div>
              <div className="text-gray-400 text-sm">Species Spotted</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{game.sightings.length}</div>
              <div className="text-gray-400 text-sm">Total Sightings</div>
            </div>
          </div>

          {/* Reset */}
          <div className="mt-8 text-center">
            {!showReset ? (
              <button
                onClick={() => setShowReset(true)}
                className="text-red-400/60 text-sm hover:text-red-400"
              >
                Reset Game
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-red-400 text-sm">Are you sure? This cannot be undone.</p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      game.resetGame();
                      setShowReset(false);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
                  >
                    Yes, Reset
                  </button>
                  <button
                    onClick={() => setShowReset(false)}
                    className="px-4 py-2 bg-white/10 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SPOT TAB */}
      {tab === "spot" && !selectedAnimal && (
        <div>
          {/* Search */}
          <input
            type="text"
            placeholder="Search animals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 mb-4 outline-none focus:border-white/30"
          />

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  categoryFilter === cat
                    ? "bg-white text-black"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
            {["All", ...RARITY_ORDER].map((r) => (
              <button
                key={r}
                onClick={() => setRarityFilter(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  rarityFilter === r
                    ? "bg-white text-black"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {RARITY_LABELS[r] || "All"}
              </button>
            ))}
          </div>

          {/* Animal List */}
          {grouped.map(({ rarity, animals: list }) => (
            <div key={rarity} className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${RARITY_BADGE[rarity]}`}>
                  {RARITY_LABELS[rarity]}
                </span>
                <span className="text-gray-500 text-xs">{list[0].basePoints} pts</span>
              </div>
              <div className="space-y-1">
                {list.map((animal) => {
                  const spotters = game.getSpottersForAnimal(animal.name);
                  const allSpotted = spotters.length >= 4;
                  return (
                    <button
                      key={animal.name}
                      onClick={() => setSelectedAnimal(animal)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        allSpotted
                          ? "border-white/5 bg-white/3 opacity-50"
                          : `${RARITY_BG[rarity]} hover:bg-white/10`
                      }`}
                    >
                      <span className="text-xl">{animal.emoji}</span>
                      <span className="flex-1 font-medium text-sm">{animal.name}</span>
                      {spotters.length > 0 && (
                        <span className="text-xs text-gray-400">
                          {spotters.length}/4 spotted
                        </span>
                      )}
                      {allSpotted && <span className="text-green-400 text-sm">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SPOT ANIMAL MODAL */}
      {tab === "spot" && selectedAnimal && (
        <div>
          <button
            onClick={() => setSelectedAnimal(null)}
            className="text-gray-400 hover:text-white mb-4 text-sm"
          >
            ← Back to animals
          </button>

          <div className={`p-6 rounded-2xl border ${RARITY_BG[selectedAnimal.rarity]} mb-6`}>
            <div className="text-center mb-4">
              <span className="text-5xl block mb-2">{selectedAnimal.emoji}</span>
              <h2 className="text-2xl font-bold">{selectedAnimal.name}</h2>
              <span className={`text-xs font-bold px-2 py-0.5 rounded inline-block mt-2 ${RARITY_BADGE[selectedAnimal.rarity]}`}>
                {RARITY_LABELS[selectedAnimal.rarity]}
              </span>
            </div>

            {/* Points breakdown */}
            <div className="grid grid-cols-4 gap-2 text-center mb-6">
              {SPOTTER_MULTIPLIERS.map((mult, i) => (
                <div key={i} className="bg-black/20 rounded-lg p-2">
                  <div className="text-xs text-gray-400">
                    {i === 0 ? "1st" : i === 1 ? "2nd" : i === 2 ? "3rd" : "4th"}
                  </div>
                  <div className="font-bold">{Math.round(selectedAnimal.basePoints * mult)}</div>
                </div>
              ))}
            </div>

            {/* Who spotted it */}
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Who spotted it?</h3>
            <div className="grid grid-cols-2 gap-2">
              {PLAYERS.map((player) => {
                const existing = game.getSpottersForAnimal(selectedAnimal.name);
                const alreadySpotted = existing.find((s) => s.playerName === player);
                const nextOrder = existing.length;
                const nextPoints =
                  nextOrder < 4
                    ? Math.round(selectedAnimal.basePoints * SPOTTER_MULTIPLIERS[nextOrder])
                    : 0;

                return (
                  <button
                    key={player}
                    disabled={!!alreadySpotted || nextOrder >= 4}
                    onClick={() => game.logSighting(selectedAnimal, player)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      alreadySpotted
                        ? "border-green-500/50 bg-green-500/20 text-green-400"
                        : nextOrder >= 4
                          ? "border-white/5 bg-white/3 text-gray-600 cursor-not-allowed"
                          : "border-white/20 bg-white/5 hover:bg-white/15 text-white"
                    }`}
                  >
                    {alreadySpotted ? (
                      <>
                        ✓ {player}
                        <br />
                        <span className="text-xs">+{alreadySpotted.points} pts</span>
                      </>
                    ) : (
                      <>
                        {player}
                        {nextOrder < 4 && (
                          <>
                            <br />
                            <span className="text-xs text-gray-400">+{nextPoints} pts</span>
                          </>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* HISTORY TAB */}
      {tab === "history" && (
        <div>
          {game.sightings.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              No sightings yet. Go spot some animals!
            </div>
          ) : (
            <>
              {game.sightings.length > 0 && (
                <button
                  onClick={game.undoLastSighting}
                  className="mb-4 px-3 py-1.5 text-xs bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30"
                >
                  Undo Last Sighting
                </button>
              )}
              <div className="space-y-2">
                {[...game.sightings].reverse().map((s) => {
                  const animal = animals.find((a) => a.name === s.animalName)!;
                  return (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <span className="text-lg">{animal.emoji}</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{s.animalName}</div>
                        <div className="text-xs text-gray-400">
                          {s.playerName} &middot; {ordinal(s.order)} spotter
                        </div>
                      </div>
                      <div className="font-bold text-green-400">+{s.points}</div>
                      <div className="text-xs text-gray-600">
                        {new Date(s.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ordinal(n: number) {
  return n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : "4th";
}
