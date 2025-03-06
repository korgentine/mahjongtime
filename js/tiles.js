/**
 * Tile data definitions for Mahjong learning app
 */

const TILE_TYPES = {
    NUMBER: 'number',
    DRAGON: 'dragon',
    WIND: 'wind'
  };
  
  // Define all tiles for the game
  const TILES = [
    // Number tiles 1-9 (Man/Character suit)
    {
      id: 'man-1',
      type: TILE_TYPES.NUMBER,
      value: '1',
      image: 'assets/tiles/numbers/man-1.svg',
      name: '1',
      class: 'number-tile'
    },
    {
      id: 'man-2',
      type: TILE_TYPES.NUMBER,
      value: '2',
      image: 'assets/tiles/numbers/man-2.svg',
      name: '2',
      class: 'number-tile'
    },
    {
      id: 'man-3',
      type: TILE_TYPES.NUMBER,
      value: '3',
      image: 'assets/tiles/numbers/man-3.svg',
      name: '3',
      class: 'number-tile'
    },
    {
      id: 'man-4',
      type: TILE_TYPES.NUMBER,
      value: '4',
      image: 'assets/tiles/numbers/man-4.svg',
      name: '4',
      class: 'number-tile'
    },
    {
      id: 'man-5',
      type: TILE_TYPES.NUMBER,
      value: '5',
      image: 'assets/tiles/numbers/man-5.svg',
      name: '5',
      class: 'number-tile'
    },
    {
      id: 'man-6',
      type: TILE_TYPES.NUMBER,
      value: '6',
      image: 'assets/tiles/numbers/man-6.svg',
      name: '6',
      class: 'number-tile'
    },
    {
      id: 'man-7',
      type: TILE_TYPES.NUMBER,
      value: '7',
      image: 'assets/tiles/numbers/man-7.svg',
      name: '7',
      class: 'number-tile'
    },
    {
      id: 'man-8',
      type: TILE_TYPES.NUMBER,
      value: '8',
      image: 'assets/tiles/numbers/man-8.svg',
      name: '8',
      class: 'number-tile'
    },
    {
      id: 'man-9',
      type: TILE_TYPES.NUMBER,
      value: '9',
      image: 'assets/tiles/numbers/man-9.svg',
      name: '9',
      class: 'number-tile'
    },
    
    // Dragon tiles
    {
      id: 'dragon-red',
      type: TILE_TYPES.DRAGON,
      value: 'dragon',
      image: 'assets/tiles/dragons/red.svg',
      name: 'DRAGON',
      class: 'dragon-tile'
    },
    {
      id: 'dragon-green',
      type: TILE_TYPES.DRAGON,
      value: 'dragon',
      image: 'assets/tiles/dragons/green.svg',
      name: 'DRAGON',
      class: 'dragon-tile'
    },
    {
      id: 'dragon-white',
      type: TILE_TYPES.DRAGON,
      value: 'dragon',
      image: 'assets/tiles/dragons/white.svg',
      name: 'DRAGON',
      class: 'dragon-tile'
    },
    
    // Wind tiles
    {
      id: 'wind-east',
      type: TILE_TYPES.WIND,
      value: 'east',
      image: 'assets/tiles/winds/east.svg',
      name: 'EAST',
      class: 'wind-tile'
    },
    {
      id: 'wind-south',
      type: TILE_TYPES.WIND,
      value: 'south',
      image: 'assets/tiles/winds/south.svg',
      name: 'SOUTH',
      class: 'wind-tile'
    },
    {
      id: 'wind-west',
      type: TILE_TYPES.WIND,
      value: 'west',
      image: 'assets/tiles/winds/west.svg',
      name: 'WEST',
      class: 'wind-tile'
    },
    {
      id: 'wind-north',
      type: TILE_TYPES.WIND,
      value: 'north',
      image: 'assets/tiles/winds/north.svg',
      name: 'NORTH',
      class: 'wind-tile'
    }
  ];
  
  // Tile pools grouped by type for easier access
  const TILE_POOLS = {
    [TILE_TYPES.NUMBER]: TILES.filter(tile => tile.type === TILE_TYPES.NUMBER),
    [TILE_TYPES.DRAGON]: TILES.filter(tile => tile.type === TILE_TYPES.DRAGON),
    [TILE_TYPES.WIND]: TILES.filter(tile => tile.type === TILE_TYPES.WIND),
    ALL: TILES
  };