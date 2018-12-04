class Grid {
  constructor(scene, world, startY, endY) {
    this.scene_ = scene;
    this.world_ = world;

    this.renderRug_();

    const fireplaceCenter = this.getTileCenter(0, startY);
    const fireplace = scene.add.sprite(
        (fireplaceCenter.x - Config.GRID_TILE_SIZE_PX / 2
            - Config.WORLD_FIREPLACE_WIDTH_PX
            * Config.WORLD_FIREPLACE_SCALE / 2),
        (fireplaceCenter.y + Config.GRID_TILE_SIZE_PX / 2
            - Config.WORLD_FIREPLACE_HEIGHT_PX
            * Config.WORLD_FIREPLACE_SCALE / 2),
        'fireplace');
    fireplace.displayWidth = Config.WORLD_FIREPLACE_WIDTH_PX
        * Config.WORLD_FIREPLACE_SCALE;
    fireplace.displayHeight = Config.WORLD_FIREPLACE_HEIGHT_PX
        * Config.WORLD_FIREPLACE_SCALE;
    world.addObstacleSprite(fireplace);

    const target = this.renderSprite_(6, 1, 'target');
    target.displayWidth = Config.GRID_TILE_SIZE_PX;
    target.displayHeight = Config.GRID_TILE_SIZE_PX;
  }

  renderRug_() {
    // Render the corners.
    this.renderSprite_(0, 0, 'rugtopleft');
    this.renderSprite_(
        Config.GRID_WIDTH_IN_TILES - 1, 0, 'rugtopleft').flipX = -1;
    this.renderSprite_(
        0, Config.GRID_HEIGHT_IN_TILES - 1, 'rugtopleft').flipY = -1;
    const bottomRight = this.renderSprite_(
        Config.GRID_WIDTH_IN_TILES - 1,
        Config.GRID_HEIGHT_IN_TILES - 1,
        'rugtopleft');
    bottomRight.flipX = -1;
    bottomRight.flipY = -1;

    // Render the sides.
    for (var tileX = 1; tileX < Config.GRID_WIDTH_IN_TILES - 1; tileX++) {
      this.renderSprite_(tileX, 0, 'rugtop');
      this.renderSprite_(
          tileX, Config.GRID_HEIGHT_IN_TILES - 1, 'rugtop').flipY = -1;
    }
    for (var tileY = 1; tileY < Config.GRID_HEIGHT_IN_TILES - 1; tileY++) {
      this.renderSprite_(0, tileY, 'rugleft');
      this.renderSprite_(
          Config.GRID_WIDTH_IN_TILES - 1, tileY, 'rugleft').flipX = -1;
    }

    // Render the middle.
    for (var tileX = 1; tileX < Config.GRID_WIDTH_IN_TILES - 1; tileX++) {
      for (var tileY = 1; tileY < Config.GRID_HEIGHT_IN_TILES - 1; tileY++) {
        this.renderSprite_(tileX, tileY, 'rugmiddle');
      }
    }
  }

  renderSprite_(tileX, tileY, key) {
    const center = this.getTileCenter(tileX, tileY);
    return this.scene_.add.sprite(center.x, center.y, key);
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