class Grid {
  constructor(scene, world, startY, endY, targetTile) {
    this.scene_ = scene;
    this.world_ = world;

    this.renderRug_();

    const fireplaceCenter = this.getTileCenter(0, startY);
    const fireplaceWidth = Config.WORLD_FIREPLACE_WIDTH_PX
        * Config.WORLD_FIREPLACE_SCALE;
    const fireplaceHeight = Config.WORLD_FIREPLACE_HEIGHT_PX
        * Config.WORLD_FIREPLACE_SCALE;
    const fireplace = scene.physics.add.sprite(
        (fireplaceCenter.x - Config.GRID_TILE_SIZE_PX / 2 - fireplaceWidth / 2),
        (fireplaceCenter.y + Config.GRID_TILE_SIZE_PX / 2
            - fireplaceHeight / 2),
        'fireplace');
    fireplace.displayWidth = fireplaceWidth;
    fireplace.displayHeight = fireplaceHeight;
    fireplace.depth = Depths.OBJECTS;
    fireplace.setImmovable(true);
    world.addObstacleSprite(fireplace);

    const treeCenter = this.getTileCenter(targetTile.x, targetTile.y);
    const treeWidth = Config.TREE_SPRITE_WIDTH * Config.TREE_SCALE;
    const treeHeight = Config.TREE_SPRITE_HEIGHT * Config.TREE_SCALE;
    const tree = scene.add.sprite(
        treeCenter.x,
        treeCenter.y + Config.GRID_TILE_SIZE_PX / 2 - treeHeight / 2,
        'tree');
    tree.displayWidth = treeWidth;
    tree.displayHeight = treeHeight;
    tree.depth = Depths.TREE;
  }

  renderRug_() {
    // Render the corners.
    this.renderSprite_(0, 0, 'rugtopleft', Depths.RUG);
    this.renderSprite_(
        Config.GRID_WIDTH_IN_TILES - 1,
        0,
        'rugtopleft',
        Depths.RUG).flipX = -1;
    this.renderSprite_(
        0,
        Config.GRID_HEIGHT_IN_TILES - 1,
        'rugtopleft',
        Depths.RUG).flipY = -1;
    const bottomRight = this.renderSprite_(
        Config.GRID_WIDTH_IN_TILES - 1,
        Config.GRID_HEIGHT_IN_TILES - 1,
        'rugtopleft',
        Depths.RUG);
    bottomRight.flipX = -1;
    bottomRight.flipY = -1;

    // Render the sides.
    for (var tileX = 1; tileX < Config.GRID_WIDTH_IN_TILES - 1; tileX++) {
      this.renderSprite_(tileX, 0, 'rugtop', Depths.RUG);
      this.renderSprite_(
          tileX,
          Config.GRID_HEIGHT_IN_TILES - 1,
          'rugtop',
          Depths.RUG).flipY = -1;
    }
    for (var tileY = 1; tileY < Config.GRID_HEIGHT_IN_TILES - 1; tileY++) {
      this.renderSprite_(0, tileY, 'rugleft', Depths.RUG);
      this.renderSprite_(
          Config.GRID_WIDTH_IN_TILES - 1,
          tileY,
          'rugleft',
          Depths.RUG).flipX = -1;
    }

    // Render the middle.
    for (var tileX = 1; tileX < Config.GRID_WIDTH_IN_TILES - 1; tileX++) {
      for (var tileY = 1; tileY < Config.GRID_HEIGHT_IN_TILES - 1; tileY++) {
        this.renderSprite_(tileX, tileY, 'rugmiddle', Depths.RUG);
      }
    }
  }

  renderSprite_(tileX, tileY, key, depth) {
    const center = this.getTileCenter(tileX, tileY);
    const sprite = this.scene_.add.sprite(center.x, center.y, key);
    sprite.depth = depth;
    return sprite;
  }

  getTileCenter(tileX, tileY) {
    if (tileX < 0 || tileX >= Config.GRID_WIDTH_IN_TILES
        || tileY < 0 || tileY >= Config.GRID_HEIGHT_IN_TILES) {
      console.error('Invalid tileX, tileY: ' + tileX + ', ' + tileY);
      return null;
    }

    return {
      x: Config.GRID_TOP_LEFT_X + Config.GRID_TILE_SIZE_PX * (tileX + 0.5),
      y: Config.GRID_TOP_LEFT_Y + Config.GRID_TILE_SIZE_PX * (tileY + 0.5)
    };
  }

  isInGrid(x, y) {
    return x >= Config.GRID_TOP_LEFT_X
        && x <= Config.GRID_TOP_LEFT_X + Config.GRID_TILE_SIZE_PX *
            Config.GRID_WIDTH_IN_TILES
        && y >= Config.GRID_TOP_LEFT_Y
        && y <= Config.GRID_TOP_LEFT_Y + Config.GRID_TILE_SIZE_PX *
            Config.GRID_HEIGHT_IN_TILES;
  }
}