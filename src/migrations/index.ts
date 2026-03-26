import * as migration_20260326_060132 from './20260326_060132';

export const migrations = [
  {
    up: migration_20260326_060132.up,
    down: migration_20260326_060132.down,
    name: '20260326_060132'
  },
];
