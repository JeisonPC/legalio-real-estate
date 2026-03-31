import * as migration_20260328_114051_initial_migration from './20260328_114051_initial_migration';
import * as migration_20260331_034024 from './20260331_034024';
import * as migration_20260331_040342 from './20260331_040342';

export const migrations = [
  {
    up: migration_20260328_114051_initial_migration.up,
    down: migration_20260328_114051_initial_migration.down,
    name: '20260328_114051_initial_migration',
  },
  {
    up: migration_20260331_034024.up,
    down: migration_20260331_034024.down,
    name: '20260331_034024',
  },
  {
    up: migration_20260331_040342.up,
    down: migration_20260331_040342.down,
    name: '20260331_040342'
  },
];
