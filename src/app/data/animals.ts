export interface Animal {
  name: string;
  category: string;
  rarity: "legendary" | "rare" | "uncommon" | "common" | "very_common";
  basePoints: number;
  emoji: string;
}

// Points decrease per spotter: 1st gets base, 2nd 75%, 3rd 50%, 4th 25%
export const SPOTTER_MULTIPLIERS = [1, 0.75, 0.5, 0.25];

export const PLAYERS = ["Willie", "Cheyenne", "Dad", "Laurian"];

export const RARITY_COLORS: Record<string, string> = {
  legendary: "#FFD700",
  rare: "#A855F7",
  uncommon: "#3B82F6",
  common: "#22C55E",
  very_common: "#9CA3AF",
};

export const animals: Animal[] = [
  // LEGENDARY (20 base points) — Big 5 + ultra-rare
  { name: "Leopard", category: "Big 5", rarity: "legendary", basePoints: 20, emoji: "🐆" },
  { name: "Rhino (White)", category: "Big 5", rarity: "legendary", basePoints: 20, emoji: "🦏" },
  { name: "Rhino (Black)", category: "Big 5", rarity: "legendary", basePoints: 20, emoji: "🦏" },
  { name: "Wild Dog", category: "Predator", rarity: "legendary", basePoints: 20, emoji: "🐕" },
  { name: "Cheetah", category: "Predator", rarity: "legendary", basePoints: 20, emoji: "🐆" },
  { name: "Pangolin", category: "Mammal", rarity: "legendary", basePoints: 20, emoji: "🦔" },
  { name: "Aardvark", category: "Mammal", rarity: "legendary", basePoints: 20, emoji: "🐽" },
  { name: "Serval", category: "Predator", rarity: "legendary", basePoints: 20, emoji: "🐱" },
  { name: "Honey Badger", category: "Mammal", rarity: "legendary", basePoints: 20, emoji: "🦡" },
  { name: "Sable Antelope", category: "Antelope", rarity: "legendary", basePoints: 20, emoji: "🦌" },
  { name: "Roan Antelope", category: "Antelope", rarity: "legendary", basePoints: 20, emoji: "🦌" },
  { name: "Tsessebe", category: "Antelope", rarity: "legendary", basePoints: 20, emoji: "🦌" },
  { name: "Lichtenstein's Hartebeest", category: "Antelope", rarity: "legendary", basePoints: 20, emoji: "🦌" },
  { name: "Oribi", category: "Antelope", rarity: "legendary", basePoints: 20, emoji: "🦌" },

  // RARE (15 base points) — Big 5 harder sightings + notable species
  { name: "Lion", category: "Big 5", rarity: "rare", basePoints: 15, emoji: "🦁" },
  { name: "Elephant", category: "Big 5", rarity: "rare", basePoints: 15, emoji: "🐘" },
  { name: "Buffalo", category: "Big 5", rarity: "rare", basePoints: 15, emoji: "🐃" },
  { name: "Hyena (Spotted)", category: "Predator", rarity: "rare", basePoints: 15, emoji: "🐕" },
  { name: "Hyena (Brown)", category: "Predator", rarity: "rare", basePoints: 15, emoji: "🐕" },
  { name: "Caracal", category: "Predator", rarity: "rare", basePoints: 15, emoji: "🐱" },
  { name: "African Civet", category: "Mammal", rarity: "rare", basePoints: 15, emoji: "🐾" },
  { name: "Eland", category: "Antelope", rarity: "rare", basePoints: 15, emoji: "🦌" },
  { name: "Klipspringer", category: "Antelope", rarity: "rare", basePoints: 15, emoji: "🦌" },
  { name: "Mountain Reedbuck", category: "Antelope", rarity: "rare", basePoints: 15, emoji: "🦌" },
  { name: "Ground Hornbill", category: "Bird", rarity: "rare", basePoints: 15, emoji: "🐦" },
  { name: "Martial Eagle", category: "Bird", rarity: "rare", basePoints: 15, emoji: "🦅" },
  { name: "Saddle-billed Stork", category: "Bird", rarity: "rare", basePoints: 15, emoji: "🦩" },
  { name: "Pel's Fishing Owl", category: "Bird", rarity: "rare", basePoints: 15, emoji: "🦉" },
  { name: "Python (African Rock)", category: "Reptile", rarity: "rare", basePoints: 15, emoji: "🐍" },
  { name: "Nile Crocodile", category: "Reptile", rarity: "rare", basePoints: 15, emoji: "🐊" },
  { name: "Bat-eared Fox", category: "Predator", rarity: "rare", basePoints: 15, emoji: "🦊" },

  // UNCOMMON (10 base points)
  { name: "Giraffe", category: "Mammal", rarity: "uncommon", basePoints: 10, emoji: "🦒" },
  { name: "Hippo", category: "Mammal", rarity: "uncommon", basePoints: 10, emoji: "🦛" },
  { name: "Zebra", category: "Mammal", rarity: "uncommon", basePoints: 10, emoji: "🦓" },
  { name: "Wildebeest (Blue)", category: "Antelope", rarity: "uncommon", basePoints: 10, emoji: "🐂" },
  { name: "Waterbuck", category: "Antelope", rarity: "uncommon", basePoints: 10, emoji: "🦌" },
  { name: "Kudu", category: "Antelope", rarity: "uncommon", basePoints: 10, emoji: "🦌" },
  { name: "Nyala", category: "Antelope", rarity: "uncommon", basePoints: 10, emoji: "🦌" },
  { name: "Bushbuck", category: "Antelope", rarity: "uncommon", basePoints: 10, emoji: "🦌" },
  { name: "Warthog", category: "Mammal", rarity: "uncommon", basePoints: 10, emoji: "🐗" },
  { name: "Jackal (Black-backed)", category: "Predator", rarity: "uncommon", basePoints: 10, emoji: "🐺" },
  { name: "Jackal (Side-striped)", category: "Predator", rarity: "uncommon", basePoints: 10, emoji: "🐺" },
  { name: "Baboon", category: "Primate", rarity: "uncommon", basePoints: 10, emoji: "🐒" },
  { name: "Ostrich", category: "Bird", rarity: "uncommon", basePoints: 10, emoji: "🦃" },
  { name: "Fish Eagle", category: "Bird", rarity: "uncommon", basePoints: 10, emoji: "🦅" },
  { name: "Vulture (White-backed)", category: "Bird", rarity: "uncommon", basePoints: 10, emoji: "🦅" },
  { name: "Vulture (Lappet-faced)", category: "Bird", rarity: "uncommon", basePoints: 10, emoji: "🦅" },
  { name: "Secretary Bird", category: "Bird", rarity: "uncommon", basePoints: 10, emoji: "🐦" },
  { name: "Kori Bustard", category: "Bird", rarity: "uncommon", basePoints: 10, emoji: "🐦" },
  { name: "Monitor Lizard", category: "Reptile", rarity: "uncommon", basePoints: 10, emoji: "🦎" },
  { name: "Tortoise (Leopard)", category: "Reptile", rarity: "uncommon", basePoints: 10, emoji: "🐢" },
  { name: "Mongoose (Banded)", category: "Mammal", rarity: "uncommon", basePoints: 10, emoji: "🐾" },
  { name: "Mongoose (Dwarf)", category: "Mammal", rarity: "uncommon", basePoints: 10, emoji: "🐾" },
  { name: "Porcupine", category: "Mammal", rarity: "uncommon", basePoints: 10, emoji: "🦔" },
  { name: "Bushpig", category: "Mammal", rarity: "uncommon", basePoints: 10, emoji: "🐗" },
  { name: "Large-spotted Genet", category: "Mammal", rarity: "uncommon", basePoints: 10, emoji: "🐾" },

  // COMMON (5 base points)
  { name: "Impala", category: "Antelope", rarity: "common", basePoints: 5, emoji: "🦌" },
  { name: "Steenbok", category: "Antelope", rarity: "common", basePoints: 5, emoji: "🦌" },
  { name: "Duiker (Common)", category: "Antelope", rarity: "common", basePoints: 5, emoji: "🦌" },
  { name: "Grey Heron", category: "Bird", rarity: "common", basePoints: 5, emoji: "🐦" },
  { name: "Goliath Heron", category: "Bird", rarity: "common", basePoints: 5, emoji: "🐦" },
  { name: "Hamerkop", category: "Bird", rarity: "common", basePoints: 5, emoji: "🐦" },
  { name: "Lilac-breasted Roller", category: "Bird", rarity: "common", basePoints: 5, emoji: "🐦" },
  { name: "Hornbill (Yellow-billed)", category: "Bird", rarity: "common", basePoints: 5, emoji: "🐦" },
  { name: "Hornbill (Red-billed)", category: "Bird", rarity: "common", basePoints: 5, emoji: "🐦" },
  { name: "Kingfisher (Malachite)", category: "Bird", rarity: "common", basePoints: 5, emoji: "🐦" },
  { name: "Kingfisher (Giant)", category: "Bird", rarity: "common", basePoints: 5, emoji: "🐦" },
  { name: "Bee-eater", category: "Bird", rarity: "common", basePoints: 5, emoji: "🐦" },
  { name: "Hadeda Ibis", category: "Bird", rarity: "common", basePoints: 5, emoji: "🐦" },
  { name: "Vervet Monkey", category: "Primate", rarity: "common", basePoints: 5, emoji: "🐒" },
  { name: "Tree Squirrel", category: "Mammal", rarity: "common", basePoints: 5, emoji: "🐿️" },
  { name: "Elephant Shrew", category: "Mammal", rarity: "common", basePoints: 5, emoji: "🐭" },
  { name: "Terrapin", category: "Reptile", rarity: "common", basePoints: 5, emoji: "🐢" },

  // VERY COMMON (2 base points)
  { name: "Starling (Cape Glossy)", category: "Bird", rarity: "very_common", basePoints: 2, emoji: "🐦" },
  { name: "Starling (Burchell's)", category: "Bird", rarity: "very_common", basePoints: 2, emoji: "🐦" },
  { name: "Dove (Cape Turtle)", category: "Bird", rarity: "very_common", basePoints: 2, emoji: "🕊️" },
  { name: "Sparrow", category: "Bird", rarity: "very_common", basePoints: 2, emoji: "🐦" },
  { name: "Weaver", category: "Bird", rarity: "very_common", basePoints: 2, emoji: "🐦" },
  { name: "Francolin", category: "Bird", rarity: "very_common", basePoints: 2, emoji: "🐦" },
  { name: "Guinea Fowl", category: "Bird", rarity: "very_common", basePoints: 2, emoji: "🐦" },
  { name: "Agama Lizard", category: "Reptile", rarity: "very_common", basePoints: 2, emoji: "🦎" },
  { name: "Scrub Hare", category: "Mammal", rarity: "very_common", basePoints: 2, emoji: "🐇" },
];
