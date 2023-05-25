import React from 'react';
import { Projects } from '../../../../../models';

export type AssetType = 'image' | 'document' | 'video' | 'audio' | 'json';

export type AssetProps = Projects.ProjectAsset;

export type AssetProgressProps = {
  progress:  {
    filename: string;
    type: string,
    message: string,
    steps: number,
    step: number,
    stats: {
      completed: number,
      progress: number,
      total: number,
    },
  };
};

export interface AssetBrowserCommons {
  isOpen: boolean;
  onClose: (data?: any) => void;
  onSelected: (data?: any) => void;
  assetTypes?: Array<AssetType>;
};

export type AssetBrowserProps = AssetBrowserCommons & React.AllHTMLAttributes<HTMLDivElement>;

export interface AssetEntryCommons {
  asset: Projects.ProjectAsset;
  onSelected: (asset: Projects.ProjectAsset) => void;
  colSize?: React.CSSProperties;
  colType?: React.CSSProperties;
}

export type AssetEntryProps = AssetEntryCommons & React.AllHTMLAttributes<HTMLDivElement>;