import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { FluidObject } from 'gatsby-image';

const stripePromise = loadStripe(
  process.env.GATSBY_STRIPE_PUBLISHABLE_KEY
    ? process.env.GATSBY_STRIPE_PUBLISHABLE_KEY
    : ''
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem 0 1rem 0;
`;

export interface ProductEdge {
  node: {
    product: {
      name: string;
      description: string;
      id: string;
    };
    unit_amount: number;
    currency: string;
  };
}

interface imageLocalFile {
  parent: {
    id: string;
  };
  childImageSharp: {
    fluid: FluidObject;
  };
}

export interface ImageNode {
  localFiles: imageLocalFile[];
}

const Products: React.FC = () => {
  const { products, images } = useStaticQuery(
    graphql`
      query ProductInfo {
        products: allStripePrice {
          edges {
            node {
              product {
                name
                description
                id
              }
              unit_amount
              currency
            }
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
  const productEdges = products.edges as ProductEdge[];

  return (
    <Elements stripe={stripePromise}>
      <Container>
        {productEdges.map((productEdge, index) => {
          return (
            <ProductItem
              key={index}
              productEdge={productEdge}
              fluidImage={imageNodes[index].localFiles[0].childImageSharp.fluid}
            />
          );
        })}
      </Container>
    </Elements>
  );
};

export default Products;
