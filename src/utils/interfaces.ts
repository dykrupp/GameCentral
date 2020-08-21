import { FluidObject } from 'gatsby-image';
import { Product } from 'use-shopping-cart';

export interface ProductInfo extends Product {
  fluidObject: FluidObject;
  type: string;
  isTopPick: boolean | null;
}
