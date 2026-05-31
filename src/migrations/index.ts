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
import * as migration_20260426_234919 from './20260426_234919';
import * as migration_20260427_034010_avatar_add from './20260427_034010_avatar_add';
import * as migration_20260427_052619_add_email_create_account_user from './20260427_052619_add_email_create_account_user';
import * as migration_20260427_052940_add_avatar_user from './20260427_052940_add_avatar_user';
import * as migration_20260427_061651_field_send_user_invitation from './20260427_061651_field_send_user_invitation';
import * as migration_20260503_201600_optimize_media_images from './20260503_201600_optimize_media_images';
import * as migration_20260515_060608 from './20260515_060608';
import * as migration_20260531_192104 from './20260531_192104';
import * as migration_20260531_194958 from './20260531_194958';
import * as migration_20260531_203025 from './20260531_203025';
import * as migration_20260531_204625 from './20260531_204625';

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
    name: '20260421_011404',
  },
  {
    up: migration_20260426_234919.up,
    down: migration_20260426_234919.down,
    name: '20260426_234919',
  },
  {
    up: migration_20260427_034010_avatar_add.up,
    down: migration_20260427_034010_avatar_add.down,
    name: '20260427_034010_avatar_add',
  },
  {
    up: migration_20260427_052619_add_email_create_account_user.up,
    down: migration_20260427_052619_add_email_create_account_user.down,
    name: '20260427_052619_add_email_create_account_user',
  },
  {
    up: migration_20260427_052940_add_avatar_user.up,
    down: migration_20260427_052940_add_avatar_user.down,
    name: '20260427_052940_add_avatar_user',
  },
  {
    up: migration_20260427_061651_field_send_user_invitation.up,
    down: migration_20260427_061651_field_send_user_invitation.down,
    name: '20260427_061651_field_send_user_invitation',
  },
  {
    up: migration_20260503_201600_optimize_media_images.up,
    down: migration_20260503_201600_optimize_media_images.down,
    name: '20260503_201600_optimize_media_images',
  },
  {
    up: migration_20260515_060608.up,
    down: migration_20260515_060608.down,
    name: '20260515_060608',
  },
  {
    up: migration_20260531_192104.up,
    down: migration_20260531_192104.down,
    name: '20260531_192104',
  },
  {
    up: migration_20260531_194958.up,
    down: migration_20260531_194958.down,
    name: '20260531_194958',
  },
  {
    up: migration_20260531_203025.up,
    down: migration_20260531_203025.down,
    name: '20260531_203025',
  },
  {
    up: migration_20260531_204625.up,
    down: migration_20260531_204625.down,
    name: '20260531_204625'
  },
];
