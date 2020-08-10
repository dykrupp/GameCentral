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

interface ProductNode {
  product: {
    name: string;
    description: string;
    id: string;
    images: string[];
  };
  id: string;
  unit_amount: number;
  currency: string;
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
  const { products, images } = useStaticQuery(
    graphql`
      query ProductInfo {
        products: allStripePrice {
          nodes {
            product {
              name
              description
              id
              images
            }
            id
            unit_amount
            currency
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
  const productNodes = products.nodes as ProductNode[];

  return (
    <Container>
      {productNodes.map((productNode, index) => {
        const newProduct: Product = {
          name: productNode.product.name,
          sku: productNode.id,
          price: productNode.unit_amount,
          currency: productNode.currency,
          description: productNode.product.description,
          image: productNode.product.images[0],
        };

        return (
          <ProductItem
            key={index}
            product={newProduct}
            fluidImage={imageNodes[index].localFiles[0].childImageSharp.fluid}
          />
        );
      })}
    </Container>
  );
};

export default ProductContainer;
