import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { IconButton, Tooltip, AppBar, Toolbar } from '@material-ui/core';
import { CartDrawer } from './CartDrawer';
import { makeStyles } from '@material-ui/core/styles';

interface HeaderPropTypes {
  siteTitle?: string;
}

export const headerHeight = '64px';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: headerHeight,
  },
  toolBar: {
    justifyContent: 'space-between',
  },
}));

const Header: React.FC<HeaderPropTypes> = ({ siteTitle }) => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const classes = useStyles();

  const { cartCount } = useShoppingCart();

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
