import { IconDefaultProps } from '@scrowl/ui';
import type { AssetType } from '../../pages/workspace/components/overlay/asset-browser/asset.types';

export interface AssetIconProps extends Omit<IconDefaultProps, 'icon'> {
  type: AssetType;
  ext?: string;
};
