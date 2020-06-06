const ActiveWordTagMin = 5;
const MultiplierBuffFull = 0.1;
const MultiplierBuffHalf = 0.05;
const MultiplierBuffFor = 0.01;
const MultiplierBuffMap = 0.03;
const MarkWeights = [0, 0.2, 0.25, 0.3, 0.35, 0.4];
const Attributes = ["Power", "Technique", "Speed"];
const ExTraitType = ["EX Skill", "Part Traits"];
const WeaponType = ["Beam", "Physical"];
const WeaponSlots = [ "melee", "range" ];
const MainSlot = ["head", "body", "arms", "legs", "back", "melee", "range", "shield", "pilot"];
const GearSlot = ["gear-slot-1", "gear-slot-2", "gear-slot-3", "gear-slot-4", "gear-slot-5"];
const AllSlots = [...MainSlot, ...GearSlot];
const MarksAllowed = ["head", "body", "arms", "legs", "back", "melee", "range", "shield"];

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
  "key" : "rarity",
  "name": "Rarity",
  "slug": "rarity"
}, {
  "key" : "armor",
  "name": "Armor",
  "slug": "a"
}, {
  "key" : "melee-attack",
  "name": "Melee ATK",
  "slug": "ma"
}, {
  "key" : "shot-attack",
  "name": "Shot ATK",
  "slug": "sa"
}, {
  "key" : "melee-defense",
  "name": "Melee DEF",
  "slug": "md"
}, {
  "key" : "shot-defense",
  "name": "Shot DEF",
  "slug": "sd"
}, {
  "key" : "beam-resistance",
  "name": "Beam RES",
  "slug": "br"
}, {
  "key" : "physical-resistance",
  "name": "Phys. RES",
  "slug": "pr"
}];

let SlotIconMap = {
  "head": "slot-head",
  "body": "slot-body",
  "arms": "slot-arms",
  "legs": "slot-legs",
  "back": "slot-back",
  "melee": "short-range-saber",
  "range": "long-range-rifle",
  "shield": "slot-shield",
  "pilot": "slot-pilot",
  "gear-slot-1": "gear-body",
  "gear-slot-2": "gear-arm-right",
  "gear-slot-3": "gear-arm-left",
  "gear-slot-4": "gear-leg-right",
  "gear-slot-5": 'gear-leg-left'
};

let SlotTextMap = {
  "head": "Head",
  "body": "Body",
  "arms": "Arms",
  "legs": "Legs",
  "back": "Back",
  "melee": "Melee",
  "range": "Range",
  "shield": "Shield",
  "pilot": "Pilot",
  "gear-slot-1": "Torso",
  "gear-slot-2": "R. Arm",
  "gear-slot-3": "L. Arm",
  "gear-slot-4":  "R. Leg",
  "gear-slot-5": "L. Leg"
};

let WeaponIconMap = {
  "melee-beam": "skill-beam-melee",
  "melee-physical": "skill-physical-melee",
  "range-beam": "skill-beam-shot",
  "range-physical": "skill-physical-shot"
};