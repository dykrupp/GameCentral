/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductInfo } from './interfaces';
import { FluidObject } from 'gatsby-image';

interface PriceNode {
  product: {
    name: string;
    description: string;
    id: string;
    images: string[];
    metadata: {
      type: string;
      isTopPick: boolean | null;
    };
  };
  id: string;
  unit_amount: number;
  currency: string;
  active: boolean;
}

interface ImageNode {
  localFiles: imageLocalFile[];
}

interface imageLocalFile {
  parent: {
    id: string;
  };
  childImageSharp: {
    fluid: FluidObject;
  };
}

export const convertToProductInfo = (data: any): ProductInfo[] => {
  //filter out inactive prices so we keep our 1-1 relationship between images and prices
  const activePriceNodes = (data.prices.nodes as PriceNode[]).filter(
    (priceNode) => priceNode.active
  );

  const imageNodes = data.images.nodes as ImageNode[];

  return activePriceNodes
    .map((priceNode) => {
      const currentFluidImage = imageNodes.find(
        (x) => x.localFiles[0].parent.id === priceNode.product.id
      );

      if (!currentFluidImage) {
        console.log(
          `Not showing ${priceNode.product.name}, due to missing image`
        );
        return null;
      }

      return {
        name: priceNode.product.name,
        sku: priceNode.id,
        price: priceNode.unit_amount,
        currency: priceNode.currency,
        description: priceNode.product.description,
        image: priceNode.product.images[0],
        fluidObject: currentFluidImage.localFiles[0].childImageSharp.fluid,
        type: priceNode.product.metadata.type,
        isTopPick: priceNode.product.metadata.isTopPick,
      } as ProductInfo;
    })
    .filter((x) => x) as ProductInfo[];
};
