import type { ModelsSettings } from '@models/brand/types';

export function hasTableView(settings: ModelsSettings): boolean {
  return settings.table === true || typeof settings.table === 'object';
}

export function hasTilesView(settings: ModelsSettings): boolean {
  return settings.tiles === true;
}
