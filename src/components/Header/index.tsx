import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import styled from 'styled-components';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { IconButton, Tooltip, AppBar, Toolbar } from '@material-ui/core';
import { CartDrawer } from './CartDrawer';
import { makeStyles } from '@material-ui/core/styles';

interface HeaderPropTypes {
  siteTitle?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolBar: {
    justifyContent: 'space-between',
  },
}));

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
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const classes = useStyles();

  const {
    totalPrice,
    redirectToCheckout,
    cartCount,
    clearCart,
  } = useShoppingCart();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
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
          <CartInfo>
            Total:{' '}
            {formatCurrencyString({
              value: totalPrice,
              currency: 'USD',
            })}
          </CartInfo>
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
          <Tooltip title={!isCartDrawerOpen ? 'Open Cart' : 'Close Cart'}>
            <IconButton onClick={() => setIsCartDrawerOpen((state) => !state)}>
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon style={{ fill: 'white' }} />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <CartDrawer
        isDrawerOpen={isCartDrawerOpen}
        setIsDrawerOpen={setIsCartDrawerOpen}
      />
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
