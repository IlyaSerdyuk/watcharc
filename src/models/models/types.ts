import type { DbModel } from '@services/DbTypes';

export interface ModelType extends DbModel {}

export enum TViewType {
  Tiles = 'tiles',
  Table = 'table',
}
