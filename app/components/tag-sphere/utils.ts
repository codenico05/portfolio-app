import { ReactNode } from 'react';

export interface Vector2D {
  x: number;
  y: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface Vector2D2 {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface OpacityData {
  hover: number;
  min: number;
  speed: number;
}

export interface zIndexData {
  foreground: number;
  background: number;
}

export interface TagCloudProps {
  radius: number;
  speed: number;
  maxSpeed?: number;
  opacityData?: OpacityData;
  zIndexData?: zIndexData;
  children: JSX.Element[] | JSX.Element;
  margin?: number;
  style?: React.CSSProperties;
}

export interface Entry {
  index: number;
  children: Exclude<ReactNode, boolean | null | undefined>;
  vector2D: Vector2D;
  vector3D: Vector3D;
  diff: Vector2D;
  opacity: number;
  mouseOver: boolean;
}
