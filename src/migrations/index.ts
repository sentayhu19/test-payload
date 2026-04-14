import * as migration_20260414_190734_block_pages from './20260414_190734_block_pages';

export const migrations = [
  {
    up: migration_20260414_190734_block_pages.up,
    down: migration_20260414_190734_block_pages.down,
    name: '20260414_190734_block_pages'
  },
];
