import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import styled from 'styled-components';

interface HeaderPropTypes {
  siteTitle?: string;
}

const Button = styled.button`
  font-size: 13px;
  text-align: center;
  color: #fff;
  outline: none;
  padding: 12px;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: rgb(255, 178, 56);
  border-radius: 6px;
  letter-spacing: 1.5px;
  width: 150px;
`;

const CartInfo = styled.p`
  margin-bottom: 0;
  font-weight: bold;
  color: white;
`;

const Header: React.FC<HeaderPropTypes> = ({ siteTitle }) => {
  const [loading, setLoading] = useState(false);

  const {
    formattedTotalPrice,
    redirectToCheckout,
    cartCount,
    clearCart,
  } = useShoppingCart();

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          padding: `1.45rem 1.0875rem`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>

        <CartInfo>Number of Items: {cartCount}</CartInfo>
        <CartInfo>Total: {formattedTotalPrice}</CartInfo>
        <Button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            redirectToCheckout();
          }}
        >
          {loading ? 'Loading...' : 'Checkout'}
        </Button>
        <Button onClick={clearCart}>Clear Cart</Button>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
