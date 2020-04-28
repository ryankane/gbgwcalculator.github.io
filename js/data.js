const ActiveWordTagMin = 5;
const MultiplierBuffFull = 0.1;
const MultiplierBuffHalf = 0.05;
const MultiplierBuffFor = 0.01;
const MultiplierBuffMap = 0.03;
const GeneralWordTags = ["Protag.", "Mass P.", "Ace Excl.", "Amphib.", "Commander", "Close Combat", "Mid-Range", "Long-Range", "High Mobility", "High Firepower", "Heavy Armor", "Transformer", "Gundam Type", "Mobile Fighter", "Support Type", "Federation", "Zeon", "Zaku Type", "GM Type", "For Space", "For Desert", "For Tundra", "For Forest", "For Urban Area", "For Base", "For Computers"];
const MapWordTags = ["For Space", "For Desert", "For Tundra", "For Forest", "For Urban Area", "For Base", "For Computers"];
const WordTagData = [{
  "name": "Protag.",
  "parameters": ["ma"],
  "multiplier": MultiplierBuffFull
}, {
  "name": "Mass P.",
  "parameters": ["a"],
  "multiplier": MultiplierBuffFull
}, {
  "name": "Ace Excl.",
  "parameters": ["sa"],
  "multiplier": MultiplierBuffFull
}, {
  "name": "Amphib.",
  "parameters": ["br"],
  "multiplier": MultiplierBuffFull
}, {
  "name": "Commander",
  "parameters": ["sa", "br"],
  "multiplier": MultiplierBuffHalf
}, {
  "name": "Close Combat",
  "parameters": ["a", "ma"],
  "multiplier": MultiplierBuffHalf
}, {
  "name": "Mid-Range",
  "parameters": ["sa", "pr"],
  "multiplier": MultiplierBuffHalf
}, {
  "name": "Long-Range",
  "parameters": ["sa", "sd"],
  "multiplier": MultiplierBuffHalf
}, {
  "name": "High Mobility",
  "parameters": ["sd", "br"],
  "multiplier": MultiplierBuffHalf
}, {
  "name": "High Firepower",
  "parameters": ["ma", "sa"],
  "multiplier": MultiplierBuffHalf
}, {
  "name": "Heavy Armor",
  "parameters": ["md", "sd"],
  "multiplier": MultiplierBuffHalf
}, {
  "name": "Transformer",
  "parameters": ["sd"],
  "multiplier": MultiplierBuffFull
}, {
  "name": "Gundam Type",
  "parameters": ["a", "pr"],
  "multiplier": MultiplierBuffHalf
}, {
  "name": "Mobile Fighter",
  "parameters": ["ma", "md"],
  "multiplier": MultiplierBuffHalf
}, {
  "name": "Support Type",
  "parameters": ["pr"],
  "multiplier": MultiplierBuffFull
}, {
  "name": "Federation",
  "parameters": ["ma", "sd"],
  "multiplier": MultiplierBuffHalf
}, {
  "name": "Zeon",
  "parameters": ["md"],
  "multiplier": MultiplierBuffFull
}, {
  "name": "Zaku Type",
  "parameters": ["ma", "pr"],
  "multiplier": MultiplierBuffHalf
}, {
  "name": "GM Type",
  "parameters": ["sa", "md"],
  "multiplier": MultiplierBuffHalf
}, {
  "name": "For Space",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor
}, {
  "name": "For Desert",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor
}, {
  "name": "For Tundra",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor
}, {
  "name": "For Forest",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor
}, {
  "name": "For Urban Area",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor
}, {
  "name": "For Base",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor
}, {
  "name": "For Computers",
  "parameters": ["a", "ma", "sa", "md", "sd", "br", "pr"],
  "multiplier": MultiplierBuffFor
}];
const Attributes = ["Power", "Speed", "Technique"];
const ExTraitType = ["EX Skill", "Part Traits"];
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
const MeleeType = ["Beam ", "Physical"];
const MainSlot = ["head", "torso", "arms", "legs", "backpack", "melee", "range", "shield", "pilot"];
const GearSlot = ["gear-s1ot-1", "gear-s1ot-2", "gear-s1ot-3", "gear-s1ot-4", "gear-s1ot-5"];
const AllSlots = [...MainSlot, ...GearSlot];
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

const MarkWeights = [0, 0.2, 0.25, 0.3, 0.35, 0.4];

const GearSlotText = [
  'Torso',
  'R. Arm',
  'L. Arm',
  'R. Leg',
  'L. Leg'
];