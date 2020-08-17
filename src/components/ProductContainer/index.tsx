import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { FluidObject } from 'gatsby-image';
import { Product } from 'use-shopping-cart';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem 0 1rem 0;
`;

interface PriceNode {
  product: {
    name: string;
    description: string;
    id: string;
    images: string[];
    metadata: {
      type: string;
    };
  };
  id: string;
  unit_amount: number;
  currency: string;
  active: boolean;
}

interface imageLocalFile {
  parent: {
    id: string;
  };
  childImageSharp: {
    fluid: FluidObject;
  };
}

interface ImageNode {
  localFiles: imageLocalFile[];
}

const ProductContainer: React.FC = () => {
  const { prices, images } = useStaticQuery(
    graphql`
      query ProductInfo {
        prices: allStripePrice {
          nodes {
            product {
              name
              description
              id
              images
              metadata {
                type
              }
            }
            id
            unit_amount
            currency
            active
          }
        }
        images: allStripeProduct {
          nodes {
            localFiles {
              parent {
                id
              }
              childImageSharp {
                fluid(maxWidth: 150, maxHeight: 190) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `
  );

  const imageNodes = images.nodes as ImageNode[];
  const priceNodes = (prices.nodes as PriceNode[]).filter(
    (priceNode) => priceNode.active
  );

  return (
    <Container>
      {priceNodes.map((priceNode, index) => {
        const newProduct: Product = {
          name: priceNode.product.name,
          sku: priceNode.id,
          price: priceNode.unit_amount,
          currency: priceNode.currency,
          description: priceNode.product.description,
          image: priceNode.product.images[0],
        };

        const currentFluidImage = imageNodes.find(
          (x) => x.localFiles[0].parent.id === priceNode.product.id
        );

        if (!currentFluidImage) {
          console.log(`Not showing ${newProduct.name}, due to missing image`);
          return null;
        }

        return (
          <ProductItem
            key={index}
            product={newProduct}
            fluidImage={currentFluidImage.localFiles[0].childImageSharp.fluid}
          />
        );
      })}
    </Container>
  );
};

export default ProductContainer;
