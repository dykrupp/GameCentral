import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

interface Edge {
  node: {
    name: string;
    description: string;
  };
}

const Products: React.FC = () => {
  const { data } = useStaticQuery(
    graphql`
      query Products {
        data: allStripeProduct {
          edges {
            node {
              name
              description
            }
          }
        }
      }
    `
  );

  const edges = data.edges as Edge[];

  return (
    <ul>
      {edges.map((edge, index) => (
        <li key={index}>
          <p>{`Name: ${edge.node.name}, Description: ${edge.node.description}`}</p>
        </li>
      ))}
    </ul>
  );
};

export default Products;
