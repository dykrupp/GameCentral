import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Tooltip, Button, Grid } from '@material-ui/core';
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import { headerHeight } from '../../constants';
import styled from 'styled-components';

const drawerWidth = '350px';

const FixedWidthDrawer = styled(Drawer)`
  width: ${drawerWidth};
  flex-shrink: 0;
`;

const HeaderContainer = styled(Grid)`
  margin-top: ${headerHeight};
`;

const CartItem = styled(Grid)`
  width: 100%;
  border-bottom: 2px solid black;
  margin-top: 5px;
`;

const ProductMetadata = styled.p`
  text-align: center;
`;

const CenteredDiv = styled.div`
  justify-content: center;
  display: flex;
`;

const ButtonContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: drawerWidth,
  },
}));

const CartCountContainer = styled(Grid)`
  margin-top: 20px;
`;

const OrderTotalContainer = styled(Grid)`
  border-bottom: 2px solid black;
  margin-bottom: 20px;
`;

interface CartDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (state: boolean) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const classes = useStyles();

  const {
    redirectToCheckout,
    cartCount,
    clearCart,
    cartDetails,
    incrementItem,
    decrementItem,
    totalPrice,
    removeItem,
  } = useShoppingCart();

  return (
    <FixedWidthDrawer
      variant="persistent"
      anchor="right"
      open={isDrawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <HeaderContainer container direction="column">
        <Grid item>
          <Tooltip title="Close Cart">
            <IconButton onClick={(): void => setIsDrawerOpen(false)}>
              <ChevronRightIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Grid>
      </HeaderContainer>
      <Grid item container>
        {Object.keys(cartDetails).map((key, index) => {
          const entry = cartDetails[key];
          const currentCartItem = (
            <CartItem item key={index}>
              <ProductMetadata>{entry.name}</ProductMetadata>
              <CenteredDiv>
                <img style={{ width: '125px' }} src={entry.image} />
              </CenteredDiv>
              <ProductMetadata>{`Description: ${entry.description}`}</ProductMetadata>
              <ProductMetadata>{`Quantity: ${entry.quantity}`}</ProductMetadata>
              <CenteredDiv>
                <Tooltip title="Increment Quantity">
                  <IconButton onClick={() => incrementItem(key)}>
                    <AddIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Decrement Quantity">
                  <IconButton onClick={() => decrementItem(key)}>
                    <RemoveIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remove All">
                  <IconButton onClick={() => removeItem(key)}>
                    <CloseIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </CenteredDiv>
              <ProductMetadata>{`Unit Price: ${entry.formattedValue}`}</ProductMetadata>
            </CartItem>
          );
          return currentCartItem;
        })}
      </Grid>
      <CartCountContainer>
        <ProductMetadata>{`Cart Count: ${cartCount}`}</ProductMetadata>
      </CartCountContainer>
      <OrderTotalContainer>
        <ProductMetadata>
          {`Order Total: ${formatCurrencyString({
            value: totalPrice,
            currency: 'USD',
          })}`}
        </ProductMetadata>
      </OrderTotalContainer>
      <div>
        <ButtonContainer item>
          <Button
            onClick={() => clearCart()}
            color="primary"
            variant="contained"
          >
            Clear Cart
          </Button>
        </ButtonContainer>
        <ButtonContainer item>
          <Button
            onClick={() => redirectToCheckout()}
            color="primary"
            variant="contained"
            disabled={cartCount === 0}
          >
            Checkout
          </Button>
        </ButtonContainer>
      </div>
    </FixedWidthDrawer>
  );
};

CartDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  setIsDrawerOpen: PropTypes.func.isRequired,
};
