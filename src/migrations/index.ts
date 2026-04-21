import * as migration_20260328_114051_initial_migration from './20260328_114051_initial_migration';
import * as migration_20260331_034024 from './20260331_034024';
import * as migration_20260331_040342 from './20260331_040342';
import * as migration_20260410_064341 from './20260410_064341';
import * as migration_20260410_064707 from './20260410_064707';
import * as migration_20260410_064955 from './20260410_064955';
import * as migration_20260412_045131 from './20260412_045131';
import * as migration_20260413_015137 from './20260413_015137';
import * as migration_20260413_042907 from './20260413_042907';
import * as migration_20260413_043210 from './20260413_043210';
import * as migration_20260414_053449 from './20260414_053449';
import * as migration_20260421_011404 from './20260421_011404';

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
    name: '20260331_040342',
  },
  {
    up: migration_20260410_064341.up,
    down: migration_20260410_064341.down,
    name: '20260410_064341',
  },
  {
    up: migration_20260410_064707.up,
    down: migration_20260410_064707.down,
    name: '20260410_064707',
  },
  {
    up: migration_20260410_064955.up,
    down: migration_20260410_064955.down,
    name: '20260410_064955',
  },
  {
    up: migration_20260412_045131.up,
    down: migration_20260412_045131.down,
    name: '20260412_045131',
  },
  {
    up: migration_20260413_015137.up,
    down: migration_20260413_015137.down,
    name: '20260413_015137',
  },
  {
    up: migration_20260413_042907.up,
    down: migration_20260413_042907.down,
    name: '20260413_042907',
  },
  {
    up: migration_20260413_043210.up,
    down: migration_20260413_043210.down,
    name: '20260413_043210',
  },
  {
    up: migration_20260414_053449.up,
    down: migration_20260414_053449.down,
    name: '20260414_053449',
  },
  {
    up: migration_20260421_011404.up,
    down: migration_20260421_011404.down,
    name: '20260421_011404'
  },
];
