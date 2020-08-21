import { useStaticQuery, graphql } from 'gatsby';
import { ProductInfo } from '../interfaces';
import { convertToProductInfo } from '../functions';

export const useProductInfo = (): ProductInfo[] => {
  const data = useStaticQuery(
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
                fluid(maxWidth: 150) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `
  );

  return convertToProductInfo(data);
};
