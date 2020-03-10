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
const GearSlot = ["gear-s1ot1"];
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
const TraitDescriptions = [
  "All power boosted",
  "All power reduced",
  "Buff EX Skill effect",
  "Buff EX Skill time",
  "Chance of attacks penetrating super armor",
  "Chance to not recoil",
  "Chance to prevent vernier consumption when stepping",
  "Chance to survive a fatal blow",
  "CRIT rate boosted",
  "Debuff EX Skill effect",
  "Debuff EX Skill time",
  "DMG output boosted",
  "DMG taken reduced",
  "EX Skill CD reduced",
  "EX Skill piercing boosted",
  "EX Skill power boosted",
  "EX Skill recovery boosted",
  "Initial EX Skill charge boosted",
  "Job Gauge increase boosted",
  "Melee power boosted",
  "Melee power reduced",
  "Projectile speed boosted",
  "Ranged weapon magazine boosted",
  "Ranged weapon reload speed boosted",
  "Shooting power boosted",
  "Shooting power reduced",
  "Shot attack raised",
  "Shot guidance boosted",
  "Shot spread reduced",
  "Skill penetration reduced",
  "Sp. Shot power boosted",
  "Sp. Shot power reduced",
  "Vernier consumption reduced",
  "Vernier recovery rate boosted"
];
const MarkWeights = [0, 0.2, 0.25, 0.3, 0.35, 0.4];
const Collections = [{
  "name": "00 Qan[T] Full Saber",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1363,
    "ma": 972,
    "sa": 1363,
    "md": 555,
    "sd": 1363,
    "br": 680,
    "pr": 0,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Recovery Tool γ"
    }
  }, {
    "part": "torso",
    "a": 1745,
    "ma": 555,
    "sa": 972,
    "md": 0,
    "sd": 2146,
    "br": 680,
    "pr": 0,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Defense Hack β"
    }
  }, {
    "part": "arms",
    "a": 0,
    "ma": 2770,
    "sa": 555,
    "md": 555,
    "sd": 1363,
    "br": 471,
    "pr": 286,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Melee power boosted 30%"
    }
  }, {
    "part": "legs",
    "a": 972,
    "ma": 972,
    "sa": 555,
    "md": 972,
    "sd": 1363,
    "br": 680,
    "pr": 286,
    "wt": ["Protag.", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job EX Skill CD reduced 20%"
    }
  }, {
    "part": "backpack",
    "a": 972,
    "ma": 972,
    "sa": 555,
    "md": 972,
    "sd": 1363,
    "br": 680,
    "pr": 471,
    "wt": ["Protag.", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Full Saber Attack"
    }
  }, {
    "part": "melee",
    "a": 384,
    "ma": 3582,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 611,
    "pr": 418,
    "wt": ["Protag.", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 80% or less EX Skill power boosted 30%"
    },
    "name": "GN Sword IV (Katar Mode)",
    "type": "Beam"
  }, {
    "part": "melee",
    "a": 1363,
    "ma": 3713,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 680,
    "pr": 286,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking Physical Strong Melee CRIT rate boosted 30%"
    },
    "name": "GN Sword IV (Saber Mode)",
    "type": "Beam"
  }, {
    "part": "melee",
    "a": 1363,
    "ma": 3713,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 680,
    "pr": 286,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job Enemy Shooting power reduced 30%"
    },
    "name": "GN Gun Blade (Blade Mode)",
    "type": "Physical"
  }, {
    "part": "melee",
    "a": 384,
    "ma": 4004,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 420,
    "pr": 420,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "While \"Close Combat\" Initial EX Skill charge boosted 20%"
    },
    "name": "GN Sword IV Full Saber",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 555,
    "ma": 154,
    "sa": 3331,
    "md": 0,
    "sd": 972,
    "br": 471,
    "pr": 286,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Wide Cutter"
    },
    "name": "GN Sword IV (Rifle Mode)",
    "type": "Beam"
  }]
}, {
  "name": "Aegis Gundam",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1181,
    "ma": 384,
    "sa": 2380,
    "md": 384,
    "sd": 384,
    "br": 213,
    "pr": 417,
    "wt": ["Transformer", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Igelstellung"
    }
  }, {
    "part": "torso",
    "a": 1977,
    "ma": 384,
    "sa": 796,
    "md": 796,
    "sd": 796,
    "br": 0,
    "pr": 661,
    "wt": ["Transformer", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Shooting DMG taken reduced by 8-35"
    }
  }, {
    "part": "arms",
    "a": 1181,
    "ma": 796,
    "sa": 796,
    "md": 1181,
    "sd": 1181,
    "br": 0,
    "pr": 0,
    "wt": ["Transformer", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Assault Cyclone"
    }
  }, {
    "part": "legs",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 796,
    "sd": 1181,
    "br": 417,
    "pr": 611,
    "wt": ["Transformer", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Kick Combination"
    }
  }, {
    "part": "backpack",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 796,
    "sd": 1181,
    "br": 417,
    "pr": 611,
    "wt": ["Transformer", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Enemy Sp. Shot power reduced 17-30%"
    }
  }, {
    "part": "range",
    "a": 1181,
    "ma": 0,
    "sa": 3177,
    "md": 0,
    "sd": 0,
    "br": 213,
    "pr": 611,
    "wt": ["Transformer", "For Base"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job Enemy Shooting power reduced 17-30%"
    },
    "name": "60mm High-Energy Beam Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 1181,
    "ma": 0,
    "sa": 0,
    "md": 796,
    "sd": 1602,
    "br": 213,
    "pr": 806,
    "wt": ["Transformer", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Shield Throw"
    },
    "name": "Anti-Beam Shield"
  }]
}, {
  "name": "Aile Strike Gundam",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 799,
    "ma": 384,
    "sa": 2791,
    "md": 799,
    "sd": 384,
    "br": 213,
    "pr": 0,
    "wt": ["Protag.", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Igelstellung"
    }
  }, {
    "part": "torso",
    "a": 1184,
    "ma": 384,
    "sa": 384,
    "md": 1608,
    "sd": 799,
    "br": 614,
    "pr": 0,
    "wt": ["Protag.", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Shooting CRIT rate boosted 10-30%"
    }
  }, {
    "part": "arms",
    "a": 799,
    "ma": 1982,
    "sa": 384,
    "md": 1184,
    "sd": 799,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Sp. Shot power boosted 17-30%"
    }
  }, {
    "part": "legs",
    "a": 799,
    "ma": 384,
    "sa": 799,
    "md": 1184,
    "sd": 384,
    "br": 614,
    "pr": 420,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Rapid Thrust"
    }
  }, {
    "part": "backpack",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 1608,
    "sd": 384,
    "br": 614,
    "pr": 420,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Strike Punisher"
    }
  }, {
    "part": "melee",
    "a": 799,
    "ma": 1982,
    "sa": 0,
    "md": 799,
    "sd": 0,
    "br": 614,
    "pr": 213,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job Enemy Melee Power reduced 17-30%"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "melee",
    "a": 799,
    "ma": 1982,
    "sa": 0,
    "md": 799,
    "sd": 0,
    "br": 614,
    "pr": 213,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Knight's Nail"
    },
    "name": "Grand Slam",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 384,
    "ma": 0,
    "sa": 3590,
    "md": 799,
    "sd": 0,
    "br": 420,
    "pr": 213,
    "wt": ["Protag.", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed Attribute (Self) Initial EX Skill Charge boosted 6-20%"
    },
    "name": "57mm High-Energy Beam Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 799,
    "ma": 0,
    "sa": 0,
    "md": 1982,
    "sd": 799,
    "br": 812,
    "pr": 213,
    "wt": ["Protag.", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) EX Skill DMG output boosted 8-35"
    },
    "name": "Anti-Beam Shield"
  }]
}, {
  "name": "Akatsuki [Oowashi Pack]",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1181,
    "ma": 384,
    "sa": 1181,
    "md": 796,
    "sd": 1181,
    "br": 417,
    "pr": 213,
    "wt": ["Gundam Type", "For Base"],
    "ex": {
      "type": "EX Skill",
      "name": "Close-In Weapons System"
    }
  }, {
    "part": "torso",
    "a": 1977,
    "ma": 384,
    "sa": 384,
    "md": 796,
    "sd": 1602,
    "br": 213,
    "pr": 0,
    "wt": ["Gundam Type", "For Base"],
    "ex": {
      "type": "EX Skill",
      "name": "Yata-no-Kagami"
    }
  }, {
    "part": "arms",
    "a": 796,
    "ma": 1181,
    "sa": 384,
    "md": 1181,
    "sd": 1602,
    "br": 213,
    "pr": 0,
    "wt": ["Gundam Type", "For Base"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Beam Sp. Shot power boosted 30%"
    }
  }, {
    "part": "legs",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 384,
    "sd": 1602,
    "br": 611,
    "pr": 213,
    "wt": ["Gundam Type", "For Tundra"],
    "ex": {
      "type": "EX Skill",
      "name": "Experimental Twin Beam Saber"
    }
  }, {
    "part": "backpack",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 796,
    "sd": 1181,
    "br": 611,
    "pr": 213,
    "wt": ["Gundam Type", "For Tundra"],
    "ex": {
      "type": "EX Skill",
      "name": "High Energy Beam Cannon"
    }
  }, {
    "part": "melee",
    "a": 1181,
    "ma": 2380,
    "sa": 0,
    "md": 0,
    "sd": 796,
    "br": 417,
    "pr": 213,
    "wt": ["Gundam Type", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job Job Gauge Increase boosted 17%"
    },
    "name": "Experimental Twin Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 1181,
    "ma": 0,
    "sa": 2380,
    "md": 0,
    "sd": 796,
    "br": 611,
    "pr": 213,
    "wt": ["Gundam Type", "For Base"],
    "ex": {
      "type": "Part Traits",
      "name": "Initial EX Skill charge boosted 20%"
    },
    "name": "Hyakurai",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 1181,
    "ma": 0,
    "sa": 0,
    "md": 796,
    "sd": 1977,
    "br": 806,
    "pr": 213,
    "wt": ["Gundam Type", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Rifle category equipped Enemy Shooting power reduced 30%"
    },
    "name": "Type 71 Experimental Defensive Shield"
  }]
}, {
  "name": "Arche Gundam",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 558,
    "ma": 291,
    "sa": 1698,
    "md": 558,
    "sd": 558,
    "br": 302,
    "pr": 0,
    "wt": ["Close Combat", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 50% or less Recover 10 Armor gradually"
    }
  }, {
    "part": "torso",
    "a": 1140,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 0,
    "wt": ["Close Combat", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job Enemy Skill penetration reduced 22%"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 1698,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Close Combat", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Enemy Melee power reduced 25%"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Close Combat", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "GN Fang"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Close Combat", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "While \"Close Combat\" Melee power boosted 25%"
    }
  }, {
    "part": "shield",
    "a": 558,
    "ma": 0,
    "sa": 0,
    "md": 1140,
    "sd": 1140,
    "br": 588,
    "pr": 126,
    "wt": ["Close Combat", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "GN Field"
    },
    "name": "GN Shield (Arche Gundam)",
    "type": "-"
  }, {
    "part": "melee",
    "a": 558,
    "ma": 2297,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 126,
    "wt": ["Close Combat", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "12% chance of attacks penetrating super armor"
    },
    "name": "GN Buster Sword (Arche)",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 558,
    "ma": 0,
    "sa": 2297,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 126,
    "wt": ["Close Combat", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Job Gauge increase boosted 13%"
    },
    "name": "GN Buster Sword Rifle Mode (Arche)",
    "type": "Beam"
  }]
}, {
  "name": "Astray Blue Frame",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 795,
    "ma": 382,
    "sa": 1179,
    "md": 1179,
    "sd": 1179,
    "br": 0,
    "pr": 416,
    "wt": ["Mid-Range", "For Tundra"],
    "ex": {
      "type": "EX Skill",
      "name": "Igelstellung"
    }
  }, {
    "part": "torso",
    "a": 1601,
    "ma": 382,
    "sa": 0,
    "md": 1179,
    "sd": 1179,
    "br": 0,
    "pr": 609,
    "wt": ["Mid-Range", "For Tundra"],
    "ex": {
      "type": "EX Skill",
      "name": "Offense Hack β"
    }
  }, {
    "part": "arms",
    "a": 795,
    "ma": 1179,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 211,
    "pr": 416,
    "wt": ["Mid-Range", "For Tundra"],
    "ex": {
      "type": "EX Skill",
      "name": "Defense Hack β"
    }
  }, {
    "part": "legs",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1601,
    "sd": 1601,
    "br": 416,
    "pr": 211,
    "wt": ["Mid-Range", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) EX Skill piercing boosted 28%"
    }
  }, {
    "part": "backpack",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1601,
    "sd": 1601,
    "br": 211,
    "pr": 416,
    "wt": ["Mid-Range", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Serpent Bite"
    }
  }, {
    "part": "shield",
    "a": 0,
    "ma": 0,
    "sa": 0,
    "md": 1974,
    "sd": 1974,
    "br": 211,
    "pr": 805,
    "wt": ["Mid-Range", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job Enemy Shooting Power reduced 30%"
    },
    "name": "Anti-Beam Shield"
  }]
}, {
  "name": "Astray Gold Frame Amatsu",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 795,
    "ma": 382,
    "sa": 2377,
    "md": 795,
    "sd": 795,
    "br": 416,
    "pr": 0,
    "wt": ["High Mobility", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 70% or less, Enemy Shooting power reduced 30%"
    }
  }, {
    "part": "torso",
    "a": 1601,
    "ma": 382,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 609,
    "pr": 0,
    "wt": ["High Mobility", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "Mirage Colloid"
    }
  }, {
    "part": "arms",
    "a": 795,
    "ma": 2377,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 0,
    "pr": 0,
    "wt": ["High Mobility", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "Trikeros Rush"
    }
  }, {
    "part": "legs",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 609,
    "pr": 416,
    "wt": ["High Mobility", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self), EX Skill CD reduced 20%"
    }
  }, {
    "part": "backpack",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 609,
    "pr": 416,
    "wt": ["High Mobility", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Maga no Ikutachi"
    }
  }]
}, {
  "name": "Astray Red Frame",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1181,
    "ma": 384,
    "sa": 796,
    "md": 1181,
    "sd": 796,
    "br": 289,
    "pr": 289,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Igelstellung"
    }
  }, {
    "part": "torso",
    "a": 1977,
    "ma": 796,
    "sa": 384,
    "md": 796,
    "sd": 796,
    "br": 289,
    "pr": 289,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job EX Skill CD reduced 6-20%"
    }
  }, {
    "part": "arms",
    "a": 796,
    "ma": 2783,
    "sa": 0,
    "md": 1181,
    "sd": 1181,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Lightning Ball"
    }
  }, {
    "part": "legs",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 1181,
    "sd": 796,
    "br": 476,
    "pr": 476,
    "wt": ["Protag.", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Bisect"
    }
  }, {
    "part": "backpack",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 1181,
    "sd": 796,
    "br": 476,
    "pr": 476,
    "wt": ["Protag.", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Double Saber Rush"
    }
  }, {
    "part": "melee",
    "a": 1181,
    "ma": 3581,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 289,
    "pr": 289,
    "wt": ["Protag.", "For Urban Area"],
    "ex": {
      "type": "Skill",
      "name": "Gerbera Straight"
    },
    "name": "Gerbera Straight",
    "type": "Physical"
  }, {
    "part": "shield",
    "a": 1181,
    "ma": 0,
    "sa": 0,
    "md": 1603,
    "sd": 796,
    "br": 476,
    "pr": 476,
    "wt": ["Protag.", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job Enemy Shooting Power reduced 17-30%"
    },
    "name": "Anti-Beam Shield"
  }]
}, {
  "name": "Astray Red Frame Custom",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1182,
    "ma": 384,
    "sa": 799,
    "md": 1182,
    "sd": 384,
    "br": 290,
    "pr": 290,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self), Enemy Shooting power reduced 30%"
    }
  }, {
    "part": "torso",
    "a": 1606,
    "ma": 384,
    "sa": 384,
    "md": 1606,
    "sd": 799,
    "br": 290,
    "pr": 290,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job, Strong Melee power boosted 30%"
    }
  }, {
    "part": "arms",
    "a": 384,
    "ma": 3181,
    "sa": 384,
    "md": 1606,
    "sd": 384,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 80% or less, Melee CRIT rate boosted 30%"
    }
  }, {
    "part": "legs",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 1606,
    "sd": 799,
    "br": 420,
    "pr": 290,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Gerbera Straight/Tiger Pierce"
    }
  }, {
    "part": "backpack",
    "a": 1606,
    "ma": 384,
    "sa": 384,
    "md": 1606,
    "sd": 799,
    "br": 290,
    "pr": 290,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Tactical Arms II L"
    }
  }, {
    "part": "melee",
    "a": 384,
    "ma": 4004,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 420,
    "pr": 420,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "While \"Protag.\", Initial EX Skill charge boosted 20%"
    },
    "name": "Gerbera Straight/Tiger Pierce",
    "type": "Physical"
  }]
}, {
  "name": "Banshee",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 966,
    "ma": 379,
    "sa": 3313,
    "md": 0,
    "sd": 553,
    "br": 284,
    "pr": 465,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1736,
    "ma": 789,
    "sa": 1098,
    "md": 966,
    "sd": 966,
    "br": 0,
    "pr": 674,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "NT-D"
    }
  }, {
    "part": "arms",
    "a": 1888,
    "ma": 3692,
    "sa": 2026,
    "md": 1508,
    "sd": 1508,
    "br": 0,
    "pr": 1083,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Armed Armor"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 966,
    "ma": 789,
    "sa": 720,
    "md": 966,
    "sd": 966,
    "br": 674,
    "pr": 465,
    "wt": ["Gundam Type", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power Attribute (self), EX Skill CD reduced 20%"
    }
  }, {
    "part": "backpack",
    "a": 966,
    "ma": 789,
    "sa": 720,
    "md": 966,
    "sd": 966,
    "br": 465,
    "pr": 674,
    "wt": ["Gundam Type", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Double Saber Rush"
    }
  }]
}, {
  "name": "Beargguy",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1144,
    "ma": 294,
    "sa": 891,
    "md": 558,
    "sd": 558,
    "br": 302,
    "pr": 0,
    "wt": ["Amphib.", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Mega Particle Cannon"
    }
  }, {
    "part": "torso",
    "a": 2593,
    "ma": 558,
    "sa": 558,
    "md": 1435,
    "sd": 1435,
    "br": 592,
    "pr": 430,
    "wt": ["Amphib.", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "With Module category equipped Buff EX Skill effect up 1-15%"
    },
    "combo": "legs"
  }, {
    "part": "arms",
    "a": 891,
    "ma": 891,
    "sa": 292,
    "md": 891,
    "sd": 891,
    "br": 127,
    "pr": 0,
    "wt": ["Amphib.", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Arm-Mounted Mega Particle Cannon"
    }
  }, {
    "part": "backpack",
    "a": 891,
    "ma": 292,
    "sa": 292,
    "md": 891,
    "sd": 891,
    "br": 430,
    "pr": 217,
    "wt": ["Amphib.", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Recorder"
    }
  }]
}, {
  "name": "Beginning 30 Gundam",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 799,
    "ma": 384,
    "sa": 1979,
    "md": 384,
    "sd": 1132,
    "br": 420,
    "pr": 213,
    "wt": ["Gundam Type", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1182,
    "ma": 799,
    "sa": 384,
    "md": 799,
    "sd": 1606,
    "br": 612,
    "pr": 0,
    "wt": ["Gundam Type", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or more EX Skill CD reduced 20%"
    }
  }, {
    "part": "arms",
    "a": 1606,
    "ma": 2786,
    "sa": 384,
    "md": 1606,
    "sd": 3181,
    "br": 810,
    "pr": 213,
    "wt": ["Gundam Type", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-fighter Job Melee power boosted 30%"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 384,
    "sd": 1182,
    "br": 612,
    "pr": 420,
    "wt": ["Gundam Type", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "IFS Unit Barrier"
    }
  }, {
    "part": "backpack",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 384,
    "sd": 1182,
    "br": 612,
    "pr": 420,
    "wt": ["Gundam Type", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "IFS Unit Combo"
    }
  }, {
    "part": "melee",
    "a": 384,
    "ma": 3586,
    "sa": 0,
    "md": 0,
    "sd": 799,
    "br": 420,
    "pr": 213,
    "wt": ["Gundam Type", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "15% chance of attacks penetrating super armor"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 799,
    "ma": 0,
    "sa": 1979,
    "md": 0,
    "sd": 799,
    "br": 612,
    "pr": 213,
    "wt": ["Gundam Type", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "Initial EX Skill charge boosted 20%"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }]
}, {
  "name": "Blue Destiny Unit-1",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 558,
    "ma": 291,
    "sa": 1698,
    "md": 558,
    "sd": 558,
    "br": 302,
    "pr": 0,
    "wt": ["Close Combat", "For Desert"],
    "ex": {
      "type": "EX Skill",
      "name": "Exam System"
    }
  }, {
    "part": "torso",
    "a": 1140,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 0,
    "wt": ["Close Combat", "For Desert"],
    "ex": {
      "type": "EX Skill",
      "name": "Abdominal Wired Missile"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 1698,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Close Combat", "Federation"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 80% or less Melee DMG taken reduced by 6-20"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Close Combat", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Saber Combo"
    }
  }, {
    "part": "shield",
    "a": 558,
    "ma": 0,
    "sa": 0,
    "md": 1140,
    "sd": 1140,
    "br": 588,
    "pr": 126,
    "wt": ["Close Combat", "For Desert"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Buff EX Skill time up 1-15%"
    },
    "name": "Shield"
  }]
}, {
  "name": "Blitz Gundam",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 558,
    "ma": 291,
    "sa": 889,
    "md": 889,
    "sd": 889,
    "br": 302,
    "pr": 0,
    "wt": ["High Mobility", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Recovery Tool β"
    }
  }, {
    "part": "torso",
    "a": 1140,
    "ma": 291,
    "sa": 0,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 0,
    "wt": ["High Mobility", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Mirage Colloid"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 889,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 302,
    "pr": 126,
    "wt": ["High Mobility", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Trikeros Rush"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1140,
    "sd": 1140,
    "br": 126,
    "pr": 302,
    "wt": ["High Mobility", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Shooting CRIT rate boosted 8-17%"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1140,
    "sd": 1140,
    "br": 302,
    "pr": 126,
    "wt": ["High Mobility", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "1-15% chance to prevent vernier consumption when stepping"
    }
  }]
}, {
  "name": "Build Burning Gundam",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1181,
    "ma": 384,
    "sa": 796,
    "md": 1181,
    "sd": 384,
    "br": 417,
    "pr": 213,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed Attribute (self), Buff EX Skill Time up 22%"
    }
  }, {
    "part": "torso",
    "a": 1602,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 611,
    "pr": 0,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Jigen Haoh Style Gokui"
    }
  }, {
    "part": "arms",
    "a": 384,
    "ma": 3177,
    "sa": 384,
    "md": 1602,
    "sd": 384,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Jigen Haoh Style Shippu-Zuki"
    }
  }, {
    "part": "legs",
    "a": 796,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 417,
    "pr": 611,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Jigen Haoh Style Seiso-Geri"
    }
  }, {
    "part": "backpack",
    "a": 796,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 611,
    "pr": 417,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Houou Haoh-Ken"
    }
  }]
}, {
  "name": "Build Gundam Mk-II",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 889,
    "ma": 291,
    "sa": 1701,
    "md": 291,
    "sd": 291,
    "br": 302,
    "pr": 126,
    "wt": ["Gundam Type", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Barrier Stance (y)"
    }
  }, {
    "part": "torso",
    "a": 1433,
    "ma": 291,
    "sa": 558,
    "md": 558,
    "sd": 558,
    "br": 428,
    "pr": 0,
    "wt": ["Gundam Type", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "While \"Gundam Type\", Debuff EX Skill time up 16%"
    }
  }, {
    "part": "arms",
    "a": 889,
    "ma": 558,
    "sa": 558,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Gundam Type", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Offense Up (a)"
    }
  }, {
    "part": "legs",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Gundam Type", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self), Mid Shot Attack raised 14%"
    }
  }, {
    "part": "backpack",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Gundam Type", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Cougar Rush"
    }
  }, {
    "part": "melee",
    "a": 889,
    "ma": 1701,
    "sa": 0,
    "md": 0,
    "sd": 291,
    "br": 302,
    "pr": 126,
    "wt": ["Gundam Type", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "While \"For Computers\", Initial EX Skill charge boosted 12%"
    },
    "name": "Beam Saber (Build Gundam Mk-II)",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 889,
    "ma": 0,
    "sa": 2300,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 126,
    "wt": ["Gundam Type", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self), Job Gauge increase boosted 13%"
    },
    "name": "Beaf Rifle (Build Gundam Mk-II)",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 889,
    "ma": 0,
    "sa": 2300,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 126,
    "wt": ["Gundam Type", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "Physical range weapon reload speed boosted 15%"
    },
    "name": "Hyper Bazooka (Build Gundam Mk-II)",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 889,
    "ma": 0,
    "sa": 2300,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 126,
    "wt": ["Gundam Type", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or more, Sp. Shot power boosted 25%"
    },
    "name": "Beam Rifle Mk-II",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 889,
    "ma": 0,
    "sa": 0,
    "md": 558,
    "sd": 1142,
    "br": 590,
    "pr": 126,
    "wt": ["Gundam Type", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job, Shooting DMG taken reduced by 20"
    },
    "name": "Movable Shield"
  }]
}, {
  "name": "Build Strike Gundam [Full Package]",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 796,
    "ma": 383,
    "sa": 2378,
    "md": 796,
    "sd": 796,
    "br": 212,
    "pr": 212,
    "wt": ["Protag.", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1602,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 288,
    "pr": 288,
    "wt": ["Protag.", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 80% or less EX Skill DMG output boosted by 35"
    }
  }, {
    "part": "arms",
    "a": 796,
    "ma": 2378,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Strong Melee CRIT rate boosted 30%"
    }
  }, {
    "part": "legs",
    "a": 796,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 475,
    "pr": 502,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Double Saber Rush"
    }
  }, {
    "part": "backpack",
    "a": 796,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 502,
    "pr": 475,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Launch Build Booster"
    }
  }, {
    "part": "range",
    "a": 796,
    "ma": 0,
    "sa": 3175,
    "md": 0,
    "sd": 0,
    "br": 417,
    "pr": 417,
    "wt": ["Protag.", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job Initial EX Skill charge boosted 20%"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 384,
    "ma": 0,
    "sa": 4004,
    "md": 0,
    "sd": 0,
    "br": 290,
    "pr": 290,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Job Gauge increase boosted 17%"
    },
    "name": "Enhanced Beam Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 796,
    "ma": 0,
    "sa": 0,
    "md": 1602,
    "sd": 1602,
    "br": 417,
    "pr": 417,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Gun"
    },
    "name": "Chobham Shield"
  }]
}, {
  "name": "Buster Gundam",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 291,
    "ma": 291,
    "sa": 2300,
    "md": 291,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Long-Range", "For Desert"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Shooting power boosted 25%"
    }
  }, {
    "part": "torso",
    "a": 1142,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 1142,
    "br": 0,
    "pr": 428,
    "wt": ["Long-Range", "For Desert"],
    "ex": {
      "type": "EX Skill",
      "name": "Offense Up β"
    }
  }, {
    "part": "arms",
    "a": 889,
    "ma": 558,
    "sa": 291,
    "md": 291,
    "sd": 1142,
    "br": 126,
    "pr": 302,
    "wt": ["Long-Range", "For Desert"],
    "ex": {
      "type": "EX Skill",
      "name": "Archer Stance γ"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 1142,
    "br": 428,
    "pr": 302,
    "wt": ["Long-Range", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Anti-Armor Shotgun"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 1142,
    "br": 302,
    "pr": 428,
    "wt": ["Long-Range", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Shooting power boosted 25%"
    }
  }, {
    "part": "range",
    "a": 291,
    "ma": 0,
    "sa": 2867,
    "md": 0,
    "sd": 0,
    "br": 126,
    "pr": 302,
    "wt": ["Long-Range", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Nix Snipe"
    },
    "name": "Hyper Impulse Long-Range Sniper Rifle",
    "type": "Beam"
  }]
}, {
  "name": "Code Φ",
  "attribute": "Technique",
  "rarity": 2,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 800,
    "ma": 385,
    "sa": 1985,
    "md": 385,
    "sd": 1185,
    "br": 292,
    "pr": 292,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1185,
    "ma": 800,
    "sa": 385,
    "md": 800,
    "sd": 1610,
    "br": 292,
    "pr": 292,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Assassination"
    }
  }, {
    "part": "arms",
    "a": 800,
    "ma": 2795,
    "sa": 385,
    "md": 800,
    "sd": 1185,
    "br": 0,
    "pr": 0,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "Melee Power boosted 3-15%"
    }
  }, {
    "part": "legs",
    "a": 800,
    "ma": 385,
    "sa": 385,
    "md": 385,
    "sd": 1185,
    "br": 479,
    "pr": 479,
    "wt": ["Ace Excl.", "For Tundra"],
    "ex": {
      "type": "Part Traits",
      "name": "Melee CRIT rate boosted 5-14%"
    }
  }, {
    "part": "melee",
    "a": 385,
    "ma": 3594,
    "sa": 0,
    "md": 0,
    "sd": 800,
    "br": 292,
    "pr": 292,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Grave Punisher"
    },
    "name": "Beam Scythe",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 800,
    "ma": 0,
    "sa": 1985,
    "md": 0,
    "sd": 800,
    "br": 292,
    "pr": 292,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "Job Gauge increase boosted 2-11%"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }]
}, {
  "name": "Crossbone Gundam X1",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 889,
    "ma": 291,
    "sa": 558,
    "md": 889,
    "sd": 558,
    "br": 302,
    "pr": 126,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1433,
    "ma": 558,
    "sa": 291,
    "md": 558,
    "sd": 558,
    "br": 428,
    "pr": 0,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Gun"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 1991,
    "sa": 0,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "3-12% chance of attacks penetrating super armor"
    }
  }, {
    "part": "legs",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 558,
    "br": 428,
    "pr": 302,
    "wt": ["Protag.", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Heat Dagger"
    }
  }, {
    "part": "backpack",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 558,
    "br": 428,
    "pr": 302,
    "wt": ["Protag.", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "Vernier consumption reduced 1-15%"
    }
  }, {
    "part": "melee",
    "a": 889,
    "ma": 2589,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 302,
    "pr": 126,
    "wt": ["Protag.", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) EX Skill power boosted 8-25%"
    },
    "name": "Beam Zanba",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 889,
    "ma": 0,
    "sa": 1699,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 126,
    "wt": ["Protag.", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "Beam ranged weapon reload speed boosted 6-15%"
    },
    "name": "Zanbuster",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 889,
    "ma": 0,
    "sa": 0,
    "md": 1142,
    "sd": 558,
    "br": 590,
    "pr": 126,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Enemy Shooting power reduced 8-25%"
    },
    "name": "ABC Cloak"
  }]
}, {
  "name": "Dragon Gundam",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 559,
    "ma": 292,
    "sa": 1436,
    "md": 292,
    "sd": 891,
    "br": 127,
    "pr": 303,
    "wt": ["Mobile Fighter", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Queue Blade"
    }
  }, {
    "part": "torso",
    "a": 891,
    "ma": 559,
    "sa": 292,
    "md": 559,
    "sd": 1144,
    "br": 0,
    "pr": 430,
    "wt": ["Mobile Fighter", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Hyper Mode"
    }
  }, {
    "part": "arms",
    "a": 559,
    "ma": 1994,
    "sa": 292,
    "md": 559,
    "sd": 891,
    "br": 0,
    "pr": 0,
    "wt": ["Mobile Fighter", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Dragon Claw"
    }
  }, {
    "part": "legs",
    "a": 559,
    "ma": 292,
    "sa": 292,
    "md": 292,
    "sd": 891,
    "br": 303,
    "pr": 430,
    "wt": ["Mobile Fighter", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job Close Shot Attack raised 5-14%"
    }
  }, {
    "part": "backpack",
    "a": 559,
    "ma": 292,
    "sa": 292,
    "md": 292,
    "sd": 891,
    "br": 303,
    "pr": 430,
    "wt": ["Mobile Fighter", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job Enemy Sp. Shot power reduced 8-25%"
    }
  }, {
    "part": "melee",
    "a": 292,
    "ma": 2594,
    "sa": 0,
    "md": 0,
    "sd": 559,
    "br": 127,
    "pr": 303,
    "wt": ["Mobile Fighter", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Hell Jumper"
    },
    "name": "Feilong Flag",
    "type": "Beam"
  }]
}, {
  "name": "Delta Plus",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 889,
    "ma": 291,
    "sa": 558,
    "md": 889,
    "sd": 558,
    "br": 213,
    "pr": 213,
    "wt": ["Transformer", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1434,
    "ma": 558,
    "sa": 291,
    "md": 558,
    "sd": 558,
    "br": 213,
    "pr": 213,
    "wt": ["Transformer", "Federation"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) EX Skill DMG output boosted by 6-20"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 1992,
    "sa": 0,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Transformer", "Federation"],
    "ex": {
      "type": "Part Traits",
      "name": "With Rifle category equipped Sp. Shot DMG taken reduced 20"
    }
  }, {
    "part": "legs",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 558,
    "br": 350,
    "pr": 350,
    "wt": ["Transformer", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or more Sp. Shot power boosted 8-25%"
    }
  }, {
    "part": "backpack",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 558,
    "br": 350,
    "pr": 350,
    "wt": ["Transformer", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Buff EX Skill effect up 1-15%"
    }
  }, {
    "part": "melee",
    "a": 889,
    "ma": 2591,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 213,
    "pr": 213,
    "wt": ["Transformer", "Federation"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or more Strong Melee power boosted 8-20%"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 889,
    "ma": 0,
    "sa": 1702,
    "md": 0,
    "sd": 0,
    "br": 302,
    "pr": 302,
    "wt": ["Transformer", "Federation"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Beam Sp. Shot power boosted 8-25%"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 889,
    "ma": 0,
    "sa": 0,
    "md": 1142,
    "sd": 558,
    "br": 350,
    "pr": 350,
    "wt": ["Transformer", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Grenade Launcher"
    },
    "name": "Shield"
  }]
}, {
  "name": "Duel Gundam",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 889,
    "ma": 291,
    "sa": 1701,
    "md": 291,
    "sd": 291,
    "br": 302,
    "pr": 126,
    "wt": ["Mid-Range", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Igelstellung"
    }
  }, {
    "part": "torso",
    "a": 1433,
    "ma": 291,
    "sa": 558,
    "md": 558,
    "sd": 558,
    "br": 428,
    "pr": 0,
    "wt": ["Mid-Range", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Bazooka category equipped Sp. Shot power boosted 8-25%"
    }
  }, {
    "part": "arms",
    "a": 889,
    "ma": 558,
    "sa": 558,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Mid-Range", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Barrier Hack β"
    }
  }, {
    "part": "legs",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Mid-Range", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or less 4-13% chance to not recoil"
    }
  }, {
    "part": "backpack",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Mid-Range", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Combat Hack β"
    }
  }, {
    "part": "range",
    "a": 889,
    "ma": 0,
    "sa": 2300,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 126,
    "wt": ["Mid-Range", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (Self) EX Skill power boosted 8-25%"
    },
    "name": "57mm High-Energy Beam Rifle",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 889,
    "ma": 0,
    "sa": 2300,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 126,
    "wt": ["Mid-Range", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or less Enemy Shooting power reduced 8-25%"
    },
    "name": "Gae Bulg",
    "type": "Physical"
  }, {
    "part": "shield",
    "a": 889,
    "ma": 0,
    "sa": 0,
    "md": 558,
    "sd": 1142,
    "br": 590,
    "pr": 126,
    "wt": ["Mid-Range", "For Forest"],
    "ex": {
      "type": "EX Skill",
      "name": "Combat Hack α"
    },
    "name": "Anti-Beam Shield"
  }]
}, {
  "name": "Duel Gundam (Assault Shroud)",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 384,
    "ma": 384,
    "sa": 3181,
    "md": 384,
    "sd": 1182,
    "br": 0,
    "pr": 0,
    "wt": ["High Firepower", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "Beam ranged weapon reload speed boosted 8-20%"
    }
  }, {
    "part": "torso",
    "a": 1606,
    "ma": 384,
    "sa": 384,
    "md": 799,
    "sd": 1606,
    "br": 290,
    "pr": 290,
    "wt": ["High Firepower", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Armed Aura β"
    }
  }, {
    "part": "arms",
    "a": 1182,
    "ma": 799,
    "sa": 384,
    "md": 384,
    "sd": 1606,
    "br": 290,
    "pr": 290,
    "wt": ["High Firepower", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Shiva & 5-Tube Missile Pod"
    }
  }, {
    "part": "legs",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 799,
    "sd": 1606,
    "br": 420,
    "pr": 420,
    "wt": ["High Firepower", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) EX Skill piercing boosted 10-28%"
    }
  }, {
    "part": "backpack",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 799,
    "sd": 1606,
    "br": 420,
    "pr": 420,
    "wt": ["High Firepower", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Melee DMG Output boosted 8-35"
    }
  }]
}, {
  "name": "Earththree Gundam",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 795,
    "ma": 382,
    "sa": 2377,
    "md": 795,
    "sd": 795,
    "br": 0,
    "pr": 416,
    "wt": ["Protag.", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1601,
    "ma": 382,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 0,
    "pr": 609,
    "wt": ["Protag.", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Buff EX Skill effect up 4-22%"
    }
  }, {
    "part": "arms",
    "a": 795,
    "ma": 2377,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "6-15% chance of attacks penetrating super armor"
    }
  }, {
    "part": "legs",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 416,
    "pr": 609,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Beam Long Shot Attack raised 8-20%"
    }
  }, {
    "part": "backpack",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 416,
    "pr": 609,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Cougar Rush"
    }
  }, {
    "part": "melee",
    "a": 795,
    "ma": 3173,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 201,
    "pr": 609,
    "wt": ["Protag.", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Melee DMG taken reduced 8-35"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 795,
    "ma": 0,
    "sa": 3173,
    "md": 0,
    "sd": 0,
    "br": 201,
    "pr": 609,
    "wt": ["Protag.", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Charge Shot"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 795,
    "ma": 0,
    "sa": 0,
    "md": 1601,
    "sd": 1601,
    "br": 211,
    "pr": 805,
    "wt": ["Protag.", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "Beam ranged weapon magazine boosted 9-20%"
    },
    "name": "Shield"
  }]
}, {
  "name": "Efreet Custom",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 561,
    "ma": 294,
    "sa": 1440,
    "md": 294,
    "sd": 893,
    "br": 215,
    "pr": 215,
    "wt": ["Zeon", "For Desert"],
    "ex": {
      "type": "EX Skill",
      "name": "EXAM System"
    }
  }, {
    "part": "torso",
    "a": 893,
    "ma": 561,
    "sa": 294,
    "md": 561,
    "sd": 1147,
    "br": 215,
    "pr": 215,
    "wt": ["Zeon", "For Desert"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job Buff EX Skill effect up 1-15%"
    }
  }, {
    "part": "arms",
    "a": 561,
    "ma": 2000,
    "sa": 294,
    "md": 561,
    "sd": 893,
    "br": 0,
    "pr": 0,
    "wt": ["Zeon", "For Desert"],
    "ex": {
      "type": "EX Skill",
      "name": "Arm Grenade Launcher"
    }
  }, {
    "part": "legs",
    "a": 561,
    "ma": 294,
    "sa": 294,
    "md": 294,
    "sd": 893,
    "br": 352,
    "pr": 352,
    "wt": ["Zeon", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Leg Missile Pod"
    }
  }, {
    "part": "backpack",
    "a": 561,
    "ma": 294,
    "sa": 294,
    "md": 294,
    "sd": 893,
    "br": 352,
    "pr": 352,
    "wt": ["Zeon", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Heat Rush"
    }
  }, {
    "part": "melee",
    "a": 294,
    "ma": 2601,
    "sa": 0,
    "md": 0,
    "sd": 561,
    "br": 215,
    "pr": 215,
    "wt": ["Zeon", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "While Zeon Strong Melee CRIT rate boosted 8-17%"
    },
    "name": "Heat Saber",
    "type": "Physical"
  }]
}, {
  "name": "Enhanced ZZ Gundam [Ver. Ka]",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 965,
    "ma": 0,
    "sa": 3306,
    "md": 551,
    "sd": 551,
    "br": 282,
    "pr": 464,
    "wt": ["Gundam Type", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "High Mega Cannon"
    }
  }, {
    "part": "torso",
    "a": 1732,
    "ma": 551,
    "sa": 551,
    "md": 1732,
    "sd": 965,
    "br": 75,
    "pr": 670,
    "wt": ["Gundam Type", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "Biosensor"
    }
  }, {
    "part": "arms",
    "a": 1884,
    "ma": 1506,
    "sa": 551,
    "md": 4255,
    "sd": 1506,
    "br": 381,
    "pr": 947,
    "wt": ["Gundam Type", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Strong Melee DMG output boosted by 35"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 965,
    "ma": 329,
    "sa": 551,
    "md": 1732,
    "sd": 965,
    "br": 464,
    "pr": 670,
    "wt": ["Gundam Type", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "With Blade category equipped EX Skill CD reduced 20%"
    }
  }, {
    "part": "backpack",
    "a": 965,
    "ma": 329,
    "sa": 551,
    "md": 1732,
    "sd": 965,
    "br": 464,
    "pr": 670,
    "wt": ["Gundam Type", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Double Cannon & Missile Launcher"
    }
  }, {
    "part": "melee",
    "a": 551,
    "ma": 3138,
    "sa": 0,
    "md": 788,
    "sd": 153,
    "br": 282,
    "pr": 464,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Hyper Beam Saber"
    },
    "name": "Hyper Beam Saber",
    "type": "Beam"
  }]
}, {
  "name": "Force Impulse Gundam",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 795,
    "ma": 382,
    "sa": 2377,
    "md": 795,
    "sd": 795,
    "br": 0,
    "pr": 416,
    "wt": ["Gundam Type", "For Tundra"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Shooting CRIT rate boosted 10-30%"
    }
  }, {
    "part": "torso",
    "a": 1601,
    "ma": 382,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 0,
    "pr": 609,
    "wt": ["Gundam Type", "For Tundra"],
    "ex": {
      "type": "EX Skill",
      "name": "CIWS"
    }
  }, {
    "part": "arms",
    "a": 795,
    "ma": 2377,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 0,
    "pr": 0,
    "wt": ["Gundam Type", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Strong Melee CRIT rate boosted 10-30%"
    }
  }, {
    "part": "legs",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 416,
    "pr": 609,
    "wt": ["Gundam Type", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Rapid Thrust"
    }
  }, {
    "part": "backpack",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 416,
    "pr": 609,
    "wt": ["Gundam Type", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Excalibur"
    }
  }, {
    "part": "melee",
    "a": 795,
    "ma": 3173,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 211,
    "pr": 609,
    "wt": ["Gundam Type", "For Tundra"],
    "ex": {
      "type": "Part Traits",
      "name": "With Rifle category equipped Initial EX Skill charge boosted 6-20%"
    },
    "name": "Vajra Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 795,
    "ma": 0,
    "sa": 3173,
    "md": 0,
    "sd": 0,
    "br": 211,
    "pr": 609,
    "wt": ["Gundam Type", "Protag."],
    "ex": {
      "type": "Part Traits",
      "name": "With Rifle category equipped Enemy Shooting power reduced 17-30%"
    },
    "name": "MA-BAR72 High-Energy Beam Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 795,
    "ma": 0,
    "sa": 0,
    "md": 1601,
    "sd": 1601,
    "br": 211,
    "pr": 805,
    "wt": ["Gundam Type", "Protag."],
    "ex": {
      "type": "EX Skill",
      "name": "Shield Throw"
    },
    "name": "Mobile Shield"
  }]
}, {
  "name": "Freedom Gundam",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 1356,
    "ma": 553,
    "sa": 2523,
    "md": 553,
    "sd": 553,
    "br": 383,
    "pr": 383,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Picus"
    }
  }, {
    "part": "torso",
    "a": 2133,
    "ma": 553,
    "sa": 966,
    "md": 966,
    "sd": 966,
    "br": 383,
    "pr": 383,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When armor is 40% or more, Strong Melee DMG output boosted 35"
    }
  }, {
    "part": "arms",
    "a": 1356,
    "ma": 966,
    "sa": 966,
    "md": 1356,
    "sd": 1356,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Sp. Shot power boosted 30%"
    }
  }, {
    "part": "legs",
    "a": 1356,
    "ma": 553,
    "sa": 553,
    "md": 966,
    "sd": 1356,
    "br": 555,
    "pr": 555,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Xiphias Rail Cannon"
    }
  }, {
    "part": "backpack",
    "a": 1356,
    "ma": 553,
    "sa": 553,
    "md": 966,
    "sd": 1356,
    "br": 555,
    "pr": 555,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Balaena Plasma Beam Cannon"
    }
  }, {
    "part": "range",
    "a": 1356,
    "ma": 0,
    "sa": 3312,
    "md": 0,
    "sd": 0,
    "br": 465,
    "pr": 465,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Job Gauge increase boosted 17%"
    },
    "name": "Lupus Beam Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 1356,
    "ma": 0,
    "sa": 0,
    "md": 965,
    "sd": 1734,
    "br": 555,
    "pr": 555,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Shield Bash"
    },
    "name": "Laminated Anti-Beam Shield"
  }]
}, {
  "name": "Gaia",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 558,
    "ma": 291,
    "sa": 1698,
    "md": 558,
    "sd": 558,
    "br": 0,
    "pr": 302,
    "wt": ["Transformer", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "CIWS"
    }
  }, {
    "part": "torso",
    "a": 1140,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 428,
    "wt": ["Transformer", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job, Enemy EX Skill Penetration reduced 22%"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 1698,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Transformer", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "While \"Transformer\", Strong Melee CRIT Rate boosted 17%"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 302,
    "pr": 428,
    "wt": ["Transformer", "For Forest"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed Attribute (self), 13% chance to not recoil"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 302,
    "pr": 428,
    "wt": ["Transformer", "For Forest"],
    "ex": {
      "type": "EX Skill",
      "name": "MA-81R Beam Assault Cannon"
    }
  }, {
    "part": "shield",
    "a": 558,
    "ma": 0,
    "sa": 0,
    "md": 1140,
    "sd": 1140,
    "br": 126,
    "pr": 558,
    "wt": ["Gundam Type", "Transformer"],
    "ex": {
      "type": "EX Skill",
      "name": "Shield Throw"
    },
    "name": "Mobile Shield (Gaia)"
  }, {
    "part": "melee",
    "a": 558,
    "ma": 2297,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 126,
    "pr": 428,
    "wt": ["Transformer", "For Forest"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job, Job Gauge Increase boosted 13%"
    },
    "name": "Vajra Beam Saber (Gaia)",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 558,
    "ma": 0,
    "sa": 2297,
    "md": 0,
    "sd": 0,
    "br": 126,
    "pr": 428,
    "wt": ["Transformer", "For Forest"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed Attribute (self), EX Skill Power boosted 25%"
    },
    "name": "High-Energy Beam Rifle (Gaia)",
    "type": "Beam"
  }]
}, {
  "name": "Gouf Custom",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 558,
    "ma": 291,
    "sa": 889,
    "md": 889,
    "sd": 889,
    "br": 302,
    "pr": 0,
    "wt": ["Zeon", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or less Recover 1-10 Armor gradually"
    }
  }, {
    "part": "torso",
    "a": 1140,
    "ma": 291,
    "sa": 0,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 0,
    "wt": ["Zeon", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job EX Skill CD reduced 4-15%"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 889,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 302,
    "pr": 126,
    "wt": ["Zeon", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Head Rod"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1140,
    "sd": 1140,
    "br": 126,
    "pr": 302,
    "wt": ["Zeon", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job Close Shot Attack raised 5-14%"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1140,
    "sd": 1140,
    "br": 302,
    "pr": 126,
    "wt": ["Zeon", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Melee DMG output boosted by 6-20"
    }
  }, {
    "part": "melee",
    "a": 558,
    "ma": 1140,
    "sa": 0,
    "md": 558,
    "sd": 558,
    "br": 428,
    "pr": 302,
    "wt": ["Zeon", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Physical Strong Melee power boosted 8-20%"
    },
    "name": "Heat Sword",
    "type": "Physical"
  }, {
    "part": "melee",
    "a": 558,
    "ma": 1140,
    "sa": 0,
    "md": 558,
    "sd": 558,
    "br": 428,
    "pr": 302,
    "wt": ["Zeon", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Job Gauge increase boosted 4-13%"
    },
    "name": "Heat Rod",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 558,
    "ma": 0,
    "sa": 1140,
    "md": 1990,
    "sd": 1990,
    "br": 1016,
    "pr": 428,
    "wt": ["Zeon", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "Physical ranged weapon magazine boosted 20%"
    },
    "name": "Gatling Shield",
    "type": "Physical",
    "combo": "shield"
  }]
}, {
  "name": "Gerbera Tetra",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 889,
    "ma": 291,
    "sa": 1701,
    "md": 291,
    "sd": 291,
    "br": 302,
    "pr": 126,
    "wt": ["Ace Excl.", "Zeon"],
    "ex": {
      "type": "Part Traits",
      "name": "With Gundam Type enemy Shooting power boosted 8-25%"
    }
  }, {
    "part": "torso",
    "a": 1433,
    "ma": 291,
    "sa": 558,
    "md": 558,
    "sd": 558,
    "br": 428,
    "pr": 0,
    "wt": ["Ace Excl.", "Zeon"],
    "ex": {
      "type": "Part Traits",
      "name": "With Gundam Type enemy EX Skill DMG output boosted 6-20"
    }
  }, {
    "part": "arms",
    "a": 889,
    "ma": 558,
    "sa": 558,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Ace Excl.", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "110mm Autocannon"
    }
  }, {
    "part": "legs",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Ace Excl.", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Saber Combo"
    }
  }, {
    "part": "backpack",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or more Buff EX Skill effect up 1-15%"
    }
  }, {
    "part": "range",
    "a": 889,
    "ma": 0,
    "sa": 2300,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 126,
    "wt": ["Ace Excl.", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Panic Maker"
    },
    "name": "Beam Machine Gun",
    "type": "Beam"
  }]
}, {
  "name": "Gundam",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 796,
    "ma": 383,
    "sa": 2378,
    "md": 796,
    "sd": 796,
    "br": 212,
    "pr": 212,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1602,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 288,
    "pr": 288,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Saber category equipped Melee power boosted 17-30%"
    }
  }, {
    "part": "arms",
    "a": 796,
    "ma": 2378,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Melee DMG taken reduced by 8-35"
    }
  }, {
    "part": "legs",
    "a": 796,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 475,
    "pr": 502,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Mid Shot Attack raised 8-20%"
    }
  }, {
    "part": "backpack",
    "a": 796,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 502,
    "pr": 475,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Double Saber Rush"
    }
  }, {
    "part": "melee",
    "a": 796,
    "ma": 3176,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 417,
    "pr": 417,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Crimson Stinger"
    },
    "name": "Beam Javelin",
    "type": "Beam"
  }, {
    "part": "melee",
    "a": 796,
    "ma": 3176,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 417,
    "pr": 417,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Melee Crit rate boosted 10-30%"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 796,
    "ma": 0,
    "sa": 3176,
    "md": 0,
    "sd": 0,
    "br": 417,
    "pr": 417,
    "wt": ["Protag.", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Last Shooting"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 796,
    "ma": 0,
    "sa": 3176,
    "md": 0,
    "sd": 0,
    "br": 417,
    "pr": 417,
    "wt": ["Protag.", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Shooting DMG output boosted by 8-35"
    },
    "name": "Hyper Bazooka",
    "type": "Physical"
  }, {
    "part": "shield",
    "a": 796,
    "ma": 0,
    "sa": 0,
    "md": 1602,
    "sd": 1602,
    "br": 417,
    "pr": 417,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Buff EX Skill effect up 4-22%"
    },
    "name": "Shield"
  }]
}, {
  "name": "Gundam AGE Normal",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 559,
    "ma": 294,
    "sa": 893,
    "md": 559,
    "sd": 559,
    "br": 303,
    "pr": 303,
    "wt": ["Mid-Range", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Combat Stance α"
    }
  }, {
    "part": "torso",
    "a": 559,
    "ma": 294,
    "sa": 294,
    "md": 559,
    "sd": 559,
    "br": 432,
    "pr": 432,
    "wt": ["Mid-Range", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With \"For Computers\" enemy Strong Melee power boosted 8-25%"
    }
  }, {
    "part": "arms",
    "a": 294,
    "ma": 893,
    "sa": 294,
    "md": 559,
    "sd": 559,
    "br": 432,
    "pr": 432,
    "wt": ["Mid-Range", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or less Melee DMG output boosted 6-20"
    }
  }, {
    "part": "legs",
    "a": 294,
    "ma": 294,
    "sa": 294,
    "md": 893,
    "sd": 893,
    "br": 432,
    "pr": 432,
    "wt": ["Mid-Range", "Protag."],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Dagger Bites"
    }
  }, {
    "part": "backpack",
    "a": 294,
    "ma": 294,
    "sa": 294,
    "md": 893,
    "sd": 893,
    "br": 432,
    "pr": 432,
    "wt": ["Mid-Range", "Protag."],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or more Shooting DMG output boosted 6-20"
    }
  }, {
    "part": "range",
    "a": 559,
    "ma": 0,
    "sa": 1146,
    "md": 0,
    "sd": 0,
    "br": 432,
    "pr": 432,
    "wt": ["Mid-Range", "Protag."],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Initial EX Skill charge boosted 3-12%"
    },
    "name": "DODS Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 294,
    "ma": 0,
    "sa": 0,
    "md": 893,
    "sd": 893,
    "br": 594,
    "pr": 594,
    "wt": ["Mid-Range", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Buff EX Skill effect up 15%"
    },
    "name": "Shield"
  }]
}, {
  "name": "Gundam AGE Titus",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 559,
    "ma": 292,
    "sa": 891,
    "md": 891,
    "sd": 891,
    "br": 127,
    "pr": 127,
    "wt": ["High Firepower", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Protection β"
    }
  }, {
    "part": "torso",
    "a": 1145,
    "ma": 292,
    "sa": 0,
    "md": 891,
    "sd": 891,
    "br": 214,
    "pr": 214,
    "wt": ["High Firepower", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Physical Strong Melee power boosted 8-25%"
    }
  }, {
    "part": "arms",
    "a": 559,
    "ma": 891,
    "sa": 292,
    "md": 891,
    "sd": 891,
    "br": 127,
    "pr": 127,
    "wt": ["High Firepower", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Lariat"
    }
  }, {
    "part": "legs",
    "a": 559,
    "ma": 292,
    "sa": 292,
    "md": 1145,
    "sd": 1145,
    "br": 214,
    "pr": 214,
    "wt": ["High Firepower", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Archer Hack β"
    }
  }, {
    "part": "backpack",
    "a": 559,
    "ma": 292,
    "sa": 292,
    "md": 1145,
    "sd": 1145,
    "br": 214,
    "pr": 214,
    "wt": ["High Firepower", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Physical Melee power boosted 8-25%"
    }
  }]
}, {
  "name": "Gundam AGE-2 Normal",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 561,
    "ma": 294,
    "sa": 1440,
    "md": 294,
    "sd": 893,
    "br": 215,
    "pr": 215,
    "wt": ["Transformer", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Shooting DMG taken reduced by 6-20"
    }
  }, {
    "part": "torso",
    "a": 893,
    "ma": 561,
    "sa": 294,
    "md": 561,
    "sd": 1147,
    "br": 215,
    "pr": 215,
    "wt": ["Transformer", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "While Transformer EX Skill CD reduced 4-15%"
    }
  }, {
    "part": "arms",
    "a": 561,
    "ma": 2000,
    "sa": 294,
    "md": 561,
    "sd": 893,
    "br": 0,
    "pr": 0,
    "wt": ["Transformer", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "Beam ranged weapon reload speed boosted 6-15%"
    }
  }, {
    "part": "legs",
    "a": 561,
    "ma": 294,
    "sa": 294,
    "md": 294,
    "sd": 893,
    "br": 352,
    "pr": 352,
    "wt": ["Transformer", "Protag."],
    "ex": {
      "type": "EX Skill",
      "name": "Stream Slash"
    }
  }, {
    "part": "backpack",
    "a": 561,
    "ma": 294,
    "sa": 294,
    "md": 294,
    "sd": 893,
    "br": 352,
    "pr": 352,
    "wt": ["Transformer", "Protag."],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 80% or less Close Shot Attack raised 5-14%"
    }
  }, {
    "part": "range",
    "a": 561,
    "ma": 0,
    "sa": 1440,
    "md": 0,
    "sd": 561,
    "br": 215,
    "pr": 215,
    "wt": ["Transformer", "Protag."],
    "ex": {
      "type": "Part Traits",
      "name": "While Transformer Initial EX Skill charge boosted 3-12%"
    },
    "name": "Hyper DODS Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 561,
    "ma": 0,
    "sa": 0,
    "md": 561,
    "sd": 1440,
    "br": 352,
    "pr": 352,
    "wt": ["Transformer", "Protag."],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job Sp. Shot CRIT rate boosted 7-21%"
    },
    "name": "Shield"
  }]
}, {
  "name": "Gundam Artemis",
  "attribute": "Power",
  "rarity": 2,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 796,
    "ma": 383,
    "sa": 2378,
    "md": 796,
    "sd": 796,
    "br": 417,
    "pr": 0,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "CIWS"
    }
  }, {
    "part": "torso",
    "a": 1601,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 610,
    "pr": 0,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Breast Beam Vulcan"
    }
  }, {
    "part": "arms",
    "a": 1601,
    "ma": 2378,
    "sa": 383,
    "md": 2781,
    "sd": 2781,
    "br": 417,
    "pr": 417,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Palma Fiocina Beam Cannon"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 796,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 610,
    "pr": 417,
    "wt": ["Protag.", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "11% chance to not recoil"
    }
  }, {
    "part": "backpack",
    "a": 796,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 610,
    "pr": 417,
    "wt": ["Protag.", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "Buff EX Skill effect up 12%"
    }
  }, {
    "part": "melee",
    "a": 796,
    "ma": 3175,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 610,
    "pr": 212,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "Melee DMG output boosted 15"
    },
    "name": "Arondight",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 796,
    "ma": 0,
    "sa": 3175,
    "md": 0,
    "sd": 0,
    "br": 610,
    "pr": 212,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "Shooting DMG output boosted 15"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }]
}, {
  "name": "Gundam Astaroth",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 800,
    "ma": 385,
    "sa": 1985,
    "md": 385,
    "sd": 1185,
    "br": 292,
    "pr": 292,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "Physical ranged weapon reload speed boosted 20%"
    }
  }, {
    "part": "torso",
    "a": 1185,
    "ma": 800,
    "sa": 385,
    "md": 800,
    "sd": 1610,
    "br": 292,
    "pr": 292,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Blade category equipped EX Skill DMG output boosted 35"
    }
  }, {
    "part": "arms",
    "a": 1610,
    "ma": 2795,
    "sa": 385,
    "md": 1610,
    "sd": 3190,
    "br": 479,
    "pr": 479,
    "wt": ["Protag.", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Sub-Knuckle"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 800,
    "ma": 385,
    "sa": 385,
    "md": 385,
    "sd": 1185,
    "br": 479,
    "pr": 479,
    "wt": ["Protag.", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Knife Attack"
    }
  }, {
    "part": "backpack",
    "a": 800,
    "ma": 385,
    "sa": 385,
    "md": 385,
    "sd": 1185,
    "br": 479,
    "pr": 479,
    "wt": ["Protag.", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Demolition Knife"
    }
  }, {
    "part": "melee",
    "a": 385,
    "ma": 3594,
    "sa": 0,
    "md": 0,
    "sd": 800,
    "br": 292,
    "pr": 292,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Strong Melee CRIT rate boosted 30%"
    },
    "name": "Demolition Knife",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 800,
    "ma": 0,
    "sa": 1985,
    "md": 0,
    "sd": 800,
    "br": 292,
    "pr": 292,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Blade category equipped Shooting DMG taken reduced by 35"
    },
    "name": "Rifle",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 800,
    "ma": 0,
    "sa": 1985,
    "md": 0,
    "sd": 800,
    "br": 292,
    "pr": 292,
    "wt": ["For Computers", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Physical Sp. Shot CRIT rate boosted 30%"
    },
    "name": "Anti-Material Rifle",
    "type": "Physical"
  }]
}, {
  "name": "Gundam Barbatos [4th Form]",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 799,
    "ma": 384,
    "sa": 1979,
    "md": 384,
    "sd": 1182,
    "br": 420,
    "pr": 213,
    "wt": ["Protag.", "For Forest"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Close Shot Attack raised 8-20%"
    }
  }, {
    "part": "torso",
    "a": 1182,
    "ma": 799,
    "sa": 384,
    "md": 799,
    "sd": 1606,
    "br": 612,
    "pr": 0,
    "wt": ["Protag.", "For Forest"],
    "ex": {
      "type": "EX Skill",
      "name": "Fearless Hurl"
    }
  }, {
    "part": "arms",
    "a": 799,
    "ma": 2786,
    "sa": 384,
    "md": 799,
    "sd": 1182,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "In-fighter Job Melee power boosted 17-30%"
    }
  }, {
    "part": "legs",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 384,
    "sd": 1182,
    "br": 612,
    "pr": 420,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Menace Shot"
    }
  }, {
    "part": "backpack",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 384,
    "sd": 1182,
    "br": 612,
    "pr": 420,
    "wt": ["Protag.", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Melee DMG output boosted by 8-35"
    }
  }, {
    "part": "melee",
    "a": 384,
    "ma": 3586,
    "sa": 0,
    "md": 0,
    "sd": 799,
    "br": 420,
    "pr": 213,
    "wt": ["Protag.", "For Forest"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job Melee CRIT rate boosted 10-30%"
    },
    "name": "Long Sword",
    "type": "Physical"
  }, {
    "part": "melee",
    "a": 384,
    "ma": 3586,
    "sa": 0,
    "md": 0,
    "sd": 799,
    "br": 420,
    "pr": 213,
    "wt": ["Protag.", "For Forest"],
    "ex": {
      "type": "EX Skill",
      "name": "Iron Impact"
    },
    "name": "Mace",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 799,
    "ma": 0,
    "sa": 1979,
    "md": 0,
    "sd": 799,
    "br": 612,
    "pr": 213,
    "wt": ["Protag.", "For Forest"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Close Shot Attack raised 8-20%"
    },
    "name": "Smoothbore Cannon",
    "type": "Physical"
  }]
}, {
  "name": "Gundam Barbatos [6th Form]",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1182,
    "ma": 384,
    "sa": 799,
    "md": 1182,
    "sd": 384,
    "br": 290,
    "pr": 290,
    "wt": ["For Urban Area", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "With Blade category equipped EX Skill DMG output boosted 8-35"
    }
  }, {
    "part": "torso",
    "a": 1606,
    "ma": 384,
    "sa": 384,
    "md": 1606,
    "sd": 799,
    "br": 290,
    "pr": 290,
    "wt": ["For Urban Area", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "Defender Job Shooting DMG taken reduced 8-35"
    }
  }, {
    "part": "arms",
    "a": 384,
    "ma": 3181,
    "sa": 384,
    "md": 1606,
    "sd": 384,
    "br": 0,
    "pr": 0,
    "wt": ["For Urban Area", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "170mm Autocannon"
    }
  }, {
    "part": "legs",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 1606,
    "sd": 799,
    "br": 420,
    "pr": 290,
    "wt": ["For Urban Area", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "Defender Job EX Skill piercing boosted 10-28%"
    }
  }, {
    "part": "backpack",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 1606,
    "sd": 799,
    "br": 290,
    "pr": 420,
    "wt": ["For Urban Area", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Bloody Wrench"
    }
  }, {
    "part": "melee",
    "a": 384,
    "ma": 4004,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 420,
    "pr": 420,
    "wt": ["For Urban Area", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "Mace Rush"
    },
    "name": "Wrench Mace",
    "type": "Physical"
  }]
}, {
  "name": "Gundam Deathscythe",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 795,
    "ma": 382,
    "sa": 1179,
    "md": 1179,
    "sd": 1179,
    "br": 0,
    "pr": 416,
    "wt": ["High Mobility", "For Forest"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1601,
    "ma": 382,
    "sa": 0,
    "md": 1179,
    "sd": 1179,
    "br": 0,
    "pr": 609,
    "wt": ["High Mobility", "For Forest"],
    "ex": {
      "type": "EX Skill",
      "name": "Machine Cannon"
    }
  }, {
    "part": "arms",
    "a": 795,
    "ma": 1179,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 211,
    "pr": 416,
    "wt": ["High Mobility", "For Forest"],
    "ex": {
      "type": "Part Traits",
      "name": "With Axe category equipped Mid Shot Attack raised 8-20%"
    }
  }, {
    "part": "legs",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1601,
    "sd": 1601,
    "br": 416,
    "pr": 211,
    "wt": ["High Mobility", "For Base"],
    "ex": {
      "type": "Part Traits",
      "name": "With Axe category equipped EX Skill CD reduced 6-20%"
    }
  }, {
    "part": "backpack",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1601,
    "sd": 1601,
    "br": 211,
    "pr": 416,
    "wt": ["High Mobility", "For Base"],
    "ex": {
      "type": "EX Skill",
      "name": "Hyper Jammer"
    }
  }, {
    "part": "melee",
    "a": 795,
    "ma": 1601,
    "sa": 0,
    "md": 795,
    "sd": 795,
    "br": 416,
    "pr": 609,
    "wt": ["High Mobility", "For Base"],
    "ex": {
      "type": "EX Skill",
      "name": "Deadly Circle"
    },
    "name": "Beam Scythe",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 0,
    "ma": 0,
    "sa": 0,
    "md": 1974,
    "sd": 1974,
    "br": 211,
    "pr": 805,
    "wt": ["High Mobility", "For Base"],
    "ex": {
      "type": "EX Skill",
      "name": "Buster Shield"
    },
    "name": "Buster Shield"
  }]
}, {
  "name": "Gundam Deathscythe Hell (Endless Waltz Ver.)",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1180,
    "ma": 383,
    "sa": 796,
    "md": 1180,
    "sd": 796,
    "br": 417,
    "pr": 212,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1976,
    "ma": 796,
    "sa": 383,
    "md": 796,
    "sd": 796,
    "br": 610,
    "pr": 0,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Self-Destruct"
    }
  }, {
    "part": "arms",
    "a": 796,
    "ma": 2781,
    "sa": 0,
    "md": 1180,
    "sd": 1180,
    "br": 0,
    "pr": 0,
    "wt": ["Gundam Type", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Hyper Jammer"
    }
  }, {
    "part": "legs",
    "a": 1180,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 796,
    "br": 610,
    "pr": 417,
    "wt": ["Gundam Type", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Axe category equipped, Melee CRIT rate boosted 30%"
    }
  }, {
    "part": "backpack",
    "a": 1180,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 796,
    "br": 610,
    "pr": 417,
    "wt": ["Gundam Type", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job, EX Skill piercing boosted 28%"
    }
  }, {
    "part": "melee",
    "a": 1180,
    "ma": 3577,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 417,
    "pr": 212,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Deadly Circle"
    },
    "name": "Beam Scissors",
    "type": "Beam"
  }]
}, {
  "name": "Gundam Dynames",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 384,
    "ma": 384,
    "sa": 3181,
    "md": 384,
    "sd": 1182,
    "br": 0,
    "pr": 0,
    "wt": ["Long-Range", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Archer Stance γ"
    }
  }, {
    "part": "torso",
    "a": 1606,
    "ma": 384,
    "sa": 384,
    "md": 799,
    "sd": 1606,
    "br": 290,
    "pr": 290,
    "wt": ["Long-Range", "For Desert"],
    "ex": {
      "type": "Part Traits",
      "name": "Long-Shooter Job Shooting Power boosted 17-30%"
    }
  }, {
    "part": "arms",
    "a": 1182,
    "ma": 799,
    "sa": 384,
    "md": 384,
    "sd": 1606,
    "br": 290,
    "pr": 290,
    "wt": ["Long-Range", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "Long-Shooter Job Shot guidance boosted 8-17%"
    }
  }, {
    "part": "legs",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 799,
    "sd": 1606,
    "br": 420,
    "pr": 420,
    "wt": ["Long-Range", "For Desert"],
    "ex": {
      "type": "EX Skill",
      "name": "GN Missile"
    }
  }, {
    "part": "backpack",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 799,
    "sd": 1606,
    "br": 420,
    "pr": 420,
    "wt": ["Long-Range", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Trans-Am"
    }
  }, {
    "part": "range",
    "a": 384,
    "ma": 0,
    "sa": 4004,
    "md": 0,
    "sd": 0,
    "br": 290,
    "pr": 290,
    "wt": ["Long-Range", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "Beam ranged weapon reload speed boosted 8-20%"
    },
    "name": "GN Sniper Rifle",
    "type": "Beam"
  }]
}, {
  "name": "Gundam Exia",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1181,
    "ma": 384,
    "sa": 796,
    "md": 1181,
    "sd": 384,
    "br": 213,
    "pr": 417,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Recovery Tool α"
    }
  }, {
    "part": "torso",
    "a": 1602,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 0,
    "pr": 611,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job EX Skill CD reduced 6-20%"
    }
  }, {
    "part": "arms",
    "a": 384,
    "ma": 3177,
    "sa": 384,
    "md": 1602,
    "sd": 384,
    "br": 0,
    "pr": 0,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Double Saber Shear"
    }
  }, {
    "part": "legs",
    "a": 796,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 611,
    "pr": 417,
    "wt": ["Gundam Type", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Edge Fling"
    }
  }, {
    "part": "backpack",
    "a": 796,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 417,
    "pr": 611,
    "wt": ["Gundam Type", "For Base"],
    "ex": {
      "type": "EX Skill",
      "name": "Trans-Am Raid"
    }
  }, {
    "part": "melee",
    "a": 1181,
    "ma": 2380,
    "sa": 0,
    "md": 0,
    "sd": 384,
    "br": 417,
    "pr": 213,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Initial EX Skill Charge boosted 6-20%"
    },
    "name": "GN Sword",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 1181,
    "ma": 0,
    "sa": 3177,
    "md": 0,
    "sd": 0,
    "br": 611,
    "pr": 213,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Enemy Strong Melee Power Reduced 17-30%"
    },
    "name": "GN Sword Rifle Mode",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 796,
    "ma": 0,
    "sa": 0,
    "md": 2380,
    "sd": 796,
    "br": 0,
    "pr": 1028,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more EX Skill DMG output boosted by 8-35"
    },
    "name": "GN Shield"
  }]
}, {
  "name": "Gundam F91",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 796,
    "ma": 383,
    "sa": 2378,
    "md": 796,
    "sd": 796,
    "br": 212,
    "pr": 212,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "MEPE Mode"
    }
  }, {
    "part": "torso",
    "a": 1602,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 288,
    "pr": 288,
    "wt": ["Protag.", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Saber category equipped EX Skill DMG output boosted 35"
    }
  }, {
    "part": "arms",
    "a": 1602,
    "ma": 2378,
    "sa": 383,
    "md": 2781,
    "sd": 2781,
    "br": 417,
    "pr": 417,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Bazooka category equipped Sp. Shot power boosted 30%"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 796,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 475,
    "pr": 502,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Spinning Saber"
    }
  }, {
    "part": "backpack",
    "a": 796,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 502,
    "pr": 475,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "V.S.B.R."
    }
  }, {
    "part": "melee",
    "a": 796,
    "ma": 3176,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 417,
    "pr": 417,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Rifle category equipped Melee DMG output boosted 35"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 796,
    "ma": 0,
    "sa": 3176,
    "md": 0,
    "sd": 0,
    "br": 417,
    "pr": 417,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Saber category equipped EX Skill power boosted 30%"
    },
    "name": "Beam Launcher",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 796,
    "ma": 0,
    "sa": 3176,
    "md": 0,
    "sd": 0,
    "br": 417,
    "pr": 417,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Saber category equipped Initial EX Skill charge boosted 20%"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }]
}, {
  "name": "Gundam Full Armor [Thunderbolt Ver.]",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 796,
    "ma": 383,
    "sa": 2378,
    "md": 796,
    "sd": 796,
    "br": 417,
    "pr": 0,
    "wt": ["Protag.", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1601,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 610,
    "pr": 0,
    "wt": ["Protag.", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "7-Barrel Missile Launcher"
    }
  }, {
    "part": "arms",
    "a": 1601,
    "ma": 2378,
    "sa": 383,
    "md": 2781,
    "sd": 2781,
    "br": 417,
    "pr": 417,
    "wt": ["Protag.", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Twin Beam Rifle & Rocket Launcher"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 796,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 610,
    "pr": 417,
    "wt": ["Protag.", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "6-Barrel Missile Launcher"
    }
  }, {
    "part": "backpack",
    "a": 796,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 1180,
    "br": 610,
    "pr": 417,
    "wt": ["Protag.", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Free Improvisation"
    }
  }]
}, {
  "name": "Gundam GP01 (Zephyranthes)",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1605,
    "ma": 384,
    "sa": 1181,
    "md": 797,
    "sd": 797,
    "br": 418,
    "pr": 0,
    "wt": ["Protag.", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 2382,
    "ma": 384,
    "sa": 384,
    "md": 797,
    "sd": 797,
    "br": 611,
    "pr": 0,
    "wt": ["Protag.", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Combat Hack β"
    }
  }, {
    "part": "arms",
    "a": 1181,
    "ma": 1181,
    "sa": 384,
    "md": 1181,
    "sd": 1181,
    "br": 213,
    "pr": 0,
    "wt": ["Protag.", "For Desert"],
    "ex": {
      "type": "Part Traits",
      "name": "Beam ranged weapon reload speed boosted 8-20%"
    }
  }, {
    "part": "legs",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 1181,
    "sd": 1181,
    "br": 213,
    "pr": 611,
    "wt": ["Protag.", "For Desert"],
    "ex": {
      "type": "Part Traits",
      "name": "Defender Job EX Skill CD reduced 6-20%"
    }
  }, {
    "part": "backpack",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 1181,
    "sd": 1181,
    "br": 611,
    "pr": 213,
    "wt": ["Protag.", "For Desert"],
    "ex": {
      "type": "EX Skill",
      "name": "Battlecry"
    }
  }, {
    "part": "range",
    "a": 1181,
    "ma": 0,
    "sa": 1605,
    "md": 384,
    "sd": 384,
    "br": 611,
    "pr": 418,
    "wt": ["Protag.", "Federation"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Enemy Shooting power reduced 17-30%"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 1181,
    "ma": 0,
    "sa": 0,
    "md": 1181,
    "sd": 1181,
    "br": 1029,
    "pr": 0,
    "wt": ["Protag.", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Offense Up β"
    },
    "name": "Shield"
  }]
}, {
  "name": "Gundam GP01Fb [Zephyranthes Fb]",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 795,
    "ma": 382,
    "sa": 2377,
    "md": 795,
    "sd": 795,
    "br": 416,
    "pr": 0,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1601,
    "ma": 382,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 609,
    "pr": 0,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Combat Stance γ"
    }
  }, {
    "part": "arms",
    "a": 795,
    "ma": 2377,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Enemy Melee power reduced 30%"
    }
  }, {
    "part": "legs",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 609,
    "pr": 416,
    "wt": ["Protag.", "Federation"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) EX Skill CD reduced 8-20%"
    }
  }, {
    "part": "backpack",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 609,
    "pr": 416,
    "wt": ["Protag.", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Universal Boost Pod"
    }
  }]
}, {
  "name": "Gundam GP02A [Physalis]",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1605,
    "ma": 384,
    "sa": 1181,
    "md": 797,
    "sd": 797,
    "br": 418,
    "pr": 0,
    "wt": ["Zeon", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 2382,
    "ma": 384,
    "sa": 384,
    "md": 797,
    "sd": 797,
    "br": 611,
    "pr": 0,
    "wt": ["Zeon", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "2-11% chance to survive a fatal blow"
    }
  }, {
    "part": "arms",
    "a": 1181,
    "ma": 1181,
    "sa": 384,
    "md": 1181,
    "sd": 1181,
    "br": 213,
    "pr": 0,
    "wt": ["Zeon", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "Physical ranged weapon reload speed boosted 20%"
    }
  }, {
    "part": "legs",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 1181,
    "sd": 1181,
    "br": 213,
    "pr": 611,
    "wt": ["Zeon", "For Base"],
    "ex": {
      "type": "EX Skill",
      "name": "Twist Buster"
    }
  }, {
    "part": "backpack",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 1181,
    "sd": 1181,
    "br": 611,
    "pr": 213,
    "wt": ["Zeon", "For Base"],
    "ex": {
      "type": "Part Traits",
      "name": "With Bazooka category equipped Debuff EX Skill effect up 4-22%"
    }
  }, {
    "part": "range",
    "a": 384,
    "ma": 0,
    "sa": 3997,
    "md": 0,
    "sd": 0,
    "br": 213,
    "pr": 417,
    "wt": ["Zeon", "For Base"],
    "ex": {
      "type": "EX Skill",
      "name": "Atomic Bazooka"
    },
    "name": "Atomic Bazooka",
    "type": "Physical"
  }, {
    "part": "shield",
    "a": 1181,
    "ma": 0,
    "sa": 0,
    "md": 1181,
    "sd": 1181,
    "br": 1029,
    "pr": 0,
    "wt": ["Zeon", "For Base"],
    "ex": {
      "type": "Part Traits",
      "name": "Physical ranged weapon magazine boosted 9-20%"
    },
    "name": "Radiator Shield"
  }]
}, {
  "name": "Gundam GP03 [Stamen]",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1180,
    "ma": 383,
    "sa": 796,
    "md": 1180,
    "sd": 796,
    "br": 212,
    "pr": 417,
    "wt": ["Protag.", "Federation"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) EX Skill piercing boosted 10-28%"
    }
  }, {
    "part": "torso",
    "a": 1976,
    "ma": 796,
    "sa": 383,
    "md": 796,
    "sd": 796,
    "br": 0,
    "pr": 610,
    "wt": ["Protag.", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Mega-Beam Cannon [Dendrobium]"
    }
  }, {
    "part": "arms",
    "a": 796,
    "ma": 2781,
    "sa": 0,
    "md": 1180,
    "sd": 1180,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "Federation"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Strong Melee CRIT rate boosted 10-30%"
    }
  }, {
    "part": "legs",
    "a": 1180,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 796,
    "br": 417,
    "pr": 610,
    "wt": ["Protag.", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Shooting CRIT rate boosted 10-30%"
    }
  }, {
    "part": "backpack",
    "a": 1180,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 796,
    "br": 417,
    "pr": 610,
    "wt": ["Protag.", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Rapid Thrust"
    }
  }, {
    "part": "range",
    "a": 1181,
    "ma": 0,
    "sa": 2378,
    "md": 0,
    "sd": 0,
    "br": 212,
    "pr": 610,
    "wt": ["Protag.", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Dual Cascade"
    },
    "name": "Folding Bazooka",
    "type": "Physical"
  }, {
    "part": "shield",
    "a": 1181,
    "ma": 0,
    "sa": 0,
    "md": 1601,
    "sd": 796,
    "br": 212,
    "pr": 805,
    "wt": ["Protag.", "Federation"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Shooting DMG taken reduced 8-35"
    },
    "name": "Folding Shield"
  }]
}, {
  "name": "Gundam Gusion",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1144,
    "ma": 292,
    "sa": 891,
    "md": 558,
    "sd": 558,
    "br": 0,
    "pr": 302,
    "wt": ["Heavy Armor", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1702,
    "ma": 292,
    "sa": 292,
    "md": 558,
    "sd": 558,
    "br": 0,
    "pr": 430,
    "wt": ["Heavy Armor", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Buster Anchor"
    }
  }, {
    "part": "arms",
    "a": 891,
    "ma": 891,
    "sa": 292,
    "md": 891,
    "sd": 891,
    "br": 0,
    "pr": 127,
    "wt": ["Heavy Armor", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Gemini Satellite"
    }
  }, {
    "part": "legs",
    "a": 891,
    "ma": 292,
    "sa": 292,
    "md": 891,
    "sd": 891,
    "br": 430,
    "pr": 127,
    "wt": ["Heavy Armor", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Hand Grenade"
    }
  }, {
    "part": "backpack",
    "a": 891,
    "ma": 292,
    "sa": 292,
    "md": 891,
    "sd": 891,
    "br": 127,
    "pr": 430,
    "wt": ["Heavy Armor", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Gusion Hammer"
    }
  }, {
    "part": "melee",
    "a": 891,
    "ma": 1144,
    "sa": 0,
    "md": 292,
    "sd": 292,
    "br": 302,
    "pr": 430,
    "wt": ["Heavy Armor", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Spinning Rave"
    },
    "name": "Gusion Hammer",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 891,
    "ma": 0,
    "sa": 1144,
    "md": 292,
    "sd": 292,
    "br": 302,
    "pr": 430,
    "wt": ["Heavy Armor", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "Defender Job Enemy Shooting power reduced 8-25%"
    },
    "name": "Submachine Gun",
    "type": "Physical"
  }]
}, {
  "name": "Gundam Gusion Rebake",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 795,
    "ma": 382,
    "sa": 1179,
    "md": 1179,
    "sd": 1179,
    "br": 416,
    "pr": 0,
    "wt": ["Heavy Armor", "For Desert"],
    "ex": {
      "type": "Part Traits",
      "name": "Physical ranged weapon magazine boosted 9-20%"
    }
  }, {
    "part": "torso",
    "a": 1601,
    "ma": 382,
    "sa": 0,
    "md": 1179,
    "sd": 1179,
    "br": 609,
    "pr": 0,
    "wt": ["Heavy Armor", "For Desert"],
    "ex": {
      "type": "Part Traits",
      "name": "With Axe category equipped Shooting DMG taken reduced 8-35"
    }
  }, {
    "part": "arms",
    "a": 795,
    "ma": 1179,
    "sa": 382,
    "md": 1179,
    "sd": 1179,
    "br": 416,
    "pr": 211,
    "wt": ["Heavy Armor", "For Desert"],
    "ex": {
      "type": "Part Traits",
      "name": "Defender Job Melee DMG taken reduced 8-35"
    }
  }, {
    "part": "legs",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1601,
    "sd": 1601,
    "br": 211,
    "pr": 416,
    "wt": ["Heavy Armor", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Halberd"
    }
  }, {
    "part": "backpack",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1601,
    "sd": 1601,
    "br": 416,
    "pr": 211,
    "wt": ["Heavy Armor", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Four-Arm Combat"
    }
  }, {
    "part": "melee",
    "a": 795,
    "ma": 1601,
    "sa": 0,
    "md": 795,
    "sd": 795,
    "br": 609,
    "pr": 416,
    "wt": ["Heavy Armor.", "For Desert"],
    "ex": {
      "type": "Part Traits",
      "name": "Defender Job Job Gauge increase boosted 6-17%"
    },
    "name": "Halberd",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 795,
    "ma": 0,
    "sa": 1601,
    "md": 795,
    "sd": 795,
    "br": 609,
    "pr": 416,
    "wt": ["Heavy Armor", "For Desert."],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Shooting DMG taken reduced 8-35"
    },
    "name": "120mm Long-Range Rifle",
    "type": "Physical"
  }, {
    "part": "shield",
    "a": 0,
    "ma": 0,
    "sa": 0,
    "md": 1974,
    "sd": 1974,
    "br": 805,
    "pr": 211,
    "wt": ["Heavy Armor", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Halberd Throw"
    },
    "name": "Shield"
  }]
}, {
  "name": "Gundam Heavyarms",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 891,
    "ma": 292,
    "sa": 1702,
    "md": 292,
    "sd": 292,
    "br": 213,
    "pr": 213,
    "wt": ["High Firepower", "For Tundra"],
    "ex": {
      "type": "Part Traits",
      "name": "Beam ranged weapon magazine boosted 9-20%"
    }
  }, {
    "part": "torso",
    "a": 1435,
    "ma": 292,
    "sa": 558,
    "md": 558,
    "sd": 558,
    "br": 213,
    "pr": 213,
    "wt": ["High Firepower", "For Tundra"],
    "ex": {
      "type": "EX Skill",
      "name": "Chest-Mounted Gatling & Machine Cannons"
    }
  }, {
    "part": "arms",
    "a": 891,
    "ma": 558,
    "sa": 558,
    "md": 891,
    "sd": 891,
    "br": 0,
    "pr": 0,
    "wt": ["High Firepower", "For Tundra"],
    "ex": {
      "type": "EX Skill",
      "name": "Aerial Spin"
    }
  }, {
    "part": "legs",
    "a": 891,
    "ma": 292,
    "sa": 292,
    "md": 558,
    "sd": 891,
    "br": 351,
    "pr": 351,
    "wt": ["High Firepower", "For Base"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Long Shot Attack raised 5-14%"
    }
  }, {
    "part": "backpack",
    "a": 891,
    "ma": 292,
    "sa": 292,
    "md": 558,
    "sd": 891,
    "br": 351,
    "pr": 351,
    "wt": ["High Firepower", "For Base"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Gatling Gun"
    }
  }, {
    "part": "range",
    "a": 1702,
    "ma": 0,
    "sa": 2302,
    "md": 558,
    "sd": 1144,
    "br": 624,
    "pr": 624,
    "wt": ["High Firepower", "For Tundra"],
    "ex": {
      "type": "Part Traits",
      "name": "Beam ranged weapon magazine boosted 9-20%"
    },
    "name": "Beam Gatling Gun",
    "type": "Beam",
    "combo": "shield"
  }]
}, {
  "name": "Gundam Kyrios",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 561,
    "ma": 294,
    "sa": 1440,
    "md": 294,
    "sd": 893,
    "br": 215,
    "pr": 215,
    "wt": ["Transformer", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Machine Gun category equipped Enemy shooting power reduced 8-25%"
    }
  }, {
    "part": "torso",
    "a": 893,
    "ma": 561,
    "sa": 294,
    "md": 561,
    "sd": 1147,
    "br": 215,
    "pr": 215,
    "wt": ["Transformer", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 80% or less 5-14% chance to survive a fatal blow"
    }
  }, {
    "part": "arms",
    "a": 561,
    "ma": 2000,
    "sa": 294,
    "md": 561,
    "sd": 893,
    "br": 0,
    "pr": 0,
    "wt": ["Transformer", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) EX Skill DMG output boosted by 6-20"
    }
  }, {
    "part": "legs",
    "a": 561,
    "ma": 294,
    "sa": 294,
    "md": 294,
    "sd": 893,
    "br": 352,
    "pr": 352,
    "wt": ["Transformer", "For Tundra"],
    "ex": {
      "type": "EX Skill",
      "name": "Saber Boomerang"
    }
  }, {
    "part": "backpack",
    "a": 561,
    "ma": 294,
    "sa": 294,
    "md": 294,
    "sd": 893,
    "br": 352,
    "pr": 352,
    "wt": ["Transformer", "For Tundra"],
    "ex": {
      "type": "EX Skill",
      "name": "Trans-Am"
    }
  }, {
    "part": "range",
    "a": 561,
    "ma": 0,
    "sa": 1440,
    "md": 0,
    "sd": 561,
    "br": 215,
    "pr": 215,
    "wt": ["Transformer", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "Beam ranged weapon reload speed boosted 6-15%"
    },
    "name": "GN Beam Submachine Gun",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 561,
    "ma": 0,
    "sa": 0,
    "md": 561,
    "sd": 1440,
    "br": 352,
    "pr": 352,
    "wt": ["Transformer", "For Tundra"],
    "ex": {
      "type": "EX Skill",
      "name": "Claw Mode"
    },
    "name": "GN Shield"
  }]
}, {
  "name": "Gundam Legilis",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1181,
    "ma": 384,
    "sa": 2380,
    "md": 384,
    "sd": 384,
    "br": 213,
    "pr": 417,
    "wt": ["For Space", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Rifle category equipped Projectile Speed boosted 6-15%"
    }
  }, {
    "part": "torso",
    "a": 1977,
    "ma": 384,
    "sa": 796,
    "md": 796,
    "sd": 796,
    "br": 0,
    "pr": 611,
    "wt": ["For Space", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Buster Beam"
    }
  }, {
    "part": "arms",
    "a": 1181,
    "ma": 796,
    "sa": 796,
    "md": 1181,
    "sd": 1181,
    "br": 0,
    "pr": 0,
    "wt": ["For Space", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Vulcan"
    }
  }, {
    "part": "legs",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 796,
    "sd": 1181,
    "br": 417,
    "pr": 611,
    "wt": ["For Space", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Saber category equipped EX Skill CD reduced 6-20%"
    }
  }, {
    "part": "backpack",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 796,
    "sd": 1181,
    "br": 417,
    "pr": 611,
    "wt": ["For Space", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Legilis Cannon"
    }
  }, {
    "part": "range",
    "a": 1181,
    "ma": 0,
    "sa": 3177,
    "md": 0,
    "sd": 0,
    "br": 213,
    "pr": 611,
    "wt": ["For Space", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Initial EX Skill charge boosted 6-20%"
    },
    "name": "Legilis Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 1181,
    "ma": 0,
    "sa": 0,
    "md": 796,
    "sd": 1602,
    "br": 213,
    "pr": 806,
    "wt": ["For Space", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Legilis Bits"
    },
    "name": "Shield"
  }]
}, {
  "name": "Gundam Nadleeh",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 558,
    "ma": 291,
    "sa": 1698,
    "md": 558,
    "sd": 558,
    "br": 0,
    "pr": 302,
    "wt": ["For Space", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job Shooting CRIT rate boosted 8-17%"
    }
  }, {
    "part": "torso",
    "a": 1140,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 428,
    "wt": ["For Space", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Trial System"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 1698,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["For Space", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Melee power boosted 8-25%"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 302,
    "pr": 428,
    "wt": ["For Space", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Shot spread reduced 6-15%"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 302,
    "pr": 428,
    "wt": ["For Space", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Shooting power boosted 8-25%"
    }
  }, {
    "part": "melee",
    "a": 558,
    "ma": 2297,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 126,
    "pr": 428,
    "wt": ["For Space", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Enemy Melee power reduced 8-25%"
    },
    "name": "GN Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 558,
    "ma": 0,
    "sa": 2297,
    "md": 0,
    "sd": 0,
    "br": 126,
    "pr": 428,
    "wt": ["For Space", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job Shooting DMG output boosted 6-20"
    },
    "name": "GN Beam Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 558,
    "ma": 0,
    "sa": 0,
    "md": 1140,
    "sd": 1140,
    "br": 126,
    "pr": 588,
    "wt": ["For Space", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job Debuff EX Skill time up 4-16%"
    },
    "name": "GN Shield"
  }]
}, {
  "name": "Gundam NT-1",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1180,
    "ma": 383,
    "sa": 796,
    "md": 1180,
    "sd": 796,
    "br": 417,
    "pr": 212,
    "wt": ["Close Combat", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1979,
    "ma": 796,
    "sa": 383,
    "md": 796,
    "sd": 796,
    "br": 610,
    "pr": 0,
    "wt": ["Close Combat", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Defense Up β"
    }
  }, {
    "part": "arms",
    "a": 796,
    "ma": 2781,
    "sa": 0,
    "md": 1180,
    "sd": 1180,
    "br": 0,
    "pr": 0,
    "wt": ["Close Combat", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "90mm Gatling Cannon"
    }
  }, {
    "part": "legs",
    "a": 1180,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 796,
    "br": 610,
    "pr": 417,
    "wt": ["Close Combat", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Melee DMG taken reduced by 35"
    }
  }, {
    "part": "backpack",
    "a": 1180,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 796,
    "br": 610,
    "pr": 417,
    "wt": ["Close Combat", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Rapid Thrust"
    }
  }, {
    "part": "range",
    "a": 1180,
    "ma": 0,
    "sa": 2378,
    "md": 0,
    "sd": 0,
    "br": 610,
    "pr": 212,
    "wt": ["Close Combat", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Seventh Tri-Shot"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 1180,
    "ma": 0,
    "sa": 0,
    "md": 1601,
    "sd": 796,
    "br": 805,
    "pr": 212,
    "wt": ["Close Combat", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Defense Up α"
    },
    "name": "Shield"
  }]
}, {
  "name": "Gundam NT-1 [Chobham Armor]",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 891,
    "ma": 292,
    "sa": 891,
    "md": 891,
    "sd": 558,
    "br": 127,
    "pr": 302,
    "wt": ["Heavy Armor", "For Base"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1435,
    "ma": 292,
    "sa": 292,
    "md": 558,
    "sd": 558,
    "br": 0,
    "pr": 430,
    "wt": ["Heavy Armor", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Recovery Tool β"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 891,
    "sa": 292,
    "md": 891,
    "sd": 891,
    "br": 0,
    "pr": 127,
    "wt": ["Heavy Armor", "Federation"],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job Enemy Sp. Shot power reduced 8-25%"
    }
  }, {
    "part": "legs",
    "a": 891,
    "ma": 292,
    "sa": 292,
    "md": 1144,
    "sd": 292,
    "br": 127,
    "pr": 430,
    "wt": ["Heavy Armor", "For Base"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Enemy Melee power reduced 8-25%"
    }
  }, {
    "part": "backpack",
    "a": 891,
    "ma": 292,
    "sa": 292,
    "md": 891,
    "sd": 558,
    "br": 127,
    "pr": 430,
    "wt": ["Heavy Armor", "For Base"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or more 4-13% chance to not recoil"
    }
  }]
}, {
  "name": "Gundam Rose",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 559,
    "ma": 292,
    "sa": 1436,
    "md": 292,
    "sd": 891,
    "br": 303,
    "pr": 127,
    "wt": ["Mobile Fighter", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Long Shot Attack raised 5-14%"
    }
  }, {
    "part": "torso",
    "a": 891,
    "ma": 559,
    "sa": 292,
    "md": 559,
    "sd": 1144,
    "br": 430,
    "pr": 0,
    "wt": ["Mobile Fighter", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Hyper Mode"
    }
  }, {
    "part": "arms",
    "a": 1144,
    "ma": 1994,
    "sa": 292,
    "md": 1144,
    "sd": 2304,
    "br": 592,
    "pr": 127,
    "wt": ["Mobile Fighter", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Rose Bits"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 559,
    "ma": 292,
    "sa": 292,
    "md": 292,
    "sd": 891,
    "br": 430,
    "pr": 303,
    "wt": ["Mobile Fighter", "Long-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Chevalier Saber"
    }
  }, {
    "part": "backpack",
    "a": 559,
    "ma": 292,
    "sa": 292,
    "md": 292,
    "sd": 891,
    "br": 430,
    "pr": 303,
    "wt": ["Mobile Fighter", "Long-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Saber category equipped Buff EX Skill time up 1-15%"
    }
  }, {
    "part": "melee",
    "a": 292,
    "ma": 2594,
    "sa": 0,
    "md": 0,
    "sd": 559,
    "br": 303,
    "pr": 127,
    "wt": ["Mobile Fighter", "Long-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "Job Gauge increase boosted 4-13%"
    },
    "name": "Chevalier Saber",
    "type": "Physical"
  }]
}, {
  "name": "Gundam Throne Drei",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 889,
    "ma": 291,
    "sa": 1701,
    "md": 291,
    "sd": 291,
    "br": 302,
    "pr": 126,
    "wt": ["Support Type", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed Attribute (self), Mid Shot Attack raised 14%"
    }
  }, {
    "part": "torso",
    "a": 1433,
    "ma": 291,
    "sa": 558,
    "md": 558,
    "sd": 558,
    "br": 428,
    "pr": 0,
    "wt": ["Support Type", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "While \"Support Type\", EX Skill DMG Taken reduced 25 (flat)"
    }
  }, {
    "part": "arms",
    "a": 1701,
    "ma": 558,
    "sa": 558,
    "md": 1433,
    "sd": 1992,
    "br": 590,
    "pr": 126,
    "wt": ["Support Type", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "GN Shield Pod"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Support Type", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "Supporter Job, EX Skill CD reduced 15%"
    }
  }, {
    "part": "backpack",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Support Type", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "GN Stealth Field"
    }
  }, {
    "part": "melee",
    "a": 889,
    "ma": 1701,
    "sa": 0,
    "md": 0,
    "sd": 291,
    "br": 302,
    "pr": 126,
    "wt": ["Support Type", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "Supporter Job, Melee DMG Output boosted 20 (flat)"
    },
    "name": "GN Beam Saber (Throne Drei)",
    "type": "Beam"
  }]
}, {
  "name": "Gundam TR-1 [Advanced Hazel w/ Optical Sensor Unit]",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1144,
    "ma": 292,
    "sa": 891,
    "md": 558,
    "sd": 558,
    "br": 302,
    "pr": 0,
    "wt": ["Long-Range", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self), Shot Spread reduced 6-15%"
    }
  }, {
    "part": "torso",
    "a": 1702,
    "ma": 292,
    "sa": 292,
    "md": 558,
    "sd": 558,
    "br": 430,
    "pr": 0,
    "wt": ["Long-Range", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Shoulder Grenade Launcher"
    }
  }, {
    "part": "arms",
    "a": 891,
    "ma": 891,
    "sa": 292,
    "md": 891,
    "sd": 891,
    "br": 127,
    "pr": 0,
    "wt": ["Long-Range", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self), Melee CRIT rate boosted 8-17%"
    }
  }, {
    "part": "legs",
    "a": 891,
    "ma": 292,
    "sa": 292,
    "md": 891,
    "sd": 891,
    "br": 127,
    "pr": 430,
    "wt": ["Long-Range", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Sub-Arm Unit"
    }
  }, {
    "part": "backpack",
    "a": 891,
    "ma": 292,
    "sa": 292,
    "md": 891,
    "sd": 891,
    "br": 430,
    "pr": 127,
    "wt": ["Long-Range", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Shield Booster"
    }
  }, {
    "part": "range",
    "a": 891,
    "ma": 0,
    "sa": 1144,
    "md": 292,
    "sd": 292,
    "br": 430,
    "pr": 302,
    "wt": ["Long-Range", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job, Sp. Shot DMG output boosted 6-20"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 891,
    "ma": 0,
    "sa": 0,
    "md": 891,
    "sd": 891,
    "br": 718,
    "pr": 0,
    "wt": ["Long-Range", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Scattering Beam Cannon"
    },
    "name": "Enhanced Shield Booster"
  }, {
    "part": "shield",
    "a": 891,
    "ma": 0,
    "sa": 0,
    "md": 891,
    "sd": 891,
    "br": 718,
    "pr": 0,
    "wt": ["Long-Range", "Federation"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Buff EX Skill effect up 15%"
    },
    "name": "Shield Booster"
  }]
}, {
  "name": "Gundam Tryon 3",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 797,
    "ma": 384,
    "sa": 2785,
    "md": 384,
    "sd": 384,
    "br": 213,
    "pr": 418,
    "wt": ["Transformer", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "High Mega Cannon"
    }
  }, {
    "part": "torso",
    "a": 1605,
    "ma": 797,
    "sa": 797,
    "md": 797,
    "sd": 797,
    "br": 0,
    "pr": 611,
    "wt": ["Transformer", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Hyper Minovsky Chohouken Tryzan"
    }
  }, {
    "part": "arms",
    "a": 797,
    "ma": 2785,
    "sa": 1181,
    "md": 384,
    "sd": 384,
    "br": 0,
    "pr": 0,
    "wt": ["Transformer", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Armed Booster"
    }
  }, {
    "part": "legs",
    "a": 797,
    "ma": 797,
    "sa": 384,
    "md": 797,
    "sd": 797,
    "br": 611,
    "pr": 418,
    "wt": ["Transformer", "Heavy Armor"],
    "ex": {
      "type": "EX Skill",
      "name": "Raptor Breaker"
    }
  }, {
    "part": "backpack",
    "a": 797,
    "ma": 797,
    "sa": 384,
    "md": 797,
    "sd": 797,
    "br": 418,
    "pr": 611,
    "wt": ["Transformer", "Heavy Armor"],
    "ex": {
      "type": "EX Skill",
      "name": "Double Cannonade"
    }
  }, {
    "part": "melee",
    "a": 384,
    "ma": 3582,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 418,
    "pr": 611,
    "wt": ["Transformer", "Heavy Armor"],
    "ex": {
      "type": "Part Traits",
      "name": "While \"Transformer\", Initial EX Skill charge boosted 20%"
    },
    "name": "Hyper Minovsky Chohouken",
    "type": "Beam"
  }, {
    "part": "melee",
    "a": 384,
    "ma": 3582,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 418,
    "pr": 611,
    "wt": ["Transformer", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self), Strong Melee CRIT rate boosted 30%"
    },
    "name": "Hyper Beam Saber (Tryon 3)",
    "type": "Beam"
  }]
}, {
  "name": "Gundam Virsago",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1181,
    "ma": 384,
    "sa": 2380,
    "md": 384,
    "sd": 384,
    "br": 213,
    "pr": 417,
    "wt": ["Federation", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or less Shooting CRIT rate boosted 10-30%"
    }
  }, {
    "part": "torso",
    "a": 1977,
    "ma": 384,
    "sa": 796,
    "md": 796,
    "sd": 796,
    "br": 0,
    "pr": 611,
    "wt": ["Federation", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Mega Sonic Cannon"
    }
  }, {
    "part": "arms",
    "a": 1181,
    "ma": 796,
    "sa": 796,
    "md": 1181,
    "sd": 1181,
    "br": 0,
    "pr": 0,
    "wt": ["Federation", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Strike Claw"
    }
  }, {
    "part": "legs",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 796,
    "sd": 1181,
    "br": 417,
    "pr": 611,
    "wt": ["Federation", "Transformer"],
    "ex": {
      "type": "EX Skill",
      "name": "Twist Buster"
    }
  }, {
    "part": "backpack",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 796,
    "sd": 1181,
    "br": 417,
    "pr": 611,
    "wt": ["Federation", "Transformer"],
    "ex": {
      "type": "Part Traits",
      "name": "2-20% chance to prevent vernier consumption when stepping"
    }
  }, {
    "part": "melee",
    "a": 1181,
    "ma": 2380,
    "sa": 0,
    "md": 0,
    "sd": 384,
    "br": 213,
    "pr": 417,
    "wt": ["Federation", "Transformer"],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job Melee DMG Output boosted 8-35"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 1181,
    "ma": 0,
    "sa": 3177,
    "md": 0,
    "sd": 0,
    "br": 213,
    "pr": 611,
    "wt": ["Federation", "Transformer"],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job Initial EX Skill charge boosted 6-20%"
    },
    "name": "Strike Shooter",
    "type": "Beam"
  }]
}, {
  "name": "Gundam X",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 384,
    "ma": 384,
    "sa": 3181,
    "md": 384,
    "sd": 1182,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Defense Up γ"
    }
  }, {
    "part": "torso",
    "a": 1606,
    "ma": 384,
    "sa": 384,
    "md": 799,
    "sd": 1606,
    "br": 290,
    "pr": 290,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Shooting power boosted 17-30%"
    }
  }, {
    "part": "arms",
    "a": 1182,
    "ma": 799,
    "sa": 384,
    "md": 384,
    "sd": 1606,
    "br": 290,
    "pr": 290,
    "wt": ["Protag.", "For Forest"],
    "ex": {
      "type": "Part Traits",
      "name": "6-15% chance of attacks penetrating super armor"
    }
  }, {
    "part": "legs",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 799,
    "sd": 1606,
    "br": 420,
    "pr": 420,
    "wt": ["Protag.", "For Forest"],
    "ex": {
      "type": "Part Traits",
      "name": "8-20% chance to not recoil"
    }
  }, {
    "part": "backpack",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 799,
    "sd": 1606,
    "br": 420,
    "pr": 420,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Satellite Cannon"
    }
  }, {
    "part": "melee",
    "a": 1182,
    "ma": 2384,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 477,
    "pr": 477,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Melee DMG taken reduced by 8-35"
    },
    "name": "Large Beam Sword",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 384,
    "ma": 0,
    "sa": 4004,
    "md": 0,
    "sd": 0,
    "br": 290,
    "pr": 290,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Initial EX Skill charge boosted 6-20%"
    },
    "name": "Shield Buster Rifle",
    "type": "Beam"
  }]
}, {
  "name": "Gundam X Divider",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1181,
    "ma": 384,
    "sa": 1181,
    "md": 1181,
    "sd": 797,
    "br": 418,
    "pr": 213,
    "wt": ["Mid-Range", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Offense Up γ"
    }
  }, {
    "part": "torso",
    "a": 1978,
    "ma": 384,
    "sa": 384,
    "md": 797,
    "sd": 797,
    "br": 611,
    "pr": 0,
    "wt": ["Mid-Range", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Blade category equipped Strong Melee Power boosted 17-30%"
    }
  }, {
    "part": "arms",
    "a": 797,
    "ma": 1181,
    "sa": 384,
    "md": 1181,
    "sd": 1181,
    "br": 213,
    "pr": 0,
    "wt": ["Mid-Range", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job Enemy Shooting Power reduced 17-30%"
    }
  }, {
    "part": "legs",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 1605,
    "sd": 384,
    "br": 611,
    "pr": 213,
    "wt": ["Mid-Range", "For Desert"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job EX Skill CD reduced 6-20%"
    }
  }, {
    "part": "backpack",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 1181,
    "sd": 797,
    "br": 611,
    "pr": 213,
    "wt": ["Mid-Range", "For Desert"],
    "ex": {
      "type": "EX Skill",
      "name": "Twist Buster"
    }
  }, {
    "part": "range",
    "a": 1181,
    "ma": 0,
    "sa": 2382,
    "md": 797,
    "sd": 0,
    "br": 611,
    "pr": 213,
    "wt": ["Mid-Range", "For Desert"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job Initial EX Skill Charge boosted 6-20%"
    },
    "name": "Beam Machine Gun",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 1181,
    "ma": 0,
    "sa": 0,
    "md": 1978,
    "sd": 797,
    "br": 809,
    "pr": 213,
    "wt": ["Mid-Range", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Harmonica Cannon"
    },
    "name": "Divider"
  }]
}, {
  "name": "Hi-nu Gundam HWS [Ver. Ka]",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 965,
    "ma": 0,
    "sa": 3309,
    "md": 551,
    "sd": 551,
    "br": 464,
    "pr": 464,
    "wt": ["Ace Excl.", "Heavy Armor"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1732,
    "ma": 551,
    "sa": 551,
    "md": 965,
    "sd": 1732,
    "br": 672,
    "pr": 75,
    "wt": ["Ace Excl.", "Heavy Armor"],
    "ex": {
      "type": "EX Skill",
      "name": "Chest Missile Launcher"
    }
  }, {
    "part": "arms",
    "a": 965,
    "ma": 1355,
    "sa": 551,
    "md": 551,
    "sd": 1732,
    "br": 75,
    "pr": 75,
    "wt": ["Ace Excl.", "Heavy Armor"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Sp. Shot power boosted 30%"
    }
  }, {
    "part": "legs",
    "a": 965,
    "ma": 551,
    "sa": 551,
    "md": 965,
    "sd": 1732,
    "br": 672,
    "pr": 464,
    "wt": ["Ace Excl.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Hidden Arms"
    }
  }, {
    "part": "backpack",
    "a": 965,
    "ma": 551,
    "sa": 551,
    "md": 965,
    "sd": 1732,
    "br": 672,
    "pr": 464,
    "wt": ["Ace Excl.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Fin Funnels"
    }
  }, {
    "part": "range",
    "a": 551,
    "ma": 153,
    "sa": 4105,
    "md": 153,
    "sd": 0,
    "br": 672,
    "pr": 282,
    "wt": ["Ace Excl.", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) EX Skill power boosted 30%"
    },
    "name": "Hyper Mega Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 965,
    "ma": 153,
    "sa": 0,
    "md": 965,
    "sd": 2521,
    "br": 872,
    "pr": 282,
    "wt": ["Ace Excl.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "High-Caliber Mega Particle Cannon"
    },
    "name": "Hi-Mega Shield"
  }]
}, {
  "name": "High Mobility Gelgoog [Johnny Ridden]",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 889,
    "ma": 291,
    "sa": 558,
    "md": 889,
    "sd": 291,
    "br": 302,
    "pr": 126,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Bazooka category equipped EX Skill power boosted 8-25%"
    }
  }, {
    "part": "torso",
    "a": 1142,
    "ma": 291,
    "sa": 291,
    "md": 1142,
    "sd": 558,
    "br": 428,
    "pr": 0,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job Shooting DMG taken reduced by 6-20"
    }
  }, {
    "part": "arms",
    "a": 291,
    "ma": 2300,
    "sa": 291,
    "md": 1142,
    "sd": 291,
    "br": 0,
    "pr": 0,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Melee power boosted 8-25%"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1142,
    "sd": 558,
    "br": 302,
    "pr": 428,
    "wt": ["Ace Excl.", "Zeon"],
    "ex": {
      "type": "EX Skill",
      "name": "Twin Blade Slash"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1142,
    "sd": 558,
    "br": 428,
    "pr": 302,
    "wt": ["Ace Excl.", "Zeon"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 80% or less Vernier recovery rate boosted 4-16%"
    }
  }, {
    "part": "range",
    "a": 889,
    "ma": 0,
    "sa": 1701,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 302,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job Job Gauge increase boosted 4-13%"
    },
    "name": "Rocket Launcher",
    "type": "Physical"
  }, {
    "part": "shield",
    "a": 558,
    "ma": 0,
    "sa": 0,
    "md": 1701,
    "sd": 558,
    "br": 716,
    "pr": 0,
    "wt": ["Ace Excl.", "Zeon"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 50% or more Enemy Shooting power reduced 8-25%"
    },
    "name": "Shield"
  }]
}, {
  "name": "Hyaku Shiki",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 559,
    "ma": 294,
    "sa": 1999,
    "md": 559,
    "sd": 294,
    "br": 0,
    "pr": 129,
    "wt": ["Commander", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 893,
    "ma": 294,
    "sa": 294,
    "md": 1146,
    "sd": 559,
    "br": 0,
    "pr": 432,
    "wt": ["Commander", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Ace Excl. enemy Melee DMG taken reduced by 6-20"
    }
  }, {
    "part": "arms",
    "a": 559,
    "ma": 1438,
    "sa": 294,
    "md": 893,
    "sd": 559,
    "br": 0,
    "pr": 0,
    "wt": ["Commander", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Saber Combo"
    }
  }, {
    "part": "legs",
    "a": 559,
    "ma": 294,
    "sa": 559,
    "md": 893,
    "sd": 294,
    "br": 303,
    "pr": 432,
    "wt": ["Commander", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "With Bazooka category equipped, Shot Spread reduced 15%"
    }
  }, {
    "part": "backpack",
    "a": 559,
    "ma": 294,
    "sa": 559,
    "md": 1146,
    "sd": 294,
    "br": 303,
    "pr": 432,
    "wt": ["Commander", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "With Ace Excl. enemy Shooting power boosted 8-25%"
    }
  }, {
    "part": "melee",
    "a": 559,
    "ma": 1438,
    "sa": 0,
    "md": 559,
    "sd": 0,
    "br": 129,
    "pr": 432,
    "wt": ["Commander", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Royal Heart"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 294,
    "ma": 0,
    "sa": 2598,
    "md": 559,
    "sd": 0,
    "br": 129,
    "pr": 303,
    "wt": ["Commander", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Dual Wave"
    },
    "name": "Clay Bazooka",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 294,
    "ma": 0,
    "sa": 2598,
    "md": 559,
    "sd": 0,
    "br": 129,
    "pr": 303,
    "wt": ["Commander", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Beam EX Skill power boosted 8-25%"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }]
}, {
  "name": "Jagd Doga [Quess Custom]",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 559,
    "ma": 294,
    "sa": 2000,
    "md": 559,
    "sd": 294,
    "br": 53,
    "pr": 53,
    "wt": ["For Space", "Zeon"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or more Mid Shot Attack raised 5-14%"
    }
  }, {
    "part": "torso",
    "a": 893,
    "ma": 294,
    "sa": 294,
    "md": 1147,
    "sd": 559,
    "br": 215,
    "pr": 215,
    "wt": ["For Space", "Zeon"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Strong Melee power boosted 8-20%"
    }
  }, {
    "part": "arms",
    "a": 559,
    "ma": 1440,
    "sa": 294,
    "md": 893,
    "sd": 559,
    "br": 0,
    "pr": 0,
    "wt": ["For Space", "Zeon"],
    "ex": {
      "type": "EX Skill",
      "name": "Funnels"
    }
  }, {
    "part": "legs",
    "a": 559,
    "ma": 294,
    "sa": 559,
    "md": 893,
    "sd": 294,
    "br": 352,
    "pr": 352,
    "wt": ["For Space", "Long-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Saber Combo"
    }
  }, {
    "part": "backpack",
    "a": 559,
    "ma": 294,
    "sa": 559,
    "md": 1147,
    "sd": 294,
    "br": 352,
    "pr": 352,
    "wt": ["For Space", "Long-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Gatling Gun category equipped Mid Shot Attack raised 14%"
    }
  }, {
    "part": "melee",
    "a": 559,
    "ma": 1440,
    "sa": 0,
    "md": 559,
    "sd": 0,
    "br": 303,
    "pr": 303,
    "wt": ["For Space", "Zeon"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Beam Melee DMG output boosted 6-20"
    },
    "name": "Beam Saber with Heat Knife",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 294,
    "ma": 0,
    "sa": 2600,
    "md": 559,
    "sd": 0,
    "br": 215,
    "pr": 215,
    "wt": ["For Space", "Zeon"],
    "ex": {
      "type": "EX Skill",
      "name": "Dual Beam Shredder"
    },
    "name": "Mega Gatling Gun",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 559,
    "ma": 0,
    "sa": 0,
    "md": 1440,
    "sd": 559,
    "br": 352,
    "pr": 352,
    "wt": ["For Space", "Zeon"],
    "ex": {
      "type": "EX Skill",
      "name": "Quadruple-Barrel Mega Particle Cannon"
    },
    "name": "Shield"
  }]
}, {
  "name": "Justice Gundam",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 1356,
    "ma": 553,
    "sa": 966,
    "md": 1356,
    "sd": 553,
    "br": 465,
    "pr": 284,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Sagittus"
    }
  }, {
    "part": "torso",
    "a": 1734,
    "ma": 553,
    "sa": 553,
    "md": 1734,
    "sd": 966,
    "br": 673,
    "pr": 0,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Strong Melee power boosted 30%"
    }
  }, {
    "part": "arms",
    "a": 553,
    "ma": 3312,
    "sa": 553,
    "md": 1734,
    "sd": 553,
    "br": 0,
    "pr": 0,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Bassel Beam Boomerang"
    }
  }, {
    "part": "legs",
    "a": 966,
    "ma": 553,
    "sa": 553,
    "md": 1734,
    "sd": 966,
    "br": 465,
    "pr": 673,
    "wt": ["Ace Excl.", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Double Saber Shear"
    }
  }, {
    "part": "backpack",
    "a": 966,
    "ma": 553,
    "sa": 553,
    "md": 1734,
    "sd": 966,
    "br": 673,
    "pr": 465,
    "wt": ["Ace Excl.", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Fatum-00"
    }
  }, {
    "part": "shield",
    "a": 966,
    "ma": 0,
    "sa": 0,
    "md": 2523,
    "sd": 966,
    "br": 1082,
    "pr": 0,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Shield Bash"
    },
    "name": "Laminated Anti-Beam Shield"
  }]
}, {
  "name": "Kabakali",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 558,
    "ma": 291,
    "sa": 1698,
    "md": 558,
    "sd": 558,
    "br": 302,
    "pr": 0,
    "wt": ["Mid-Range", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique Attribute (self) Enemy Shooting power reduced 8-25%"
    }
  }, {
    "part": "torso",
    "a": 1140,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 0,
    "wt": ["Mid-Range", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Photon Laser Cannon"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 1698,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Mid-Range", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Saber"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Mid-Range", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Whip category equipped Mid Shot Attack raised 5-14%"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Mid-Range", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Ring"
    }
  }, {
    "part": "melee",
    "a": 558,
    "ma": 2297,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 126,
    "wt": ["Mid-Range", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job Strong Melee CRIT rate boosted 8-17%"
    },
    "name": "Beam Ring",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 558,
    "ma": 0,
    "sa": 2297,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 126,
    "wt": ["Mid-Range", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Shotgun"
    },
    "name": "Beam Shotgun",
    "type": "Beam"
  }]
}, {
  "name": "Kampfer",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 291,
    "ma": 291,
    "sa": 2300,
    "md": 291,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["High Firepower", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1142,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 1142,
    "br": 428,
    "pr": 0,
    "wt": ["High Firepower", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Buff EX Skill time up 1-15%"
    }
  }, {
    "part": "arms",
    "a": 889,
    "ma": 558,
    "sa": 291,
    "md": 291,
    "sd": 1142,
    "br": 302,
    "pr": 126,
    "wt": ["High Firepower", "Zeon"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Physical Strong Melee CRIT rate boosted 8-17%"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 1142,
    "br": 302,
    "pr": 428,
    "wt": ["High Firepower", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Leg-Mounted Sturm Faust"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 1142,
    "br": 428,
    "pr": 302,
    "wt": ["High Firepower", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Giant Bazooka"
    }
  }]
}, {
  "name": "Knight Gundam",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 1352,
    "ma": 551,
    "sa": 964,
    "md": 1352,
    "sd": 964,
    "br": 282,
    "pr": 463,
    "wt": ["Gundam Type", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power Attribute (self), EX Skill Power boosted 30%"
    }
  }, {
    "part": "torso",
    "a": 2128,
    "ma": 964,
    "sa": 551,
    "md": 964,
    "sd": 964,
    "br": 0,
    "pr": 669,
    "wt": ["Gundam Type", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "SD Tackle"
    }
  }, {
    "part": "arms",
    "a": 964,
    "ma": 2913,
    "sa": 0,
    "md": 1352,
    "sd": 1352,
    "br": 0,
    "pr": 0,
    "wt": ["Gundam Type", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job, Melee CRIT Rate boosted 30%"
    }
  }, {
    "part": "legs",
    "a": 1352,
    "ma": 551,
    "sa": 551,
    "md": 1352,
    "sd": 964,
    "br": 463,
    "pr": 669,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "While \"Gundam Type\", EX Skill CD reduced 20%"
    }
  }, {
    "part": "backpack",
    "a": 1352,
    "ma": 964,
    "sa": 551,
    "md": 964,
    "sd": 964,
    "br": 463,
    "pr": 669,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Super Electrospear"
    }
  }, {
    "part": "shield",
    "a": 1352,
    "ma": 0,
    "sa": 0,
    "md": 1730,
    "sd": 964,
    "br": 282,
    "pr": 870,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power Attribute (self), Shooting DMG taken reduced 35 (flat)"
    },
    "name": "Knight Shield"
  }, {
    "part": "melee",
    "a": 1352,
    "ma": 3681,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 282,
    "pr": 463,
    "wt": ["Gundam Type", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Comet Sword"
    },
    "name": "Knight Sword",
    "type": "Physical"
  }, {
    "part": "melee",
    "a": 1352,
    "ma": 3681,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 282,
    "pr": 463,
    "wt": ["Gundam Type", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "SD Attack"
    },
    "name": "Electrospear",
    "type": "Physical"
  }]
}, {
  "name": "Kshatriya",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 0,
    "ma": 551,
    "sa": 3307,
    "md": 551,
    "sd": 965,
    "br": 670,
    "pr": 0,
    "wt": ["Zeon", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Beam, Long Shot Attack raised 20%"
    }
  }, {
    "part": "torso",
    "a": 1732,
    "ma": 965,
    "sa": 965,
    "md": 0,
    "sd": 1732,
    "br": 670,
    "pr": 0,
    "wt": ["Zeon", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Chest Mega Particle Cannon & I-Field"
    }
  }, {
    "part": "arms",
    "a": 2302,
    "ma": 965,
    "sa": 965,
    "md": 1506,
    "sd": 4255,
    "br": 1543,
    "pr": 282,
    "wt": ["Zeon", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Funnels"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 965,
    "ma": 551,
    "sa": 965,
    "md": 965,
    "sd": 1353,
    "br": 670,
    "pr": 282,
    "wt": ["Zeon", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "Long-Shooter Job Enemy Melee power reduced 30%"
    }
  }]
}, {
  "name": "Launcher Strike Gundam",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 291,
    "ma": 291,
    "sa": 2300,
    "md": 291,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Long-Range", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Hack β"
    }
  }, {
    "part": "torso",
    "a": 1142,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 1142,
    "br": 0,
    "pr": 428,
    "wt": ["Long-Range", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "Against a large enemy Debuff EX Skill Effect up 1-15%"
    }
  }, {
    "part": "arms",
    "a": 889,
    "ma": 558,
    "sa": 291,
    "md": 291,
    "sd": 1142,
    "br": 126,
    "pr": 302,
    "wt": ["Long-Range", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Combo Weapon Pod"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 1142,
    "br": 428,
    "pr": 302,
    "wt": ["Long-Range", "For Desert"],
    "ex": {
      "type": "Part Traits",
      "name": "Against a large enemy, EX Skill CD reduced 4-15%"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 1142,
    "br": 302,
    "pr": 428,
    "wt": ["Long-Range", "For Desert"],
    "ex": {
      "type": "EX Skill",
      "name": "Agni"
    }
  }]
}, {
  "name": "Marsfour Gundam",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1181,
    "ma": 384,
    "sa": 796,
    "md": 1181,
    "sd": 384,
    "br": 417,
    "pr": 213,
    "wt": ["Close Combat", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1602,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 661,
    "pr": 0,
    "wt": ["Close Combat", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) EX Skill CD reduced 6-20%"
    }
  }, {
    "part": "arms",
    "a": 384,
    "ma": 3177,
    "sa": 384,
    "md": 1602,
    "sd": 384,
    "br": 0,
    "pr": 0,
    "wt": ["Close Combat", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Enemy Melee power reduced 17-30%"
    }
  }, {
    "part": "legs",
    "a": 796,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 417,
    "pr": 611,
    "wt": ["Close Combat", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more EX Skill Piercing boosted 10-28%"
    }
  }, {
    "part": "backpack",
    "a": 796,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 611,
    "pr": 417,
    "wt": ["Close Combat", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "HEAT REV SWORD"
    }
  }, {
    "part": "melee",
    "a": 384,
    "ma": 3997,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 417,
    "pr": 213,
    "wt": ["Close Combat", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Quick Smash"
    },
    "name": "Slash Blade",
    "type": "Physical"
  }, {
    "part": "melee",
    "a": 384,
    "ma": 3997,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 417,
    "pr": 213,
    "wt": ["Close Combat", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) Initial EX Skill charge boosted 6-20%"
    },
    "name": "Heat Rev Sword",
    "type": "Beam"
  }]
}, {
  "name": "Master Gundam",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1181,
    "ma": 384,
    "sa": 796,
    "md": 1181,
    "sd": 384,
    "br": 213,
    "pr": 417,
    "wt": ["Mobile Fighter", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Choukyuu Haou Den'eidan"
    }
  }, {
    "part": "torso",
    "a": 1602,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 0,
    "pr": 611,
    "wt": ["Mobile Fighter", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Hyper Mode"
    }
  }, {
    "part": "arms",
    "a": 384,
    "ma": 3177,
    "sa": 384,
    "md": 1602,
    "sd": 384,
    "br": 0,
    "pr": 0,
    "wt": ["Mobile Fighter", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Sekiha Tenkyouken"
    }
  }, {
    "part": "legs",
    "a": 796,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 611,
    "pr": 417,
    "wt": ["Mobile Fighter", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power Attribute (self), EX Skill Piercing boosted 28%"
    }
  }, {
    "part": "backpack",
    "a": 796,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 417,
    "pr": 611,
    "wt": ["Mobile Fighter", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Juuni Ouhoupai Daishahei"
    }
  }, {
    "part": "melee",
    "a": 384,
    "ma": 3997,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 213,
    "pr": 417,
    "wt": ["Mobile Fighter", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job, Strong Melee CRIT Rate boosted 30%"
    },
    "name": "Master Cloth",
    "type": "Beam"
  }]
}, {
  "name": "Mobile SUMO [Gold Type]",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 558,
    "ma": 292,
    "sa": 1993,
    "md": 292,
    "sd": 292,
    "br": 302,
    "pr": 127,
    "wt": ["Ace Excl.", "Heavy Armor"],
    "ex": {
      "type": "EX Skill",
      "name": "Combat Stance α"
    }
  }, {
    "part": "torso",
    "a": 1114,
    "ma": 558,
    "sa": 558,
    "md": 558,
    "sd": 558,
    "br": 460,
    "pr": 0,
    "wt": ["Ace Excl.", "Heavy Armor"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or less 1-10% chance to survive a fatal blow"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 1993,
    "sa": 891,
    "md": 292,
    "sd": 292,
    "br": 0,
    "pr": 0,
    "wt": ["Ace Excl.", "Heavy Armor"],
    "ex": {
      "type": "EX Skill",
      "name": "IF bunker"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 558,
    "sa": 292,
    "md": 558,
    "sd": 558,
    "br": 302,
    "pr": 430,
    "wt": ["Ace Excl.", "Mid-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Flight Unit"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 558,
    "sa": 292,
    "md": 558,
    "sd": 558,
    "br": 430,
    "pr": 302,
    "wt": ["Ace Excl.", "For Urban Area"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or more EX Skill piercing boosted 22%"
    }
  }, {
    "part": "melee",
    "a": 292,
    "ma": 2593,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 430,
    "pr": 302,
    "wt": ["Ace Excl.", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Storm Edge"
    },
    "name": "Heat Fan",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 292,
    "ma": 0,
    "sa": 2593,
    "md": 0,
    "sd": 0,
    "br": 302,
    "pr": 127,
    "wt": ["Ace Excl.", "Mid-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or more Shooting DMG output boosted by 6-20"
    },
    "name": "Hand Beam Gun",
    "type": "Beam"
  }]
}, {
  "name": "Noble Gundam",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1182,
    "ma": 384,
    "sa": 799,
    "md": 1182,
    "sd": 384,
    "br": 290,
    "pr": 290,
    "wt": ["Mobile Fighter", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1606,
    "ma": 384,
    "sa": 384,
    "md": 1606,
    "sd": 799,
    "br": 290,
    "pr": 290,
    "wt": ["Mobile Fighter", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Berserker System"
    }
  }, {
    "part": "arms",
    "a": 384,
    "ma": 3181,
    "sa": 384,
    "md": 1606,
    "sd": 384,
    "br": 0,
    "pr": 0,
    "wt": ["Mobile Fighter", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Burning Finger"
    }
  }, {
    "part": "legs",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 1606,
    "sd": 799,
    "br": 420,
    "pr": 290,
    "wt": ["Mobile Fighter", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Hoop"
    }
  }, {
    "part": "melee",
    "a": 384,
    "ma": 4004,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 420,
    "pr": 420,
    "wt": ["Mobile Fighter", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Ribbon"
    },
    "name": "Beam Ribbon",
    "type": "Beam"
  }]
}, {
  "name": "Nu Gundam [Ver.Ka]",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 553,
    "ma": 553,
    "sa": 3312,
    "md": 553,
    "sd": 1356,
    "br": 0,
    "pr": 0,
    "wt": ["For Space", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Beam EX Skill power boosted 30%"
    }
  }, {
    "part": "torso",
    "a": 1734,
    "ma": 553,
    "sa": 553,
    "md": 966,
    "sd": 1734,
    "br": 0,
    "pr": 673,
    "wt": ["For Space", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Beam Shooting power boosted 30%"
    }
  }, {
    "part": "arms",
    "a": 1356,
    "ma": 966,
    "sa": 553,
    "md": 553,
    "sd": 1734,
    "br": 284,
    "pr": 465,
    "wt": ["For Space", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Saber Combo"
    }
  }, {
    "part": "legs",
    "a": 966,
    "ma": 553,
    "sa": 553,
    "md": 966,
    "sd": 1734,
    "br": 673,
    "pr": 465,
    "wt": ["For Space", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more EX Skill CD reduced 20%"
    }
  }, {
    "part": "backpack",
    "a": 966,
    "ma": 553,
    "sa": 553,
    "md": 966,
    "sd": 1734,
    "br": 465,
    "pr": 673,
    "wt": ["For Space", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Fin Funnels"
    }
  }, {
    "part": "melee",
    "a": 1356,
    "ma": 2523,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 465,
    "pr": 673,
    "wt": ["For Space", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Strong Melee power boosted 30%"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 553,
    "ma": 0,
    "sa": 4110,
    "md": 0,
    "sd": 0,
    "br": 284,
    "pr": 465,
    "wt": ["For Space", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Enemy Strong Melee power reduced 30%"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 553,
    "ma": 0,
    "sa": 4110,
    "md": 0,
    "sd": 0,
    "br": 284,
    "pr": 465,
    "wt": ["For Space", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "Dual Cascade"
    },
    "name": "New Hyper Bazooka",
    "type": "Physical"
  }, {
    "part": "shield",
    "a": 966,
    "ma": 0,
    "sa": 0,
    "md": 966,
    "sd": 2523,
    "br": 0,
    "pr": 1082,
    "wt": ["For Space", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "With Rifle category equipped Enemy Shooting power reduced 30%"
    },
    "name": "Shield"
  }]
}, {
  "name": "The O",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 1352,
    "ma": 551,
    "sa": 964,
    "md": 1352,
    "sd": 964,
    "br": 463,
    "pr": 282,
    "wt": ["High Mobility", "Commander"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique Attribute (self), Close Shot Attack raised 20%"
    }
  }, {
    "part": "torso",
    "a": 2128,
    "ma": 964,
    "sa": 551,
    "md": 964,
    "sd": 964,
    "br": 669,
    "pr": 0,
    "wt": ["High Mobility", "Commander"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job, EX Skill Piercing boosted 28%"
    }
  }, {
    "part": "arms",
    "a": 964,
    "ma": 2913,
    "sa": 0,
    "md": 1352,
    "sd": 1352,
    "br": 0,
    "pr": 0,
    "wt": ["High Mobility", "Commander"],
    "ex": {
      "type": "Part Traits",
      "name": "While \"High Mobility\", Melee Power boosted 30%"
    }
  }, {
    "part": "legs",
    "a": 1352,
    "ma": 551,
    "sa": 551,
    "md": 1352,
    "sd": 964,
    "br": 669,
    "pr": 463,
    "wt": [
      "High Mobility",
      "Ace Excl."
    ],
    "ex": {
      "type": "EX Skill",
      "name": "Heaven's Judgement"
    }
  }, {
    "part": "backpack",
    "a": 1352,
    "ma": 964,
    "sa": 551,
    "md": 964,
    "sd": 964,
    "br": 669,
    "pr": 463,
    "wt": [
      "High Mobility",
      "Ace Excl."
    ],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Saber Combo"
    }
  }]
}, {
  "name": "Pale Rider",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 800,
    "ma": 385,
    "sa": 1985,
    "md": 385,
    "sd": 1185,
    "br": 292,
    "pr": 292,
    "wt": ["For Urban Area", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "HADES System"
    }
  }, {
    "part": "torso",
    "a": 1185,
    "ma": 800,
    "sa": 385,
    "md": 800,
    "sd": 1610,
    "br": 292,
    "pr": 292,
    "wt": ["For Urban Area", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) EX Skill CD reduced 6-20%"
    }
  }, {
    "part": "arms",
    "a": 800,
    "ma": 2795,
    "sa": 385,
    "md": 800,
    "sd": 1185,
    "br": 0,
    "pr": 0,
    "wt": ["For Urban Area", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Physical Shooting power boosted 8-25%"
    }
  }, {
    "part": "legs",
    "a": 800,
    "ma": 385,
    "sa": 385,
    "md": 385,
    "sd": 1185,
    "br": 479,
    "pr": 479,
    "wt": ["For Urban Area", "GM Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Leg-Mounted Rocket Launcher"
    }
  }, {
    "part": "backpack",
    "a": 800,
    "ma": 385,
    "sa": 385,
    "md": 385,
    "sd": 1185,
    "br": 479,
    "pr": 479,
    "wt": ["For Urban Area", "GM Type"],
    "ex": {
      "type": "EX Skill",
      "name": "180mm Cannon"
    }
  }, {
    "part": "shield",
    "a": 800,
    "ma": 0,
    "sa": 0,
    "md": 800,
    "sd": 1985,
    "br": 479,
    "pr": 479,
    "wt": ["For Urban Area", "GM Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Shock Bringer γ"
    },
    "name": "Shield"
  }]
}, {
  "name": "Penelope",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 965,
    "ma": 0,
    "sa": 3309,
    "md": 551,
    "sd": 551,
    "br": 282,
    "pr": 464,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Rifle category equipped Enemy Shooting power reduced 30%"
    }
  }, {
    "part": "torso",
    "a": 1732,
    "ma": 551,
    "sa": 551,
    "md": 1732,
    "sd": 965,
    "br": 75,
    "pr": 672,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "While Ace Excl. Shooting power boosted 30%"
    }
  }, {
    "part": "arms",
    "a": 965,
    "ma": 1355,
    "sa": 551,
    "md": 1732,
    "sd": 551,
    "br": 75,
    "pr": 75,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Flight Unit Combo"
    }
  }, {
    "part": "legs",
    "a": 965,
    "ma": 551,
    "sa": 551,
    "md": 1732,
    "sd": 965,
    "br": 464,
    "pr": 672,
    "wt": ["Ace Excl.", "Federation"],
    "ex": {
      "type": "EX Skill",
      "name": "Funnel Missiles"
    }
  }, {
    "part": "backpack",
    "a": 965,
    "ma": 551,
    "sa": 551,
    "md": 1732,
    "sd": 965,
    "br": 464,
    "pr": 672,
    "wt": ["Ace Excl.", "Federation"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) EX Skill piercing boosted 28%"
    }
  }]
}, {
  "name": "Providence Gundam",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1181,
    "ma": 384,
    "sa": 2380,
    "md": 384,
    "sd": 384,
    "br": 417,
    "pr": 213,
    "wt": ["Ace Excl.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Picus"
    }
  }, {
    "part": "torso",
    "a": 1977,
    "ma": 384,
    "sa": 796,
    "md": 796,
    "sd": 796,
    "br": 611,
    "pr": 0,
    "wt": ["Ace Excl.", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "Long-Shooter Job Enemy Strong Melee power reduced 30%"
    }
  }, {
    "part": "arms",
    "a": 2380,
    "ma": 796,
    "sa": 796,
    "md": 1977,
    "sd": 2783,
    "br": 806,
    "pr": 213,
    "wt": ["Ace Excl.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Composite Armed Shield System"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 796,
    "sd": 1181,
    "br": 611,
    "pr": 417,
    "wt": ["Ace Excl.", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Long Shot Attack raised 20%"
    }
  }, {
    "part": "backpack",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 796,
    "sd": 1181,
    "br": 611,
    "pr": 417,
    "wt": ["Ace Excl.", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Dragoon System"
    }
  }, {
    "part": "range",
    "a": 1181,
    "ma": 0,
    "sa": 3177,
    "md": 0,
    "sd": 0,
    "br": 611,
    "pr": 213,
    "wt": ["Ace Excl.", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Sp. Shot power boosted 30%"
    },
    "name": "Judicium Beam Rifle",
    "type": "Beam"
  }]
}, {
  "name": "Qubeley",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 968,
    "ma": 553,
    "sa": 2927,
    "md": 968,
    "sd": 553,
    "br": 0,
    "pr": 284,
    "wt": ["Commander", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Recovery Tool γ"
    }
  }, {
    "part": "torso",
    "a": 1358,
    "ma": 553,
    "sa": 553,
    "md": 1737,
    "sd": 968,
    "br": 0,
    "pr": 675,
    "wt": ["Commander", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job Buff EX Skill effect up 22%"
    }
  }, {
    "part": "arms",
    "a": 968,
    "ma": 2138,
    "sa": 553,
    "md": 1358,
    "sd": 968,
    "br": 0,
    "pr": 0,
    "wt": ["Commander", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Gun"
    }
  }, {
    "part": "legs",
    "a": 968,
    "ma": 553,
    "sa": 968,
    "md": 1358,
    "sd": 553,
    "br": 467,
    "pr": 675,
    "wt": ["Commander", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job Mid Shot Attack raised 20%"
    }
  }, {
    "part": "backpack",
    "a": 969,
    "ma": 553,
    "sa": 553,
    "md": 1737,
    "sd": 553,
    "br": 467,
    "pr": 675,
    "wt": ["Commander", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Funnels"
    }
  }]
}, {
  "name": "Rebawoo",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 889,
    "ma": 291,
    "sa": 558,
    "md": 889,
    "sd": 291,
    "br": 126,
    "pr": 302,
    "wt": ["Zeon", "Commander"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self), Projectile speed boosted 14%"
    }
  }, {
    "part": "torso",
    "a": 1142,
    "ma": 291,
    "sa": 291,
    "md": 1142,
    "sd": 558,
    "br": 0,
    "pr": 428,
    "wt": ["Zeon", "Commander"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Vulcan"
    }
  }, {
    "part": "arms",
    "a": 291,
    "ma": 2300,
    "sa": 291,
    "md": 1142,
    "sd": 291,
    "br": 0,
    "pr": 0,
    "wt": ["Zeon", "Commander"],
    "ex": {
      "type": "EX Skill",
      "name": "Arm-Mounted Grenade Launcher"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1142,
    "sd": 558,
    "br": 428,
    "pr": 302,
    "wt": ["Zeon", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Flexible Beam Gun"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1142,
    "sd": 558,
    "br": 302,
    "pr": 428,
    "wt": ["Zeon", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "While \"Zeon\", Melee power boosted 25%"
    }
  }, {
    "part": "range",
    "a": 889,
    "ma": 0,
    "sa": 1701,
    "md": 0,
    "sd": 0,
    "br": 302,
    "pr": 428,
    "wt": ["Zeon", "Commander"],
    "ex": {
      "type": "Part Traits",
      "name": "While \"Commander\", Initial EX Skill charge boosted 12%"
    },
    "name": "Beam Rifle (Rebawoo)",
    "type": "Beam"
  }]
}, {
  "name": "Rising Gundam",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 889,
    "ma": 291,
    "sa": 558,
    "md": 889,
    "sd": 291,
    "br": 126,
    "pr": 302,
    "wt": ["Mobile Fighter", "Long-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1142,
    "ma": 291,
    "sa": 291,
    "md": 1142,
    "sd": 558,
    "br": 0,
    "pr": 428,
    "wt": ["Mobile Fighter", "Long-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "Strong Melee Power boosted 20%"
    }
  }, {
    "part": "arms",
    "a": 291,
    "ma": 2300,
    "sa": 291,
    "md": 1142,
    "sd": 291,
    "br": 0,
    "pr": 0,
    "wt": ["Mobile Fighter", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Rising Arrow"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1142,
    "sd": 558,
    "br": 428,
    "pr": 302,
    "wt": ["Mobile Fighter", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "Shooting CRIT Rate boosted 17%"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1142,
    "sd": 558,
    "br": 302,
    "pr": 428,
    "wt": ["Mobile Fighter", "Long-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Defense Hack α"
    }
  }]
}, {
  "name": "Rozen Zulu",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 889,
    "ma": 291,
    "sa": 558,
    "md": 889,
    "sd": 558,
    "br": 302,
    "pr": 126,
    "wt": ["Zeon", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job Mid Shot Attack raised 5-14%"
    }
  }, {
    "part": "torso",
    "a": 1433,
    "ma": 558,
    "sa": 291,
    "md": 558,
    "sd": 558,
    "br": 428,
    "pr": 0,
    "wt": ["Zeon", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Sp. Shot DMG taken reduced 6-20"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 1991,
    "sa": 0,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Zeon", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "Mega Particle Cannon (Incom)"
    }
  }, {
    "part": "legs",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 558,
    "br": 428,
    "pr": 302,
    "wt": ["Zeon", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or less Shooting CRIT rate boosted 8-17%"
    }
  }, {
    "part": "backpack",
    "a": 889,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 558,
    "br": 428,
    "pr": 302,
    "wt": ["Zeon", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Psyco Jammer"
    }
  }, {
    "part": "shield",
    "a": 889,
    "ma": 0,
    "sa": 0,
    "md": 1142,
    "sd": 558,
    "br": 590,
    "pr": 126,
    "wt": ["Zeon", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Triple-Barrel Mega Particle Cannon"
    },
    "name": "Shield"
  }]
}, {
  "name": "Sanakapool",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "torso",
    "a": 2778,
    "ma": 795,
    "sa": 1179,
    "md": 2778,
    "sd": 1974,
    "br": 211,
    "pr": 1025,
    "wt": ["Amphib.", "Support Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) EX Skill piercing boosted 28%"
    },
    "combo": "head"
  }, {
    "part": "arms",
    "a": 382,
    "ma": 3173,
    "sa": 382,
    "md": 1601,
    "sd": 382,
    "br": 0,
    "pr": 0,
    "wt": ["Amphib.", "Support Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Sana's Signature Rabbit Spike"
    }
  }, {
    "part": "legs",
    "a": 795,
    "ma": 382,
    "sa": 382,
    "md": 1601,
    "sd": 795,
    "br": 609,
    "pr": 416,
    "wt": ["Amphib.", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Belly Beam!"
    }
  }]
}, {
  "name": "Sazabi",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 1356,
    "ma": 553,
    "sa": 966,
    "md": 1356,
    "sd": 553,
    "br": 284,
    "pr": 465,
    "wt": ["High Firepower", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job, Enemy Shooting Power reduced 30%"
    }
  }, {
    "part": "torso",
    "a": 1734,
    "ma": 553,
    "sa": 553,
    "md": 1734,
    "sd": 966,
    "br": 0,
    "pr": 673,
    "wt": ["High Firepower", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Mega Particle Scatter Cannon"
    }
  }, {
    "part": "arms",
    "a": 553,
    "ma": 3312,
    "sa": 553,
    "md": 1734,
    "sd": 553,
    "br": 0,
    "pr": 0,
    "wt": ["High Firepower", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor < 70%, Melee Power boosted 30%"
    }
  }, {
    "part": "legs",
    "a": 966,
    "ma": 553,
    "sa": 553,
    "md": 1734,
    "sd": 966,
    "br": 673,
    "pr": 465,
    "wt": ["High Firepower", "Zeon"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique Attribute (self), EX Skill CD reduced 20%"
    }
  }, {
    "part": "backpack",
    "a": 966,
    "ma": 553,
    "sa": 553,
    "md": 1734,
    "sd": 966,
    "br": 465,
    "pr": 673,
    "wt": ["High Firepower", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "Funnel Combination"
    }
  }, {
    "part": "shield",
    "a": 966,
    "ma": 0,
    "sa": 0,
    "md": 2523,
    "sd": 966,
    "br": 0,
    "pr": 1082,
    "wt": ["High Firepower", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "Smal Missiles"
    },
    "name": "Shield"
  }, {
    "part": "melee",
    "a": 553,
    "ma": 4110,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 284,
    "pr": 465,
    "wt": ["High Firepower", "Zeon"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique Attribute (self), EX Skill Power boosted 30%"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "melee",
    "a": 553,
    "ma": 4110,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 284,
    "pr": 465,
    "wt": ["High Firepower", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Piercing Axe"
    },
    "name": "Beam Tomahawk",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 1356,
    "ma": 0,
    "sa": 3312,
    "md": 0,
    "sd": 0,
    "br": 465,
    "pr": 673,
    "wt": ["High Firepower", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique Attribute (self), Sp. Shot CRIT Rate boosted 30%"
    },
    "name": "Beam Shot Rifle",
    "type": "Beam"
  }]
}, {
  "name": "Sengoku Astray Gundam",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1180,
    "ma": 383,
    "sa": 796,
    "md": 1180,
    "sd": 796,
    "br": 417,
    "pr": 212,
    "wt": ["Heavy Armor", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job EX Skill piercing boosted 10-28%"
    }
  }, {
    "part": "torso",
    "a": 1976,
    "ma": 796,
    "sa": 383,
    "md": 796,
    "sd": 796,
    "br": 610,
    "pr": 0,
    "wt": ["Heavy Armor", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job EX Skill CD reduced 6-20%"
    }
  }, {
    "part": "arms",
    "a": 796,
    "ma": 2781,
    "sa": 0,
    "md": 1180,
    "sd": 1180,
    "br": 0,
    "pr": 0,
    "wt": ["Heavy Armor", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Hidden Arm & Samurai Sword"
    }
  }, {
    "part": "legs",
    "a": 1180,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 796,
    "br": 610,
    "pr": 417,
    "wt": ["Heavy Armor", "For Forest"],
    "ex": {
      "type": "Part Traits",
      "name": "With Module category equipped EX Skill piercing boosted 10-28%"
    }
  }, {
    "part": "backpack",
    "a": 1180,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 796,
    "br": 610,
    "pr": 417,
    "wt": ["Heavy Armor", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Particle Fa Jin"
    }
  }, {
    "part": "shield",
    "a": 1180,
    "ma": 0,
    "sa": 0,
    "md": 1601,
    "sd": 796,
    "br": 805,
    "pr": 212,
    "wt": ["Heavy Armor", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job Enemy Strong Melee power reduced 17-30%"
    },
    "name": "Oni No Tate"
  }]
}, {
  "name": "Shenlong Gundam",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1605,
    "ma": 384,
    "sa": 1181,
    "md": 797,
    "sd": 797,
    "br": 418,
    "pr": 0,
    "wt": ["Close Combat", "For Forest"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 2382,
    "ma": 384,
    "sa": 384,
    "md": 797,
    "sd": 797,
    "br": 611,
    "pr": 0,
    "wt": ["Close Combat", "For Forest"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Strong Melee power boosted 17-30%"
    }
  }, {
    "part": "arms",
    "a": 1181,
    "ma": 1181,
    "sa": 384,
    "md": 1181,
    "sd": 1181,
    "br": 213,
    "pr": 0,
    "wt": ["Close Combat", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Dragon Fang"
    }
  }, {
    "part": "legs",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 1181,
    "sd": 1181,
    "br": 213,
    "pr": 611,
    "wt": ["Close Combat", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) 8-20% chance to not recoil"
    }
  }, {
    "part": "backpack",
    "a": 1181,
    "ma": 384,
    "sa": 384,
    "md": 1181,
    "sd": 1181,
    "br": 611,
    "pr": 213,
    "wt": ["Close Combat", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Armed Aura γ"
    }
  }, {
    "part": "melee",
    "a": 1181,
    "ma": 1605,
    "sa": 0,
    "md": 384,
    "sd": 384,
    "br": 611,
    "pr": 418,
    "wt": ["Close Combat", "For Forest"],
    "ex": {
      "type": "EX Skill",
      "name": "Hell Jumper"
    },
    "name": "Beam Glaive",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 1181,
    "ma": 0,
    "sa": 0,
    "md": 1181,
    "sd": 1181,
    "br": 1029,
    "pr": 0,
    "wt": ["Close Combat", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Shield Throw"
    },
    "name": "Shenlong Shield"
  }]
}, {
  "name": "Shining Gundam",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1180,
    "ma": 383,
    "sa": 796,
    "md": 1180,
    "sd": 796,
    "br": 212,
    "pr": 417,
    "wt": ["Mobile Fighter", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job Projectile speed boosted 6-15%"
    }
  }, {
    "part": "torso",
    "a": 1976,
    "ma": 796,
    "sa": 383,
    "md": 796,
    "sd": 796,
    "br": 0,
    "pr": 610,
    "wt": ["Mobile Fighter", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Super Mode"
    }
  }, {
    "part": "arms",
    "a": 796,
    "ma": 2781,
    "sa": 0,
    "md": 1180,
    "sd": 1180,
    "br": 0,
    "pr": 0,
    "wt": ["Mobile Fighter", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Shining Finger Sword"
    }
  }, {
    "part": "legs",
    "a": 1180,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 796,
    "br": 417,
    "pr": 610,
    "wt": ["Mobile Fighter", "For Urban Area"],
    "ex": {
      "type": "EX Skill",
      "name": "Rapid Thrust"
    }
  }, {
    "part": "backpack",
    "a": 1180,
    "ma": 383,
    "sa": 383,
    "md": 1180,
    "sd": 796,
    "br": 417,
    "pr": 610,
    "wt": ["Mobile Fighter", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job 8-20% chance to not recoil"
    }
  }]
}, {
  "name": "Stargazer Gundam",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 558,
    "ma": 291,
    "sa": 889,
    "md": 889,
    "sd": 889,
    "br": 302,
    "pr": 0,
    "wt": ["For Space", "Support Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Shot guidance boosted 5-14%"
    }
  }, {
    "part": "torso",
    "a": 1140,
    "ma": 291,
    "sa": 0,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 0,
    "wt": ["For Space", "Support Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Enemy Strong Melee power reduced 17-30%"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 889,
    "sa": 291,
    "md": 2297,
    "sd": 2297,
    "br": 874,
    "pr": 302,
    "wt": ["For Space", "Support Type"],
    "ex": {
      "type": "Part Traits",
      "name": "Beam ranged weapon reload speed boosted 6-15%"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1140,
    "sd": 1140,
    "br": 126,
    "pr": 302,
    "wt": ["For Space", "Protag."],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) EX Skill DMG taken reduced 8-25"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1140,
    "sd": 1140,
    "br": 302,
    "pr": 126,
    "wt": ["For Space", "Protag."],
    "ex": {
      "type": "EX Skill",
      "name": "Voiture Lumiere"
    }
  }]
}, {
  "name": "Strike Noir",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 291,
    "ma": 291,
    "sa": 2300,
    "md": 291,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Gundam Type", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1142,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 1142,
    "br": 428,
    "pr": 0,
    "wt": ["Gundam Type", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "With Dual Sabers category equipped EX Skill DMG output boosted by 6-20"
    }
  }, {
    "part": "arms",
    "a": 889,
    "ma": 558,
    "sa": 291,
    "md": 291,
    "sd": 1142,
    "br": 302,
    "pr": 126,
    "wt": ["Gundam Type", "For Tundra"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Melee CRIT rate boosted 8-17%"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 1142,
    "br": 302,
    "pr": 428,
    "wt": ["Gundam Type", "For Tundra"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Rifle Shorty"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 558,
    "sd": 1142,
    "br": 428,
    "pr": 302,
    "wt": ["Gundam Type", "For Tundra"],
    "ex": {
      "type": "EX Skill",
      "name": "Dual Linear Guns"
    }
  }, {
    "part": "melee",
    "a": 889,
    "ma": 1701,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 302,
    "wt": ["Gundam Type", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "3-12% chance of attacks penetrating super armor"
    },
    "name": "Fragarach 3-Beam Blade",
    "type": "Beam"
  }]
}, {
  "name": "Strike Rouge [IWSP]",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 558,
    "ma": 291,
    "sa": 1692,
    "md": 558,
    "sd": 558,
    "br": 302,
    "pr": 0,
    "wt": ["Commander", "For Base"],
    "ex": {
      "type": "EX Skill",
      "name": "Igelstellung"
    }
  }, {
    "part": "torso",
    "a": 1140,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 0,
    "wt": ["Commander", "For Base"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Enemy EX Skill penetration reduced 8-22%"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 1698,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Commander", "For Base"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or more Melee CRIT rate boosted 8-17%"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Commander", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Rapid Thrust"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 428,
    "pr": 302,
    "wt": ["Commander", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Railgun & Single-Mounted Cannon"
    }
  }, {
    "part": "melee",
    "a": 558,
    "ma": 2297,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 428,
    "pr": 126,
    "wt": ["Commander", "For Base"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (Self) Melee DMG output boosted 6-20"
    },
    "name": "9.1m Experimental Anti-Ship Sword",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 1140,
    "ma": 0,
    "sa": 2297,
    "md": 1140,
    "sd": 1140,
    "br": 1016,
    "pr": 302,
    "wt": ["Commander", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Dual Shredder"
    },
    "name": "Combined Shield",
    "type": "Physical",
    "combo": "shield"
  }, {
    "part": "shield",
    "a": 558,
    "ma": 0,
    "sa": 0,
    "md": 1140,
    "sd": 1140,
    "br": 558,
    "pr": 126,
    "wt": ["Commander", "For Base"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job Shooting DMG taken reduced by 6-20"
    },
    "name": "Anti-Beam Shield"
  }]
}, {
  "name": "Susanowo",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 889,
    "ma": 291,
    "sa": 558,
    "md": 889,
    "sd": 291,
    "br": 126,
    "pr": 302,
    "wt": ["Close Combat", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Chakram"
    }
  }, {
    "part": "torso",
    "a": 1142,
    "ma": 291,
    "sa": 291,
    "md": 1142,
    "sd": 558,
    "br": 0,
    "pr": 428,
    "wt": ["Close Combat", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "GN Vulcan"
    }
  }, {
    "part": "arms",
    "a": 291,
    "ma": 2300,
    "sa": 291,
    "md": 1142,
    "sd": 291,
    "br": 0,
    "pr": 0,
    "wt": ["Close Combat", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "With Dual Sabers Category equipped, Melee Power boosted 25%"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1142,
    "sd": 558,
    "br": 428,
    "pr": 302,
    "wt": ["Close Combat", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Trans-Am Raid"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 1142,
    "sd": 558,
    "br": 302,
    "pr": 428,
    "wt": ["Close Combat", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "15% chance to prevent vernier consumption when stepping"
    }
  }, {
    "part": "melee",
    "a": 291,
    "ma": 2867,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 126,
    "pr": 302,
    "wt": ["Close Combat", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job, Initial EX Skill Charge boosted 12%"
    },
    "name": "Shiranui/Unryu",
    "type": "Physical"
  }]
}, {
  "name": "Sword Strike Gundam",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 558,
    "ma": 292,
    "sa": 1993,
    "md": 292,
    "sd": 292,
    "br": 302,
    "pr": 127,
    "wt": ["High Firepower", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Protection Hack β"
    }
  }, {
    "part": "torso",
    "a": 1144,
    "ma": 558,
    "sa": 558,
    "md": 558,
    "sd": 558,
    "br": 430,
    "pr": 0,
    "wt": ["High Firepower", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "Against a large enemy Enemy Strong Melee power reduced 8-25%"
    }
  }, {
    "part": "arms",
    "a": 1144,
    "ma": 2593,
    "sa": 1144,
    "md": 891,
    "sd": 891,
    "br": 718,
    "pr": 0,
    "wt": ["High Firepower", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Block Stance γ"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 558,
    "ma": 558,
    "sa": 292,
    "md": 558,
    "sd": 558,
    "br": 302,
    "pr": 430,
    "wt": ["High Firepower", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "Against a large enemy Melee CRIT rate boosted 8-17%"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 558,
    "sa": 292,
    "md": 558,
    "sd": 558,
    "br": 430,
    "pr": 302,
    "wt": ["High Firepower", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Schwert Gewehr"
    }
  }, {
    "part": "melee",
    "a": 292,
    "ma": 2593,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 430,
    "pr": 302,
    "wt": ["High Firepower", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Maelstrom"
    },
    "name": "Schwert Gewehr",
    "type": "Beam"
  }]
}, {
  "name": "Tallgeese [Endless Waltz Ver.]",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 799,
    "ma": 384,
    "sa": 2789,
    "md": 384,
    "sd": 384,
    "br": 213,
    "pr": 213,
    "wt": ["High Mobility", "Long-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more EX Skill DMG output boosted 8-35"
    }
  }, {
    "part": "torso",
    "a": 1606,
    "ma": 799,
    "sa": 799,
    "md": 799,
    "sd": 799,
    "br": 290,
    "pr": 290,
    "wt": ["High Mobility", "Long-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job EX Skill DMG Taken reduced 8-35"
    }
  }, {
    "part": "arms",
    "a": 1606,
    "ma": 3587,
    "sa": 1606,
    "md": 1182,
    "sd": 1182,
    "br": 477,
    "pr": 477,
    "wt": ["High Mobility", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Dober Gun"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 799,
    "ma": 799,
    "sa": 384,
    "md": 799,
    "sd": 799,
    "br": 477,
    "pr": 477,
    "wt": ["High Mobility", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "In-Fighter Job EX Skill DMG taken reduced 8-35"
    }
  }, {
    "part": "backpack",
    "a": 799,
    "ma": 799,
    "sa": 384,
    "md": 799,
    "sd": 799,
    "br": 477,
    "pr": 477,
    "wt": ["High Mobility", "Close Combat"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Buff EX Skill time up 4-22%"
    }
  }, {
    "part": "range",
    "a": 384,
    "ma": 0,
    "sa": 3587,
    "md": 0,
    "sd": 0,
    "br": 420,
    "pr": 420,
    "wt": ["High Mobility", "Long-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "Beam ranged weapon magazine boosted 9-20%"
    },
    "name": "Dober Gun",
    "type": "Beam"
  }]
}, {
  "name": "Tallgeese II",
  "attribute": "Technique",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 558,
    "ma": 291,
    "sa": 1700,
    "md": 558,
    "sd": 558,
    "br": 126,
    "pr": 126,
    "wt": ["Commander", "Long-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Offense Up α"
    }
  }, {
    "part": "torso",
    "a": 1142,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 213,
    "pr": 213,
    "wt": ["Commander", "Long-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With For Space enemy EX Skill piercing boosted 8-22%"
    }
  }, {
    "part": "arms",
    "a": 1142,
    "ma": 1700,
    "sa": 291,
    "md": 1991,
    "sd": 1991,
    "br": 302,
    "pr": 302,
    "wt": ["Commander", "Long-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Dober Gun"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 349,
    "pr": 375,
    "wt": ["Commander", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With For Space enemy, Mid Shot Attack raised 14%"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 375,
    "pr": 349,
    "wt": ["Commander", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With For Space enemy Shooting power boosted 25%"
    }
  }]
}, {
  "name": "Tieren Taozi",
  "attribute": "Power",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1144,
    "ma": 292,
    "sa": 891,
    "md": 558,
    "sd": 558,
    "br": 302,
    "pr": 0,
    "wt": ["For Space", "Heavy Armor"],
    "ex": {
      "type": "Part Traits",
      "name": "While \"For Space\", Mid Shot Attack raised 14%"
    }
  }, {
    "part": "torso",
    "a": 1702,
    "ma": 292,
    "sa": 292,
    "md": 558,
    "sd": 558,
    "br": 430,
    "pr": 0,
    "wt": ["For Space", "Heavy Armor"],
    "ex": {
      "type": "EX Skill",
      "name": "30mm Machine Gun"
    }
  }, {
    "part": "arms",
    "a": 891,
    "ma": 891,
    "sa": 292,
    "md": 891,
    "sd": 891,
    "br": 127,
    "pr": 0,
    "wt": ["For Space", "Heavy Armor"],
    "ex": {
      "type": "EX Skill",
      "name": "200mm x 25 Smoothbore Gun"
    }
  }, {
    "part": "legs",
    "a": 891,
    "ma": 292,
    "sa": 292,
    "md": 891,
    "sd": 891,
    "br": 127,
    "pr": 430,
    "wt": ["For Space", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "Middle-Shooter Job, Shot spread reduced 15%"
    }
  }, {
    "part": "backpack",
    "a": 891,
    "ma": 292,
    "sa": 292,
    "md": 891,
    "sd": 891,
    "br": 430,
    "pr": 127,
    "wt": ["For Space", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self), Vernier recovery rate boosted 16%"
    }
  }, {
    "part": "range",
    "a": 891,
    "ma": 0,
    "sa": 1144,
    "md": 292,
    "sd": 292,
    "br": 430,
    "pr": 302,
    "wt": ["For Space", "Ace Excl."],
    "ex": {
      "type": "Part Traits",
      "name": "Physical ranged weapon reload speed boosted 15%"
    },
    "name": "200mm x 25 Smoothbore Gun",
    "type": "Physical"
  }]
}, {
  "name": "Turn A Gundam",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 969,
    "ma": 553,
    "sa": 2138,
    "md": 553,
    "sd": 1359,
    "br": 384,
    "pr": 384,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Close Shot Attack raised 20%"
    }
  }, {
    "part": "torso",
    "a": 1359,
    "ma": 969,
    "sa": 553,
    "md": 969,
    "sd": 1738,
    "br": 384,
    "pr": 384,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Moonbeam Butterfly"
    }
  }, {
    "part": "arms",
    "a": 969,
    "ma": 2929,
    "sa": 553,
    "md": 969,
    "sd": 1359,
    "br": 0,
    "pr": 0,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Flip Jump Saber"
    }
  }, {
    "part": "legs",
    "a": 969,
    "ma": 553,
    "sa": 553,
    "md": 553,
    "sd": 1359,
    "br": 558,
    "pr": 558,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "With Rifle category equipped Enemy Melee power reduced 30%"
    }
  }, {
    "part": "melee",
    "a": 553,
    "ma": 3698,
    "sa": 0,
    "md": 0,
    "sd": 969,
    "br": 384,
    "pr": 384,
    "wt": ["Protag.", "For Forest"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job Strong Melee CRIT rate boosted 30%"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "melee",
    "a": 553,
    "ma": 3698,
    "sa": 0,
    "md": 0,
    "sd": 969,
    "br": 384,
    "pr": 384,
    "wt": ["Protag.", "For Forest"],
    "ex": {
      "type": "EX Skill",
      "name": "Flexible Smash"
    },
    "name": "Gundam Hammer",
    "type": "Physical"
  }, {
    "part": "range",
    "a": 969,
    "ma": 0,
    "sa": 2138,
    "md": 0,
    "sd": 969,
    "br": 384,
    "pr": 384,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "Out-Fighter Job EX Skill power boosted 30%"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 969,
    "ma": 0,
    "sa": 0,
    "md": 969,
    "sd": 2138,
    "br": 558,
    "pr": 558,
    "wt": ["Protag.", "For Forest"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Buff EX Skill effect up 22%"
    },
    "name": "Shield"
  }]
}, {
  "name": "Turn X",
  "attribute": "Power",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 965,
    "ma": 553,
    "sa": 2922,
    "md": 553,
    "sd": 553,
    "br": 284,
    "pr": 464,
    "wt": ["Close Combat", "Transformer"],
    "ex": {
      "type": "Part Traits",
      "name": "With Power attribute (self) EX Skill Power boosted 30%"
    }
  }, {
    "part": "torso",
    "a": 1734,
    "ma": 965,
    "sa": 965,
    "md": 965,
    "sd": 965,
    "br": 0,
    "pr": 673,
    "wt": ["Close Combat", "Transformer"],
    "ex": {
      "type": "EX Skill",
      "name": "Moonbeam Butterfly"
    }
  }, {
    "part": "arms",
    "a": 965,
    "ma": 2922,
    "sa": 1356,
    "md": 553,
    "sd": 553,
    "br": 0,
    "pr": 0,
    "wt": ["Close Combat", "Transformer"],
    "ex": {
      "type": "EX Skill",
      "name": "Fusion Destruction Manipulator"
    }
  }, {
    "part": "legs",
    "a": 965,
    "ma": 965,
    "sa": 553,
    "md": 965,
    "sd": 965,
    "br": 673,
    "pr": 464,
    "wt": ["Close Combat", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or more Melee CRIT rate boosted 30%"
    }
  }, {
    "part": "backpack",
    "a": 965,
    "ma": 965,
    "sa": 553,
    "md": 965,
    "sd": 965,
    "br": 464,
    "pr": 673,
    "wt": ["Close Combat", "High Mobility"],
    "ex": {
      "type": "EX Skill",
      "name": "Carapace"
    }
  }]
}, {
  "name": "Unicorn Gundam",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 965,
    "ma": 553,
    "sa": 2922,
    "md": 553,
    "sd": 553,
    "br": 284,
    "pr": 464,
    "wt": ["For Space", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1734,
    "ma": 965,
    "sa": 965,
    "md": 965,
    "sd": 965,
    "br": 0,
    "pr": 673,
    "wt": ["For Space", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "NT-D"
    }
  }, {
    "part": "arms",
    "a": 965,
    "ma": 2922,
    "sa": 1356,
    "md": 553,
    "sd": 553,
    "br": 0,
    "pr": 0,
    "wt": ["For Space", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Tonfa"
    }
  }, {
    "part": "legs",
    "a": 965,
    "ma": 965,
    "sa": 553,
    "md": 965,
    "sd": 965,
    "br": 673,
    "pr": 464,
    "wt": ["For Space", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Sp. Shot power boosted 30%"
    }
  }, {
    "part": "backpack",
    "a": 965,
    "ma": 965,
    "sa": 553,
    "md": 965,
    "sd": 965,
    "br": 464,
    "pr": 673,
    "wt": ["For Space", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Double Saber Rush"
    }
  }, {
    "part": "melee",
    "a": 553,
    "ma": 3690,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 464,
    "pr": 673,
    "wt": ["For Space", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Initial EX Skill charge boosted 20%"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 553,
    "ma": 154,
    "sa": 3690,
    "md": 0,
    "sd": 0,
    "br": 284,
    "pr": 464,
    "wt": ["For Space", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more Sp. Shot power boosted 30%"
    },
    "name": "Beam Magnum",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 553,
    "ma": 154,
    "sa": 3690,
    "md": 0,
    "sd": 0,
    "br": 284,
    "pr": 464,
    "wt": ["For Space", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Enemy Shooting power reduced 30%"
    },
    "name": "Hyper Bazooka",
    "type": "Physical"
  }, {
    "part": "shield",
    "a": 965,
    "ma": 965,
    "sa": 553,
    "md": 965,
    "sd": 965,
    "br": 0,
    "pr": 1082,
    "wt": ["For Space", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 40% or more EX Skill DMG output boosted by 8-35"
    },
    "name": "Shield"
  }]
}, {
  "name": "Veetwo Gundam",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 799,
    "ma": 384,
    "sa": 2791,
    "md": 799,
    "sd": 384,
    "br": 213,
    "pr": 0,
    "wt": ["Ace Excl.", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Shooting power boosted 30%"
    }
  }, {
    "part": "torso",
    "a": 1184,
    "ma": 384,
    "sa": 384,
    "md": 1608,
    "sd": 799,
    "br": 614,
    "pr": 0,
    "wt": ["Ace Excl.", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "Long-Shooter Job EX Skill CD reduced 20%"
    }
  }, {
    "part": "arms",
    "a": 799,
    "ma": 1982,
    "sa": 384,
    "md": 1184,
    "sd": 799,
    "br": 0,
    "pr": 0,
    "wt": ["Ace Excl.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Hand Missile Pod"
    }
  }, {
    "part": "legs",
    "a": 799,
    "ma": 384,
    "sa": 799,
    "md": 1184,
    "sd": 384,
    "br": 614,
    "pr": 420,
    "wt": ["Ace Excl.", "For Computers"],
    "ex": {
      "type": "Part Traits",
      "name": "With Bazooka category equipped Projectile speed boosted 15%"
    }
  }, {
    "part": "backpack",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 1608,
    "sd": 384,
    "br": 614,
    "pr": 420,
    "wt": ["Ace Excl.", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Missile Pod & Beam Cannon"
    }
  }, {
    "part": "range",
    "a": 384,
    "ma": 0,
    "sa": 3590,
    "md": 799,
    "sd": 0,
    "br": 420,
    "pr": 213,
    "wt": ["Ace Excl.", "For Computers"],
    "ex": {
      "type": "EX Skill",
      "name": "Big Beam Bazooka"
    },
    "name": "Big Beam Bazooka",
    "type": "Beam"
  }]
}, {
  "name": "Victory Gundam",
  "attribute": "Technique",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 1181,
    "ma": 384,
    "sa": 796,
    "md": 1181,
    "sd": 384,
    "br": 213,
    "pr": 417,
    "wt": ["For Forest", "Protag."],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1602,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 0,
    "pr": 611,
    "wt": ["For Forest", "Protag."],
    "ex": {
      "type": "Part Traits",
      "name": "With Rifle category equipped EX Skill piercing boosted 10-28%"
    }
  }, {
    "part": "arms",
    "a": 1181,
    "ma": 3177,
    "sa": 384,
    "md": 3997,
    "sd": 1181,
    "br": 0,
    "pr": 1028,
    "wt": ["For Forest", "Protag."],
    "ex": {
      "type": "EX Skill",
      "name": "Vertical Saber Spin"
    },
    "combo": "shield"
  }, {
    "part": "legs",
    "a": 796,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 611,
    "pr": 417,
    "wt": ["For Forest", "Mass P."],
    "ex": {
      "type": "Part Traits",
      "name": "With Rifle category equipped Close Shot Attack raised 8-20%"
    }
  }, {
    "part": "backpack",
    "a": 796,
    "ma": 384,
    "sa": 384,
    "md": 1602,
    "sd": 796,
    "br": 417,
    "pr": 611,
    "wt": ["For Forest", "Mass P."],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Debuff EX Skill time up 4-22%"
    }
  }, {
    "part": "melee",
    "a": 384,
    "ma": 3997,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 213,
    "pr": 417,
    "wt": ["For Forest.", "Mass P."],
    "ex": {
      "type": "Part Traits",
      "name": "With Technique attribute (self) Strong Melee CRIT rate boosted 10-30%"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 1181,
    "ma": 0,
    "sa": 2380,
    "md": 0,
    "sd": 0,
    "br": 417,
    "pr": 611,
    "wt": ["For Forest", "Mass P."],
    "ex": {
      "type": "Part Traits",
      "name": "Beam ranged weapon reload speed boosted 8-20%"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }]
}, {
  "name": "Wing Gundam",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 797,
    "ma": 384,
    "sa": 2785,
    "md": 384,
    "sd": 384,
    "br": 418,
    "pr": 213,
    "wt": ["Transformer", "Long-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1605,
    "ma": 797,
    "sa": 797,
    "md": 797,
    "sd": 797,
    "br": 611,
    "pr": 0,
    "wt": ["Transformer", "Protag."],
    "ex": {
      "type": "EX Skill",
      "name": "Self-Destruct"
    }
  }, {
    "part": "arms",
    "a": 797,
    "ma": 2785,
    "sa": 1181,
    "md": 384,
    "sd": 384,
    "br": 0,
    "pr": 0,
    "wt": ["Transformer", "Long-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "When armor is 70% or less Enemy Melee Power reduced 17-30%"
    }
  }, {
    "part": "legs",
    "a": 797,
    "ma": 797,
    "sa": 384,
    "md": 797,
    "sd": 797,
    "br": 418,
    "pr": 611,
    "wt": ["Transformer", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When armor is 70% Long Shot Attack raised 8-20%"
    }
  }, {
    "part": "backpack",
    "a": 797,
    "ma": 797,
    "sa": 384,
    "md": 797,
    "sd": 797,
    "br": 611,
    "pr": 418,
    "wt": ["Transformer", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When armor is 70% Long Shot Attack raised 8-20%"
    }
  }, {
    "part": "melee",
    "a": 384,
    "ma": 3582,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 611,
    "pr": 418,
    "wt": ["Transformer", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "Long Shooter Job Job Gauge increase boosted 6-17%"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 384,
    "ma": 0,
    "sa": 3582,
    "md": 0,
    "sd": 0,
    "br": 418,
    "pr": 213,
    "wt": ["Transformer", "Long-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Max Output Buster Rifle"
    },
    "name": "Buster Rifle",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 797,
    "ma": 797,
    "sa": 384,
    "md": 797,
    "sd": 797,
    "br": 1029,
    "pr": 0,
    "wt": ["Transformer", "Long-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Shield Bash"
    },
    "name": "Shield"
  }]
}, {
  "name": "Wing Gundam 0 [Endless Waltz Ver.]",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 0,
    "ma": 378,
    "sa": 3538,
    "md": 551,
    "sd": 965,
    "br": 409,
    "pr": 0,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Beam EX Skill power boosted 30%"
    }
  }, {
    "part": "torso",
    "a": 1732,
    "ma": 719,
    "sa": 1422,
    "md": 0,
    "sd": 1354,
    "br": 671,
    "pr": 0,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Zero System"
    }
  }, {
    "part": "arms",
    "a": 1884,
    "ma": 719,
    "sa": 1165,
    "md": 551,
    "sd": 965,
    "br": 409,
    "pr": 282,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Projectile speed boosted 15%"
    }
  }, {
    "part": "legs",
    "a": 965,
    "ma": 551,
    "sa": 965,
    "md": 965,
    "sd": 1354,
    "br": 282,
    "pr": 671,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 70% or less Melee CRIT rate boosted 30%"
    }
  }, {
    "part": "backpack",
    "a": 378,
    "ma": 551,
    "sa": 1422,
    "md": 965,
    "sd": 1354,
    "br": 671,
    "pr": 464,
    "wt": ["Protag.", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Feather Dive"
    }
  }, {
    "part": "range",
    "a": 551,
    "ma": 0,
    "sa": 3951,
    "md": 0,
    "sd": 965,
    "br": 464,
    "pr": 282,
    "wt": ["Protag.", "High Firepower"],
    "ex": {
      "type": "EX Skill",
      "name": "Rolling Buster Rifle"
    },
    "name": "Twin Buster Rifle (Coupled)",
    "type": "Beam"
  }]
}, {
  "name": "Zaku II (Char Aznable)",
  "attribute": "Speed",
  "rarity": 3,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 558,
    "ma": 291,
    "sa": 1698,
    "md": 558,
    "sd": 558,
    "br": 0,
    "pr": 302,
    "wt": ["Ace Excl.", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Beam Coat β"
    }
  }, {
    "part": "torso",
    "a": 1140,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 428,
    "wt": ["Ace Excl.", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "When Armor is 60% or more Debuff EX Skill effect up 1-15%"
    }
  }, {
    "part": "arms",
    "a": 558,
    "ma": 1698,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 0,
    "pr": 0,
    "wt": ["Ace Excl.", "Zaku Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Fearless Charge"
    }
  }, {
    "part": "legs",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 302,
    "pr": 428,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Sp. Shot power boosted 8-25%"
    }
  }, {
    "part": "backpack",
    "a": 558,
    "ma": 291,
    "sa": 291,
    "md": 889,
    "sd": 889,
    "br": 302,
    "pr": 428,
    "wt": ["Ace Excl.", "High Mobility"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) EX Skill Piercing boosted 8-22%"
    }
  }]
}, {
  "name": "Zeong",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 0,
  "parts": [{
    "part": "head",
    "a": 384,
    "ma": 384,
    "sa": 3181,
    "md": 382,
    "sd": 1182,
    "br": 0,
    "pr": 0,
    "wt": ["Zeon", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "Point-Blank Shot"
    }
  }, {
    "part": "torso",
    "a": 1606,
    "ma": 384,
    "sa": 384,
    "md": 799,
    "sd": 1606,
    "br": 290,
    "pr": 290,
    "wt": ["Zeon", "For Space"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) EX Skill CD reduced 20%"
    }
  }, {
    "part": "arms",
    "a": 1182,
    "ma": 799,
    "sa": 384,
    "md": 384,
    "sd": 1606,
    "br": 290,
    "pr": 290,
    "wt": ["Zeon", "For Space"],
    "ex": {
      "type": "EX Skill",
      "name": "5-Barrel Mega Particle Cannon"
    }
  }, {
    "part": "legs",
    "a": 799,
    "ma": 384,
    "sa": 384,
    "md": 799,
    "sd": 1606,
    "br": 420,
    "pr": 420,
    "wt": ["Zeon", "Long-Range"],
    "ex": {
      "type": "EX Skill",
      "name": "Torso Mega Particle Cannon"
    }
  }]
}, {
  "name": "Zeta Gundam",
  "attribute": "Speed",
  "rarity": 4,
  "sokai": 1,
  "parts": [{
    "part": "head",
    "a": 969,
    "ma": 379,
    "sa": 2391,
    "md": 791,
    "sd": 791,
    "br": 468,
    "pr": 0,
    "wt": ["Transformer", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Head-Mounted Vulcan"
    }
  }, {
    "part": "torso",
    "a": 1738,
    "ma": 379,
    "sa": 379,
    "md": 1358,
    "sd": 1358,
    "br": 675,
    "pr": 0,
    "wt": ["Transformer", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "Hyper Beam Saber"
    }
  }, {
    "part": "arms",
    "a": 969,
    "ma": 2528,
    "sa": 379,
    "md": 1358,
    "sd": 1358,
    "br": 0,
    "pr": 0,
    "wt": ["Transformer", "Gundam Type"],
    "ex": {
      "type": "EX Skill",
      "name": "Arm-Mounted Grenade Launcher"
    }
  }, {
    "part": "legs",
    "a": 969,
    "ma": 379,
    "sa": 379,
    "md": 1358,
    "sd": 1358,
    "br": 675,
    "pr": 468,
    "wt": ["Transformer", "Ace Excl."],
    "ex": {
      "type": "EX Skill",
      "name": "Saber Boomerang"
    }
  }, {
    "part": "backpack",
    "a": 969,
    "ma": 379,
    "sa": 379,
    "md": 1358,
    "sd": 1358,
    "br": 675,
    "pr": 468,
    "wt": ["Transformer", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "When attacking with Beam Shooting Power boosted 30%"
    }
  }, {
    "part": "melee",
    "a": 969,
    "ma": 3318,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 675,
    "pr": 208,
    "wt": ["Transformer", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Cross Wave"
    },
    "name": "Beam Saber",
    "type": "Beam"
  }, {
    "part": "melee",
    "a": 969,
    "ma": 3318,
    "sa": 0,
    "md": 0,
    "sd": 0,
    "br": 675,
    "pr": 208,
    "wt": ["Transformer", "Long-Range"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Melee DMG Output boosted 35"
    },
    "name": "Long Beam Saber",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 969,
    "ma": 0,
    "sa": 3318,
    "md": 0,
    "sd": 0,
    "br": 675,
    "pr": 208,
    "wt": ["Transformer", "Gundam Type"],
    "ex": {
      "type": "Part Traits",
      "name": "Sp. Shot DMG Output boosted 35"
    },
    "name": "Beam Rifle",
    "type": "Beam"
  }, {
    "part": "range",
    "a": 969,
    "ma": 0,
    "sa": 3318,
    "md": 0,
    "sd": 0,
    "br": 675,
    "pr": 208,
    "wt": ["Transformer", "High Firepower"],
    "ex": {
      "type": "Part Traits",
      "name": "With Speed attribute (self) Enemy Shooting power reduced 30%"
    },
    "name": "Hyper Mega Launcher",
    "type": "Beam"
  }, {
    "part": "shield",
    "a": 969,
    "ma": 0,
    "sa": 0,
    "md": 1738,
    "sd": 1738,
    "br": 878,
    "pr": 208,
    "wt": ["Transformer", "Close Combat"],
    "ex": {
      "type": "EX Skill",
      "name": "Missile Launcher"
    },
    "name": "Zeta Shield"
  }]
}];
const Pilots = [{
  "name": "Aina Sahalin",
  "jl": "Long-Shooter",
  "attribute": "Technique",
  "rarity": 3,
  "a": 559,
  "ma": 292,
  "sa": 1144,
  "md": 559,
  "sd": 559,
  "br": 303,
  "pr": 303,
  "wt": ["Long-Range", "Zaku Type"],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique Attibute (self) Buff EX Skill effect up 15%"
  }
}, {
  "name": "Amuro Ray",
  "jl": "Long-Shooter",
  "attribute": "Technique",
  "rarity": 4,
  "a": 796,
  "ma": 384,
  "sa": 1602,
  "md": 796,
  "sd": 796,
  "br": 213,
  "pr": 417,
  "wt": ["Gundam Type", "Federation"],
  "ex": {
    "type": "Part Traits",
    "name": "Beam ranged weapon reload speed boosted 20%"
  }
}, {
  "name": "Anavel Gato",
  "jl": "Defender",
  "attribute": "Power",
  "rarity": 4,
  "a": 1180,
  "ma": 1180,
  "sa": 383,
  "md": 796,
  "sd": 796,
  "br": 212,
  "pr": 610,
  "wt": ["Ace Excl.", "Zeon"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power Attribute (self) All DMG output boosted by 35"
  }
}, {
  "name": "Athrun Zala",
  "jl": "In-Fighter",
  "attribute": "Speed",
  "rarity": 4,
  "a": 799,
  "ma": 1182,
  "sa": 384,
  "md": 799,
  "sd": 1182,
  "br": 612,
  "pr": 213,
  "wt": ["Transformer", "Mid-Range"],
  "ex": {
    "type": "Part Traits",
    "name": "20% chance to prevent vernier consumption when stepping"
  }
}, {
  "name": "Auel Neider",
  "jl": "Defender",
  "attribute": "Technique",
  "rarity": 3,
  "a": 889,
  "ma": 291,
  "sa": 889,
  "md": 558,
  "sd": 558,
  "br": 126,
  "pr": 428,
  "wt": ["Amphib.", "Mid-Range"],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique Attribute (self), Debuff EX Skill effect up 15%"
  }
}, {
  "name": "Bernard Wiseman",
  "jl": "In-Fighter",
  "attribute": "Technique",
  "rarity": 4,
  "a": 795,
  "ma": 795,
  "sa": 795,
  "md": 795,
  "sd": 795,
  "br": 211,
  "pr": 609,
  "wt": ["High Mobility", "Zaku Type"],
  "ex": {
    "type": "Part Traits",
    "name": "When Armor is 60% or less Recover 10 Armor gradually"
  }
}, {
  "name": "Cagalli Yula Athha",
  "jl": "Middle-Shooter",
  "attribute": "Speed",
  "rarity": 3,
  "a": 559,
  "ma": 294,
  "sa": 893,
  "md": 893,
  "sd": 559,
  "br": 432,
  "pr": 129,
  "wt": ["For Base", "Mid-Range"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed attribute (self) Projectile speed boosted 5-14%"
  }
}, {
  "name": "Carozzo Ronah",
  "jl": "Defender",
  "attribute": "Power",
  "rarity": 4,
  "a": 799,
  "ma": 384,
  "sa": 384,
  "md": 799,
  "sd": 799,
  "br": 614,
  "pr": 614,
  "wt": ["High Firepower", "For Computers"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power attribute (self) Debuff EX Skill effect up 15%"
  }
}, {
  "name": "Chang Wufei",
  "jl": "In-Fighter",
  "attribute": "Technique",
  "rarity": 4,
  "a": 1181,
  "ma": 1181,
  "sa": 384,
  "md": 796,
  "sd": 796,
  "br": 417,
  "pr": 417,
  "wt": ["Close Combat", "Ace Excl."],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique attribute (self) Strong Melee DMG output boosted by 8-35"
  }
}, {
  "name": "Char Aznable",
  "jl": "Out-Fighter",
  "attribute": "Speed",
  "rarity": 4,
  "a": 795,
  "ma": 795,
  "sa": 795,
  "md": 795,
  "sd": 795,
  "br": 609,
  "pr": 211,
  "wt": ["Ace Excl.", "Commander"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed attribute (self) All DMG taken reduced by 20"
  }
}, {
  "name": "Chloe Croce",
  "jl": "Out-Fighter",
  "attribute": "Speed",
  "rarity": 3,
  "a": 559,
  "ma": 1144,
  "sa": 292,
  "md": 559,
  "sd": 559,
  "br": 303,
  "pr": 303,
  "wt": ["High Mobility", "For Forest"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed attribute (self) Vernier consumption reduced 15%"
  }
}, {
  "name": "Christina Mackenzie",
  "jl": "Middle-Shooter",
  "attribute": "Power",
  "rarity": 4,
  "a": 795,
  "ma": 382,
  "sa": 382,
  "md": 1179,
  "sd": 1179,
  "br": 609,
  "pr": 211,
  "wt": ["Close Combat", "For Urban Area"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power attribute (self) EX Skill piercing boosted 28%"
  }
}, {
  "name": "Dearka Elsman",
  "jl": "Long-Shooter",
  "attribute": "Power",
  "rarity": 3,
  "a": 558,
  "ma": 291,
  "sa": 1142,
  "md": 558,
  "sd": 558,
  "br": 302,
  "pr": 126,
  "wt": ["Long-Range", "Support Type"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power attribute (self) Shot guidance boosted 5-14%"
  }
}, {
  "name": "Domon Kasshu",
  "jl": "In-Fighter",
  "attribute": "Power",
  "rarity": 4,
  "a": 796,
  "ma": 1753,
  "sa": 155,
  "md": 977,
  "sd": 643,
  "br": 417,
  "pr": 213,
  "wt": ["Mobile Fighter", "For Urban Area"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power attribute (self) All CRIT rate boosted 14%"
  }
}, {
  "name": "Duo Maxwell",
  "jl": "In-Fighter",
  "attribute": "Speed",
  "rarity": 4,
  "a": 796,
  "ma": 1602,
  "sa": 384,
  "md": 796,
  "sd": 796,
  "br": 213,
  "pr": 417,
  "wt": ["Close Combat", "For Forest"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed attribute (self) 8-20% chance to not recoil"
  }
}, {
  "name": "Fa Yuiry",
  "jl": "Supporter",
  "attribute": "Technique",
  "rarity": 3,
  "a": 891,
  "ma": 292,
  "sa": 891,
  "md": 558,
  "sd": 558,
  "br": 302,
  "pr": 302,
  "wt": ["Transformer", "Support Type"],
  "ex": {
    "type": "Part Traits",
    "name": "Support Job EX Skill recovery boosted 16%"
  }
}, {
  "name": "Full Frontal",
  "jl": "Out-Fighter",
  "attribute": "Power",
  "rarity": 4,
  "a": 384,
  "ma": 1182,
  "sa": 1182,
  "md": 799,
  "sd": 799,
  "br": 420,
  "pr": 420,
  "wt": ["Commander", "Zeon"],
  "ex": {
    "type": "Part Traits",
    "name": "While \"Zeon\", Initial EX Skill Charge boosted 20%"
  }
}, {
  "name": "Gaelio Bauduin",
  "jl": "Defender",
  "attribute": "Technique",
  "rarity": 4,
  "a": 796,
  "ma": 1602,
  "sa": 384,
  "md": 796,
  "sd": 796,
  "br": 417,
  "pr": 213,
  "wt": ["Heavy Armor", "For Space"],
  "ex": {
    "type": "Part Traits",
    "name": "When Armor is 60% or more All power boosted 30%"
  }
}, {
  "name": "Gai Murakumo",
  "jl": "Middle-Shooter",
  "attribute": "Speed",
  "rarity": 4,
  "a": 796,
  "ma": 384,
  "sa": 1602,
  "md": 796,
  "sd": 796,
  "br": 417,
  "pr": 213,
  "wt": ["For Forest", "Gundam Type"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed Power attribute (self) EX Skill recovery boosted 28%"
  }
}, {
  "name": "Garrod Ran",
  "jl": "Out-Fighter",
  "attribute": "Speed",
  "rarity": 4,
  "a": 797,
  "ma": 1181,
  "sa": 1181,
  "md": 797,
  "sd": 797,
  "br": 213,
  "pr": 418,
  "wt": ["Protag.", "Close Combat"],
  "ex": {
    "type": "Part Traits",
    "name": "When Armor is 80% or less All power boosted 17-30%"
  }
}, {
  "name": "George de Sand",
  "jl": "Out-Fighter",
  "attribute": "Technique",
  "rarity": 4,
  "a": 795,
  "ma": 382,
  "sa": 382,
  "md": 1179,
  "sd": 1179,
  "br": 609,
  "pr": 211,
  "wt": ["Mobile Fighter", "Long-Range"],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique attribute (self) EX Skill CD reduced 20%"
  }
}, {
  "name": "Haman Karn",
  "jl": "Long-Shooter",
  "attribute": "Power",
  "rarity": 4,
  "a": 796,
  "ma": 384,
  "sa": 1602,
  "md": 796,
  "sd": 796,
  "br": 417,
  "pr": 213,
  "wt": ["Commander", "Zeon"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power attribute (self) Job Gauge increase boosted 17%"
  }
}, {
  "name": "Harry Ord",
  "jl": "Defender",
  "attribute": "Speed",
  "rarity": 3,
  "a": 558,
  "ma": 1142,
  "sa": 291,
  "md": 558,
  "sd": 558,
  "br": 302,
  "pr": 126,
  "wt": ["Ace Excl.", "Close Combat"],
  "ex": {
    "type": "Part Traits",
    "name": "Beam ranged weapon magazine boosted 9-20%"
  }
}, {
  "name": "Heine Westenfluss",
  "jl": "Defender",
  "attribute": "Speed",
  "rarity": 3,
  "a": 561,
  "ma": 893,
  "sa": 294,
  "md": 561,
  "sd": 893,
  "br": 215,
  "pr": 215,
  "wt": ["Close Combat", "Commander"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed attribute (self), Debuff EX Skill effect up 15%"
  }
}, {
  "name": "Johnny Ridden",
  "jl": "In-Fighter",
  "attribute": "Technique",
  "rarity": 3,
  "a": 558,
  "ma": 1142,
  "sa": 291,
  "md": 558,
  "sd": 558,
  "br": 126,
  "pr": 302,
  "wt": ["Zeon", "For Space"],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique attribute (self) Buff EX Skill effect up 1-15%"
  }
}, {
  "name": "Judua Ashta",
  "jl": "Middle-Shooter",
  "attribute": "Power",
  "rarity": 4,
  "a": 796,
  "ma": 384,
  "sa": 1602,
  "md": 796,
  "sd": 796,
  "br": 417,
  "pr": 213,
  "wt": ["Protag.", "Transformer"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power attribute (self) Buff EX Skill time up 22%"
  }
}, {
  "name": "Jean-Luc Duval",
  "jl": "Defender",
  "attribute": "Speed",
  "rarity": 3,
  "a": 891,
  "ma": 558,
  "sa": 292,
  "md": 891,
  "sd": 558,
  "br": 430,
  "pr": 127,
  "wt": ["Zeon", "High Mobility"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed Attribute (self) Vernier Consumption reduced 15%"
  }
}, {
  "name": "Kamille Bidan",
  "jl": "Middle-Shooter",
  "attribute": "Speed",
  "rarity": 4,
  "a": 796,
  "ma": 796,
  "sa": 796,
  "md": 796,
  "sd": 796,
  "br": 417,
  "pr": 417,
  "wt": ["Protag.", "Close Combat"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed attribute (self) EX Skill piercing boosted 28%"
  }
}, {
  "name": "Kayra Su",
  "jl": "Defender",
  "attribute": "Technique",
  "rarity": 3,
  "a": 889,
  "ma": 558,
  "sa": 291,
  "md": 558,
  "sd": 889,
  "br": 126,
  "pr": 428,
  "wt": ["Mid-Range", "Federation"],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique attribute (self) Shot guidance boosted 14%"
  }
}, {
  "name": "Kira Yamato",
  "jl": "Middle-Shooter",
  "attribute": "Speed",
  "rarity": 4,
  "a": 799,
  "ma": 384,
  "sa": 1184,
  "md": 1184,
  "sd": 799,
  "br": 614,
  "pr": 213,
  "wt": ["Protag.", "For Base"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed attribute (self) EX Skill recovery boosted by 140"
  }
}, {
  "name": "Kou Uraki",
  "jl": "Defender",
  "attribute": "Power",
  "rarity": 4,
  "a": 1606,
  "ma": 384,
  "sa": 384,
  "md": 799,
  "sd": 799,
  "br": 612,
  "pr": 612,
  "wt": ["Protag.", "Federation"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power attribute (self) 14% chance to survive a fatal blow"
  }
}, {
  "name": "Lacus Clyne",
  "jl": "Supporter",
  "attribute": "Technique",
  "rarity": 4,
  "a": 795,
  "ma": 795,
  "sa": 795,
  "md": 795,
  "sd": 795,
  "br": 211,
  "pr": 609,
  "wt": ["Commander", "For Space"],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique attribute (self), EX Skill recovery boosted 140"
  }
}, {
  "name": "Lalah Sune",
  "jl": "Supporter",
  "attribute": "Technique",
  "rarity": 4,
  "a": 799,
  "ma": 384,
  "sa": 1184,
  "md": 1184,
  "sd": 799,
  "br": 614,
  "pr": 213,
  "wt": ["Long-Range", "Ace Excl."],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique attribute (self) Debuff EX Skill effect up 22%"
  }
}, {
  "name": "Lila Milla Rira",
  "jl": "Middle-Shooter",
  "attribute": "Power",
  "rarity": 3,
  "a": 292,
  "ma": 891,
  "sa": 891,
  "md": 559,
  "sd": 559,
  "br": 303,
  "pr": 303,
  "wt": ["Federation", "For Space"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power attribute (self) Projectile speed boosted 14%"
  }
}, {
  "name": "Lockon Stratos",
  "jl": "Long Shooter",
  "attribute": "Technique",
  "rarity": 4,
  "a": 799,
  "ma": 384,
  "sa": 1606,
  "md": 799,
  "sd": 799,
  "br": 420,
  "pr": 420,
  "wt": ["High Firepower", "Long-Range"],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique attribute (self), Long Shot Attack raised 20%"
  }
}, {
  "name": "Louise Halevy",
  "jl": "Defender",
  "attribute": "Power",
  "rarity": 3,
  "a": 1144,
  "ma": 292,
  "sa": 292,
  "md": 558,
  "sd": 558,
  "br": 430,
  "pr": 127,
  "wt": ["Support Type", "For Space"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power attribute (self) Enemy All power reduced 13%"
  }
}, {
  "name": "Lowe Guele",
  "jl": "In-Fighter",
  "attribute": "Speed",
  "rarity": 4,
  "a": 1180,
  "ma": 1180,
  "sa": 383,
  "md": 796,
  "sd": 796,
  "br": 212,
  "pr": 610,
  "wt": ["Protag.", "High Firepower"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed attribute (self) All CRIT Rate boosted 14%"
  }
}, {
  "name": "Lunamaria Hawke",
  "jl": "Long-Shooter",
  "attribute": "Technique",
  "rarity": 3,
  "a": 558,
  "ma": 291,
  "sa": 1142,
  "md": 558,
  "sd": 558,
  "br": 302,
  "pr": 125,
  "wt": ["Zeon", "Zaku Type"],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique attribute (self) Long Shot Attack raised 14%"
  }
}, {
  "name": "Mikazuki Augus",
  "jl": "Defender",
  "attribute": "Power",
  "rarity": 4,
  "a": 384,
  "ma": 1182,
  "sa": 1182,
  "md": 799,
  "sd": 799,
  "br": 420,
  "pr": 420,
  "wt": ["Protag.", "For Desert"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power attribute (self) Initial EX Skill charge boosted 20%"
  }
}, {
  "name": "Mr. Bushido",
  "jl": "In-Fighter",
  "attribute": "Power",
  "rarity": 3,
  "a": 558,
  "ma": 1142,
  "sa": 291,
  "md": 558,
  "sd": 558,
  "br": 126,
  "pr": 302,
  "wt": ["Close Combat", "High Mobility"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power Attribute (self), EX Skill CD reduced 15%"
  }
}, {
  "name": "Nena Trinity",
  "jl": "Supporter",
  "attribute": "Speed",
  "rarity": 3,
  "a": 891,
  "ma": 558,
  "sa": 292,
  "md": 891,
  "sd": 558,
  "br": 127,
  "pr": 430,
  "wt": ["Support Type", "Gundam Type"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed Attribute (self), EX Skill Recovery boosted 16%"
  }
}, {
  "name": "Neo Roanoke",
  "jl": "Middle-Shooter",
  "attribute": "Speed",
  "rarity": 4,
  "a": 797,
  "ma": 1181,
  "sa": 1181,
  "md": 797,
  "sd": 797,
  "br": 418,
  "pr": 213,
  "wt": ["Commander", "For Space"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed attribute (self) 14% chance to survive a fatal blow"
  }
}, {
  "name": "Paptimus Scirocco",
  "jl": "Out-Fighter",
  "attribute": "Technique",
  "rarity": 4,
  "a": 1180,
  "ma": 1180,
  "sa": 383,
  "md": 796,
  "sd": 796,
  "br": 212,
  "pr": 610,
  "wt": ["Transformer", "Commander"],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique attribute (self) Shot guidance boosted 14%"
  }
}, {
  "name": "Quatre Raberba Winner",
  "jl": "Support",
  "attribute": "Speed",
  "rarity": 3,
  "a": 558,
  "ma": 291,
  "sa": 291,
  "md": 889,
  "sd": 889,
  "br": 126,
  "pr": 428,
  "wt": ["For Base", "For Desert"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed Attribute (self) Enemy All power reduced 13%"
  }
}, {
  "name": "Quattro Bajeena",
  "jl": "Middle-Shooter",
  "attribute": "Speed",
  "rarity": 4,
  "a": 797,
  "ma": 1181,
  "sa": 1181,
  "md": 797,
  "sd": 797,
  "br": 213,
  "pr": 418,
  "wt": ["Commander", "Ace Excl."],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed attribute (self) All DMG output boosted by 35"
  }
}, {
  "name": "Rau Le Creuset",
  "jl": "Long-Shooter",
  "attribute": "Technique",
  "rarity": 4,
  "a": 1181,
  "ma": 384,
  "sa": 1181,
  "md": 796,
  "sd": 796,
  "br": 611,
  "pr": 213,
  "wt": [
    "Commander",
    "Ace Excl."
  ],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique Attribute (self), Buff EX Skill Time up 22%"
  }
}, {
  "name": "Rey Za Burrel",
  "jl": "Middle-Shooter",
  "attribute": "Speed",
  "rarity": 3,
  "a": 559,
  "ma": 294,
  "sa": 893,
  "md": 893,
  "sd": 559,
  "br": 303,
  "pr": 303,
  "wt": ["Ace Excl.", "Mid-Range"],
  "ex": {
    "type": "Part Traits",
    "name": "All ranged weapon magazine boosted 14%"
  }
}, {
  "name": "Sai Saici",
  "jl": "Out-Fighter",
  "attribute": "Technique",
  "rarity": 4,
  "a": 796,
  "ma": 1602,
  "sa": 384,
  "md": 796,
  "sd": 796,
  "br": 417,
  "pr": 213,
  "wt": ["Mobile Fighter", "High Mobility"],
  "ex": {
    "type": "Part Traits",
    "name": "Out-Fighter Job EX Skill CD reduced 20%"
  }
}, {
  "name": "Seabook Arno",
  "jl": "Middle-Shooter",
  "attribute": "Technique",
  "rarity": 4,
  "a": 796,
  "ma": 384,
  "sa": 1602,
  "md": 796,
  "sd": 796,
  "br": 417,
  "pr": 213,
  "wt": ["Protag.", "For Urban Area"],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique attribute (self) Enemy All power reduced 18%"
  }
}, {
  "name": "Sarah Zabiarov",
  "jl": "Supporter",
  "attribute": "Speed",
  "rarity": 3,
  "a": 558,
  "ma": 291,
  "sa": 291,
  "md": 889,
  "sd": 889,
  "br": 428,
  "pr": 126,
  "wt": ["Mid-Range", "Support Type"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed Attribute (self), Debuff EX Skill Effect up 15%"
  }
}, {
  "name": "Setsuna F. Seiei",
  "jl": "In-Fighter",
  "attribute": "Speed",
  "rarity": null,
  "a": 796,
  "ma": 1602,
  "sa": 384,
  "md": 796,
  "sd": 796,
  "br": 417,
  "pr": 213,
  "wt": ["Protag.", "Gundam Type"],
  "ex": {
    "type": "Part Traits",
    "name": "While \"Gundam Type\", Buff EX Skill effect up 22%"
  }
}, {
  "name": "Shiho Hahnenfuss",
  "jl": "Long-Shooter",
  "attribute": "Speed",
  "rarity": 3,
  "a": 558,
  "ma": 291,
  "sa": 1142,
  "md": 558,
  "sd": 558,
  "br": 302,
  "pr": 126,
  "wt": [
    "Long-Range",
    "Ace Excl."
  ],
  "ex": {
    "type": "Part Traits",
    "name": "All ranged weapon magazine boosted 14%"
  }
}, {
  "name": "Shin Asuka",
  "jl": "Out-Fighter",
  "attribute": "Power",
  "rarity": 4,
  "a": 797,
  "ma": 1181,
  "sa": 1181,
  "md": 797,
  "sd": 797,
  "br": 418,
  "pr": 213,
  "wt": ["High Mobility", "Protag."],
  "ex": {
    "type": "Part Traits",
    "name": "Initial EX Skill charge boosted 15%"
  }
}, {
  "name": "Shiro Amada",
  "jl": "Out-Fighter",
  "attribute": "Power",
  "rarity": 4,
  "a": 1180,
  "ma": 1180,
  "sa": 383,
  "md": 796,
  "sd": 796,
  "br": 610,
  "pr": 212,
  "wt": ["For Forest", "For Desert"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power attribute (self) Enemy Shooting power reduced 30%"
  }
}, {
  "name": "Soma Peries",
  "jl": "Middle-Shooter",
  "attribute": "Power",
  "rarity": 3,
  "a": 558,
  "ma": 291,
  "sa": 291,
  "md": 889,
  "sd": 889,
  "br": 428,
  "pr": 126,
  "wt": ["Mid-Range", "For Space"],
  "ex": {
    "type": "Part Traits",
    "name": "With Power attribute (self), Enemy Shooting power reduced 25%"
  }
}, {
  "name": "Stella Loussier",
  "jl": "Out-Fighter",
  "attribute": "Speed",
  "rarity": 3,
  "a": 558,
  "ma": 891,
  "sa": 891,
  "md": 558,
  "sd": 558,
  "br": 127,
  "pr": 302,
  "wt": ["Transformer", "Close Combat"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed attribute (self), Job Gauge increase boosted 13%"
  }
}, {
  "name": "Sven Cal Bayang",
  "jl": "Out-Fighter",
  "attribute": "Speed",
  "rarity": 3,
  "a": 889,
  "ma": 889,
  "sa": 291,
  "md": 558,
  "sd": 558,
  "br": 302,
  "pr": 302,
  "wt": ["High Mobility", "For Space"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed attribute (self) Initial EX Skill charge boosted 3-12%"
  }
}, {
  "name": "Trowa Barton",
  "jl": "Middle-Shooter",
  "attribute": "Technique",
  "rarity": 3,
  "a": 891,
  "ma": 292,
  "sa": 891,
  "md": 558,
  "sd": 558,
  "br": 302,
  "pr": 302,
  "wt": ["For Base", "High Firepower"],
  "ex": {
    "type": "Part Traits",
    "name": "All ranged weapon magazine boosted 5-14%"
  }
}, {
  "name": "Uso Ewin",
  "jl": "Out-Fighter",
  "attribute": "Technique",
  "rarity": 4,
  "a": 795,
  "ma": 795,
  "sa": 795,
  "md": 795,
  "sd": 795,
  "br": 609,
  "pr": 211,
  "wt": ["Protag.", "For Forest"],
  "ex": {
    "type": "Part Traits",
    "name": "With Technique Attribute (self) Buff EX Skill time up 22%"
  }
}, {
  "name": "Zechs Marquise",
  "jl": "In-Fighter",
  "attribute": "Speed",
  "rarity": 4,
  "a": 795,
  "ma": 795,
  "sa": 795,
  "md": 795,
  "sd": 795,
  "br": 211,
  "pr": 609,
  "wt": ["High Mobility", "Commander"],
  "ex": {
    "type": "Part Traits",
    "name": "With Speed attribute (self) Vernier recovery rate boosted 20%"
  }
}];
const GearTypes = [{
  "name": "Armor[+500]",
  "a": 500
}, {
  "name": "Armor[+1000]",
  "a": 1000
}, {
  "name": "Armor[+1500]",
  "a": 1500
}, {
  "name": "MeleeAtk[+500]",
  "ma": 500
}, {
  "name": "MeleeAtk[+1000]",
  "ma": 1000
}, {
  "name": "MeleeAtk[+1500]",
  "ma": 1500
}, {
  "name": "ShotAtk[+500]",
  "sa": 500
}, {
  "name": "ShotAtk[+1000]",
  "sa": 1000
}, {
  "name": "ShotAtk[+1500]",
  "sa": 1500
}, {
  "name": "MeleeDef[+500]",
  "md": 500
}, {
  "name": "MeleeDef[+1000]",
  "md": 1000
}, {
  "name": "MeleeDef[+1500]",
  "md": 1500
}, {
  "name": "ShotDef[+500]",
  "sd": 500
}, {
  "name": "ShotDef[+1000]",
  "sd": 1000
}, {
  "name": "ShotDef[+1500]",
  "sd": 1500
}, {
  "name": "BeamRes[+500]",
  "br": 500
}, {
  "name": "BeamRes[+1000]",
  "br": 1000
}, {
  "name": "BeamRes[+1500]",
  "br": 1500
}, {
  "name": "PhysRes[+500]",
  "pr": 500
}, {
  "name": "PhysRes[+1000]",
  "pr": 1000
}, {
  "name": "PhysRes[+1500]",
  "pr": 1500
}, {
  "name": "DualAtk[+300]",
  "ma": 300,
  "sa": 300
}, {
  "name": "DualAtk[+650]",
  "ma": 650,
  "sa": 650
}, {
  "name": "DualAtk[+1000]",
  "ma": 1000,
  "sa": 1000
}];