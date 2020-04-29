const ActiveWordTagMin = 5;
const MultiplierBuffFull = 0.1;
const MultiplierBuffHalf = 0.05;
const MultiplierBuffFor = 0.01;
const MultiplierBuffMap = 0.03;
const MarkWeights = [0, 0.2, 0.25, 0.3, 0.35, 0.4];
const Attributes = ["Power", "Speed", "Technique"];
const GearSlotText = ["Torso", "R. Arm", "L. Arm", "R. Leg", "L. Leg"];
const ExTraitType = ["EX Skill", "Part Traits"];
const MeleeType = ["Beam ", "Physical"];
const MainSlot = ["head", "torso", "arms", "legs", "backpack", "melee", "range", "shield", "pilot"];
const GearSlot = ["gear-s1ot-1", "gear-s1ot-2", "gear-s1ot-3", "gear-s1ot-4", "gear-s1ot-5"];
const AllSlots = [...MainSlot, ...GearSlot];

const ExCategories = [
  "Beam Shot",
  "Physical Shot",
  "Beam Melee",
  "Physical Melee",
  "Buff",
  "Awakening",
  "Debuff",
  "Recovery"
];

const WordTagData = [{
  "name": "Protag.",
  "parameters": ["ma"],
  "multiplier": MultiplierBuffFull,
  "type": "general"
}, {
  "name": "Mass P.",
  "parameters": ["a"],
  "multiplier": MultiplierBuffFull,
  "type": "general"
}, {
  "name": "Ace Excl.",
  "parameters": ["sa"],
  "multiplier": MultiplierBuffFull,
  "type": "general"
}, {
  "name": "Amphib.",
  "parameters": ["br"],
  "multiplier": MultiplierBuffFull,
  "type": "general"
}, {
  "name": "Commander",
  "parameters": ["sa", "br"],
  "multiplier": MultiplierBuffHalf,
  "type": "general"
}, {
  "name": "Close Combat",
  "parameters": ["a", "ma"],
  "multiplier": MultiplierBuffHalf,
  "type": "general"
}, {
  "name": "Mid-Range",
  "parameters": ["sa", "pr"],
  "multiplier": MultiplierBuffHalf,
  "type": "general"
}, {
  "name": "Long-Range",
  "parameters": ["sa", "sd"],
  "multiplier": MultiplierBuffHalf,
  "type": "general"
}, {
  "name": "High Mobility",
  "parameters": ["sd", "br"],
  "multiplier": MultiplierBuffHalf,
  "type": "general"
}, {
  "name": "High Firepower",
  "parameters": ["ma", "sa"],
  "multiplier": MultiplierBuffHalf,
  "type": "general"
}, {
  "name": "Heavy Armor",
  "parameters": ["md", "sd"],
  "multiplier": MultiplierBuffHalf,
  "type": "general"
}, {
  "name": "Transformer",
  "parameters": ["sd"],
  "multiplier": MultiplierBuffFull,
  "type": "general"
}, {
  "name": "Gundam Type",
  "parameters": ["a", "pr"],
  "multiplier": MultiplierBuffHalf,
  "type": "general"
}, {
  "name": "Mobile Fighter",
  "parameters": ["ma", "md"],
  "multiplier": MultiplierBuffHalf,
  "type": "general"
}, {
  "name": "Support Type",
  "parameters": ["pr"],
  "multiplier": MultiplierBuffFull,
  "type": "general"
}, {
  "name": "Federation",
  "parameters": ["ma", "sd"],
  "multiplier": MultiplierBuffHalf,
  "type": "general"
}, {
  "name": "Zeon",
  "parameters": ["md"],
  "multiplier": MultiplierBuffFull,
  "type": "general"
}, {
  "name": "Zaku Type",
  "parameters": ["ma", "pr"],
  "multiplier": MultiplierBuffHalf,
  "type": "general"
}, {
  "name": "GM Type",
  "parameters": ["sa", "md"],
  "multiplier": MultiplierBuffHalf,
  "type": "general"
}, {
  "name": "For Space",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor,
  "type": "map"
}, {
  "name": "For Desert",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor,
  "type": "map"
}, {
  "name": "For Tundra",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor,
  "type": "map"
}, {
  "name": "For Forest",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor,
  "type": "map"
}, {
  "name": "For Urban Area",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor,
  "type": "map"
}, {
  "name": "For Base",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor,
  "type": "map"
}, {
  "name": "For Computers",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor,
  "type": "map"
}];

const PilotType = [{
  "name": "All-Rounder"
}, {
  "name": "Defender",
  "parameters": ["a", "md", "sd"],
  "multiplier": MultiplierBuffHalf
}, {
  "name": "In-Fighter",
  "parameters": ["ma"],
  "multiplier": MultiplierBuffFull
}, {
  "name": "Out-Fighter",
  "parameters": ["ma"],
  "multiplier": MultiplierBuffFull
}, {
  "name": "Middle-Shooter",
  "parameters": ["sa"],
  "multiplier": MultiplierBuffFull
}, {
  "name": "Long-Shooter",
  "parameters": ["sa"],
  "multiplier": MultiplierBuffFull
}, {
  "name": "Supporter"
}];

const Sorters = [{
  "name": "Armor",
  "slug": "a"
}, {
  "name": "Melee ATK",
  "slug": "ma"
}, {
  "name": "Shot ATK",
  "slug": "sa"
}, {
  "name": "Melee DEF",
  "slug": "md"
}, {
  "name": "Shot DEF",
  "slug": "sd"
}, {
  "name": "Beam RES",
  "slug": "br"
}, {
  "name": "Phys. RES",
  "slug": "pr"
}];