import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { CartDrawer } from './CartDrawer';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import {
  IconButton,
  Tooltip,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { headerHeight } from '../constants';
import { useMobileComponents } from '../../../../utils/hooks/useMobileComponents';
import { SearchContainer } from './SearchContainer';
import { Navigation } from './Navigation';

interface HeaderPropTypes {
  siteTitle?: string;
}

const HeaderContainer = styled.div`
  display: flex;
  min-height: ${headerHeight};
`;

const ToolBar = styled(Toolbar)`
  justify-content: space-between;
  min-height: ${headerHeight};
`;

const TitleLink = styled(Link)`
  color: white;
  text-decoration: none;
  outline: none;
`;

const ShoppingCartImage = styled(ShoppingCartIcon)`
  fill: white;
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
  const shouldUseMobileComponents = useMobileComponents();
  const classes = useStyles();

  useEffect(() => {
    setCurrentCartCount(shoppingCart.cartCount);
  }, [shoppingCart.cartCount]);

  useEffect(() => {
    if (!isQueryReady && window) setIsQueryReady(true);
  });

  return (
    <HeaderContainer>
      <AppBar position="fixed" className={classes.appBar}>
        <ToolBar>
          {!shouldUseMobileComponents && (
            <TitleContainer>
              <Tooltip title="Home">
                <Typography variant="h4">
                  <TitleLink to="/" onClick={() => setTabValue(false)}>
                    {siteTitle}
                  </TitleLink>
                </Typography>
              </Tooltip>
            </TitleContainer>
          )}
          <Navigation
            isQueryReady={isQueryReady}
            tabValue={tabValue}
            setTabValue={setTabValue}
            shouldUseMobileComponent={shouldUseMobileComponents}
          />
          <SearchContainer
            setTabValue={setTabValue}
            shouldUseMobileComponents={shouldUseMobileComponents}
          />
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
