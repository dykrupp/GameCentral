import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
`;

const ShoppingCartImage = styled(ShoppingCartIcon)`
  fill: white;
`;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: headerHeight,
  },
}));

const Header: React.FC<HeaderPropTypes> = ({ siteTitle }) => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { cartCount } = useShoppingCart();
  const shouldRenderMenu = useMediaQuery('(max-width: 1300px');
  const [tabValue, setTabValue] = useState<false | number>(false);
  const classes = useStyles();

  return (
    <HeaderContainer>
      <AppBar position="fixed" className={classes.appBar}>
        <ToolBar>
          <h1>
            <TitleLink to="/" onClick={() => setTabValue(false)}>
              {siteTitle}
            </TitleLink>
          </h1>
          {shouldRenderMenu ? (
            <NavigationMenu />
          ) : (
            <NavigationTabs tabValue={tabValue} setTabValue={setTabValue} />
          )}
          <Tooltip title={!isCartDrawerOpen ? 'Open Cart' : 'Close Cart'}>
            <IconButton onClick={() => setIsCartDrawerOpen((state) => !state)}>
              <Badge badgeContent={cartCount} color="secondary">
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
