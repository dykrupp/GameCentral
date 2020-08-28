import React from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { ProductType } from '../../utils/constants';
import PropTypes from 'prop-types';
import { useProductInfo } from '../../utils/hooks/useProductInfo';
import { Typography } from '@material-ui/core';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem 0 1rem 0;
`;

const NotFoundHeading = styled(Typography)`
  color: white;
  margin: 0 auto;
  margin-top: 350px;
  margin-bottom: 200px;
`;

interface ProductContainerProps {
  type: ProductType;
  title?: string;
}

const ProductContainer: React.FC<ProductContainerProps> = ({ type, title }) => {
  let productInfo = useProductInfo();

  //filter by title if applicable
  productInfo = title
    ? productInfo.filter((x) =>
        x.name.toUpperCase().includes(title.toUpperCase())
      )
    : productInfo;

  productInfo.sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <Container>
      {productInfo.length > 0 && title !== '' ? (
        productInfo.map((product, index) => {
          if (type !== ProductType.ANY && type !== product.type) return null;
          return <ProductItem key={index} productInfo={product} />;
        })
      ) : (
        <NotFoundHeading variant="h5">
          Title not found. Please try searching for another title!
        </NotFoundHeading>
      )}
    </Container>
  );
};

ProductContainer.propTypes = {
  type: PropTypes.any.isRequired,
  title: PropTypes.string,
};

export default ProductContainer;
