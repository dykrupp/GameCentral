import { useStaticQuery, graphql } from 'gatsby';
import { ProductInfo } from '../interfaces';
import { convertToProductInfo } from '../functions';

export const usePickedProductInfo = (): ProductInfo[] => {
  const data = useStaticQuery(
    graphql`
      query PickedProductInfo {
        prices: allStripePrice {
          nodes {
            product {
              name
              description
              id
              images
              metadata {
                type
                isTopPick
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
                fluid(maxWidth: 450) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `
  );

  return convertToProductInfo(data).filter((x) => x.isTopPick);
};
