import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { CartDrawer } from './CartDrawer';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled from 'styled-components';
import { NavigationTabs } from './NavigationTabs/index';
import { IconButton, Tooltip, AppBar, Toolbar } from '@material-ui/core';
import { headerHeight } from '../constants';
import { NavigationMenu } from './NavigationMenu';

interface HeaderPropTypes {
  siteTitle?: string;
}

const HeaderContainer = styled.div`
  display: flex;
`;

const ToolBar = styled(Toolbar)`
  justify-content: space-between;
`;

const TitleLink = styled(Link)`
  color: white;
  text-decoration: none;
  outline: none;
`;

const ShoppingCartImage = styled(ShoppingCartIcon)`
  fill: white;
`;

const NavigationContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  min-width: 180px;
`;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: headerHeight,
  },
}));

const Header: React.FC<HeaderPropTypes> = ({ siteTitle }) => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const shoppingCart = useShoppingCart();
  const [currentCartCount, setCurrentCartCount] = useState(0);
  const [tabValue, setTabValue] = useState<false | number>(false);
  const [isQueryReady, setIsQueryReady] = useState(false);
  const shouldRenderMenu = useMediaQuery('(max-width: 1300px)');
  const classes = useStyles();

  useEffect(() => {
    setCurrentCartCount(shoppingCart.cartCount);
  }, [shoppingCart.cartCount]);

  useEffect(() => {
    if (window && !isQueryReady) setIsQueryReady(true);
  });

  return (
    <HeaderContainer>
      <AppBar position="fixed" className={classes.appBar}>
        <ToolBar>
          <TitleContainer>
            <Tooltip title="Home">
              <h1>
                <TitleLink to="/" onClick={() => setTabValue(false)}>
                  {siteTitle}
                </TitleLink>
              </h1>
            </Tooltip>
          </TitleContainer>
          <NavigationContainer>
            {!isQueryReady ? null : shouldRenderMenu ? (
              <NavigationMenu />
            ) : (
              <NavigationTabs tabValue={tabValue} setTabValue={setTabValue} />
            )}
          </NavigationContainer>
          <Tooltip title={!isCartDrawerOpen ? 'Open Cart' : 'Close Cart'}>
            <IconButton onClick={() => setIsCartDrawerOpen((state) => !state)}>
              <Badge badgeContent={currentCartCount} color="secondary">
                <ShoppingCartImage />
              </Badge>
            </IconButton>
          </Tooltip>
        </ToolBar>
      </AppBar>
      <CartDrawer
        isDrawerOpen={isCartDrawerOpen}
        setIsDrawerOpen={setIsCartDrawerOpen}
      />
    </HeaderContainer>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
