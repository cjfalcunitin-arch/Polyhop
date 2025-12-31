// /Game/config/levels.js
// Define all level-specific configurations

export const levelConfigs = {
  1: {
    credit: 100,
    initialEnemies: [
      {
        id: 'enemy-1',
        floor: 0,
        size: 20,
        speed: 100,
        health: 150,
        damage: 15,
        type: 'basic'
      },
      {
        id: 'enemy-2',
        floor: 1,
        size: 20,
        speed: 80,
        health: 120,
        damage: 12,
        type: 'basic'
      }
    ],
    waves: {
      0: [],
      1: [],
      2: [],
      3: []
    }
  },
  
  2: {
    credit: 150,
    initialEnemies: [
      {
        id: 'enemy-1',
        floor: 0,
        size: 20,
        speed: 110,
        health: 180,
        damage: 18,
        type: 'basic'
      },
      {
        id: 'enemy-2',
        floor: 1,
        size: 20,
        speed: 100,
        health: 150,
        damage: 15,
        type: 'fast'
      }
    ],
    waves: {
      0: [
        {
          id: 'wave-enemy-1',
          size: 20,
          speed: 100,
          health: 120,
          damage: 12,
          type: 'basic'
        }
      ],
      1: [],
      2: [],
      3: []
    }
  },
  
  3: {
    credit: 200,
    initialEnemies: [
      {
        id: 'enemy-1',
        floor: 0,
        size: 20,
        speed: 120,
        health: 200,
        damage: 20,
        type: 'fast'
      },
      {
        id: 'enemy-2',
        floor: 1,
        size: 22,
        speed: 90,
        health: 250,
        damage: 25,
        type: 'tank'
      }
    ],
    waves: {
      0: [
        {
          id: 'wave-enemy-1',
          size: 20,
          speed: 110,
          health: 140,
          damage: 14,
          type: 'fast'
        }
      ],
      1: [
        {
          id: 'wave-enemy-2',
          size: 20,
          speed: 100,
          health: 130,
          damage: 13,
          type: 'basic'
        }
      ],
      2: [],
      3: []
    }
  },
  
  4: {
    credit: 250,
    initialEnemies: [
      {
        id: 'enemy-1',
        floor: 0,
        size: 20,
        speed: 130,
        health: 220,
        damage: 22,
        type: 'fast'
      },
      {
        id: 'enemy-2',
        floor: 1,
        size: 24,
        speed: 85,
        health: 300,
        damage: 30,
        type: 'tank'
      },
      {
        id: 'enemy-3',
        floor: 2,
        size: 20,
        speed: 110,
        health: 180,
        damage: 18,
        type: 'basic'
      }
    ],
    waves: {
      0: [
        {
          id: 'wave-enemy-1',
          size: 20,
          speed: 120,
          health: 160,
          damage: 16,
          type: 'fast'
        }
      ],
      1: [
        {
          id: 'wave-enemy-2',
          size: 20,
          speed: 110,
          health: 140,
          damage: 14,
          type: 'basic'
        }
      ],
      2: [],
      3: []
    }
  },
  
  5: {
    credit: 300,
    initialEnemies: [
      {
        id: 'enemy-1',
        floor: 0,
        size: 22,
        speed: 140,
        health: 250,
        damage: 25,
        type: 'fast'
      },
      {
        id: 'enemy-2',
        floor: 1,
        size: 26,
        speed: 80,
        health: 350,
        damage: 35,
        type: 'tank'
      },
      {
        id: 'enemy-3',
        floor: 2,
        size: 20,
        speed: 120,
        health: 200,
        damage: 20,
        type: 'fast'
      }
    ],
    waves: {
      0: [
        {
          id: 'wave-enemy-1',
          size: 20,
          speed: 130,
          health: 180,
          damage: 18,
          type: 'fast'
        }
      ],
      1: [
        {
          id: 'wave-enemy-2',
          size: 20,
          speed: 120,
          health: 160,
          damage: 16,
          type: 'fast'
        }
      ],
      2: [
        {
          id: 'wave-enemy-3',
          size: 20,
          speed: 100,
          health: 140,
          damage: 14,
          type: 'basic'
        }
      ],
      3: []
    }
  },
  
  6: {
    credit: 350,
    initialEnemies: [
      {
        id: 'enemy-1',
        floor: 0,
        size: 24,
        speed: 150,
        health: 280,
        damage: 28,
        type: 'fast'
      },
      {
        id: 'enemy-2',
        floor: 1,
        size: 28,
        speed: 75,
        health: 400,
        damage: 40,
        type: 'tank'
      },
      {
        id: 'enemy-3',
        floor: 2,
        size: 22,
        speed: 130,
        health: 240,
        damage: 24,
        type: 'fast'
      }
    ],
    waves: {
      0: [
        {
          id: 'wave-enemy-1',
          size: 22,
          speed: 140,
          health: 200,
          damage: 20,
          type: 'fast'
        }
      ],
      1: [
        {
          id: 'wave-enemy-2',
          size: 20,
          speed: 130,
          health: 170,
          damage: 17,
          type: 'fast'
        }
      ],
      2: [
        {
          id: 'wave-enemy-3',
          size: 20,
          speed: 120,
          health: 170,
          damage: 17,
          type: 'basic'
        }
      ],
      3: []
    }
  },

  // Levels 7-12 with increased difficulty
  7: {
    credit: 400,
    initialEnemies: [
      {
        id: 'enemy-1',
        floor: 0,
        size: 24,
        speed: 160,
        health: 300,
        damage: 30,
        type: 'fast'
      },
      {
        id: 'enemy-2',
        floor: 1,
        size: 30,
        speed: 70,
        health: 450,
        damage: 45,
        type: 'tank'
      },
      {
        id: 'enemy-3',
        floor: 2,
        size: 22,
        speed: 140,
        health: 260,
        damage: 26,
        type: 'fast'
      }
    ],
    waves: {
      0: [
        {
          id: 'wave-enemy-1',
          size: 22,
          speed: 150,
          health: 220,
          damage: 22,
          type: 'fast'
        }
      ],
      1: [
        {
          id: 'wave-enemy-2',
          size: 26,
          speed: 85,
          health: 300,
          damage: 30,
          type: 'tank'
        }
      ],
      2: [
        {
          id: 'wave-enemy-3',
          size: 20,
          speed: 130,
          health: 190,
          damage: 19,
          type: 'basic'
        }
      ],
      3: []
    }
  },

  8: {
    credit: 450,
    initialEnemies: [
      {
        id: 'enemy-1',
        floor: 0,
        size: 26,
        speed: 170,
        health: 320,
        damage: 32,
        type: 'fast'
      },
      {
        id: 'enemy-2',
        floor: 1,
        size: 32,
        speed: 65,
        health: 500,
        damage: 50,
        type: 'tank'
      },
      {
        id: 'enemy-3',
        floor: 2,
        size: 24,
        speed: 150,
        health: 280,
        damage: 28,
        type: 'fast'
      }
    ],
    waves: {
      0: [
        {
          id: 'wave-enemy-1',
          size: 24,
          speed: 160,
          health: 240,
          damage: 24,
          type: 'fast'
        }
      ],
      1: [
        {
          id: 'wave-enemy-2',
          size: 30,
          speed: 70,
          health: 400,
          damage: 40,
          type: 'tank'
        }
      ],
      2: [
        {
          id: 'wave-enemy-3',
          size: 22,
          speed: 140,
          health: 210,
          damage: 21,
          type: 'fast'
        }
      ],
      3: []
    }
  },

  9: {
    credit: 500,
    initialEnemies: [
      {
        id: 'enemy-1',
        floor: 0,
        size: 28,
        speed: 180,
        health: 340,
        damage: 34,
        type: 'fast'
      },
      {
        id: 'enemy-2',
        floor: 1,
        size: 34,
        speed: 60,
        health: 550,
        damage: 55,
        type: 'tank'
      },
      {
        id: 'enemy-3',
        floor: 2,
        size: 26,
        speed: 160,
        health: 300,
        damage: 30,
        type: 'fast'
      }
    ],
    waves: {
      0: [
        {
          id: 'wave-enemy-1',
          size: 26,
          speed: 170,
          health: 260,
          damage: 26,
          type: 'fast'
        }
      ],
      1: [
        {
          id: 'wave-enemy-2',
          size: 32,
          speed: 65,
          health: 440,
          damage: 44,
          type: 'tank'
        }
      ],
      2: [
        {
          id: 'wave-enemy-3',
          size: 24,
          speed: 150,
          health: 230,
          damage: 23,
          type: 'fast'
        }
      ],
      3: [
        {
          id: 'wave-enemy-4',
          size: 20,
          speed: 120,
          health: 180,
          damage: 18,
          type: 'basic'
        }
      ]
    }
  },

  10: {
    credit: 550,
    initialEnemies: [
      {
        id: 'enemy-1',
        floor: 0,
        size: 30,
        speed: 190,
        health: 360,
        damage: 36,
        type: 'fast'
      },
      {
        id: 'enemy-2',
        floor: 1,
        size: 36,
        speed: 55,
        health: 600,
        damage: 60,
        type: 'tank'
      },
      {
        id: 'enemy-3',
        floor: 2,
        size: 28,
        speed: 170,
        health: 320,
        damage: 32,
        type: 'fast'
      }
    ],
    waves: {
      0: [
        {
          id: 'wave-enemy-1',
          size: 28,
          speed: 180,
          health: 280,
          damage: 28,
          type: 'fast'
        }
      ],
      1: [
        {
          id: 'wave-enemy-2',
          size: 34,
          speed: 60,
          health: 480,
          damage: 48,
          type: 'tank'
        }
      ],
      2: [
        {
          id: 'wave-enemy-3',
          size: 26,
          speed: 160,
          health: 250,
          damage: 25,
          type: 'fast'
        }
      ],
      3: [
        {
          id: 'wave-enemy-4',
          size: 22,
          speed: 130,
          health: 200,
          damage: 20,
          type: 'basic'
        }
      ]
    }
  },

  11: {
    credit: 600,
    initialEnemies: [
      {
        id: 'enemy-1',
        floor: 0,
        size: 32,
        speed: 200,
        health: 380,
        damage: 38,
        type: 'fast'
      },
      {
        id: 'enemy-2',
        floor: 1,
        size: 38,
        speed: 50,
        health: 650,
        damage: 65,
        type: 'tank'
      },
      {
        id: 'enemy-3',
        floor: 2,
        size: 30,
        speed: 180,
        health: 340,
        damage: 34,
        type: 'fast'
      }
    ],
    waves: {
      0: [
        {
          id: 'wave-enemy-1',
          size: 30,
          speed: 190,
          health: 300,
          damage: 30,
          type: 'fast'
        }
      ],
      1: [
        {
          id: 'wave-enemy-2',
          size: 36,
          speed: 55,
          health: 520,
          damage: 52,
          type: 'tank'
        }
      ],
      2: [
        {
          id: 'wave-enemy-3',
          size: 28,
          speed: 170,
          health: 270,
          damage: 27,
          type: 'fast'
        }
      ],
      3: [
        {
          id: 'wave-enemy-4',
          size: 24,
          speed: 140,
          health: 220,
          damage: 22,
          type: 'basic'
        }
      ]
    }
  },

  12: {
    credit: 650,
    initialEnemies: [
      {
        id: 'enemy-1',
        floor: 0,
        size: 34,
        speed: 210,
        health: 400,
        damage: 40,
        type: 'fast'
      },
      {
        id: 'enemy-2',
        floor: 1,
        size: 40,
        speed: 45,
        health: 700,
        damage: 70,
        type: 'tank'
      },
      {
        id: 'enemy-3',
        floor: 2,
        size: 32,
        speed: 190,
        health: 360,
        damage: 36,
        type: 'fast'
      }
    ],
    waves: {
      0: [
        {
          id: 'wave-enemy-1',
          size: 32,
          speed: 200,
          health: 320,
          damage: 32,
          type: 'fast'
        }
      ],
      1: [
        {
          id: 'wave-enemy-2',
          size: 38,
          speed: 50,
          health: 560,
          damage: 56,
          type: 'tank'
        }
      ],
      2: [
        {
          id: 'wave-enemy-3',
          size: 30,
          speed: 180,
          health: 290,
          damage: 29,
          type: 'fast'
        }
      ],
      3: [
        {
          id: 'wave-enemy-4',
          size: 26,
          speed: 150,
          health: 240,
          damage: 24,
          type: 'basic'
        }
      ]
    }
  }
};

// Helper function to get level config with fallback
export function getLevelConfig(level) {
  return levelConfigs[level] || levelConfigs[1];
}