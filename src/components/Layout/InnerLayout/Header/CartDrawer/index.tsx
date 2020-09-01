import React, { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Tooltip, Button, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import { headerHeight } from '../../constants';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import {
  useShoppingCart,
  formatCurrencyString,
  CartEntry,
} from 'use-shopping-cart';

const drawerWidth = '350px';
const borderBottom = `2px solid #03a9f4`;

const FixedWidthDrawer = styled(Drawer)`
  width: ${drawerWidth};
  flex-shrink: 0;
`;

const HeaderContainer = styled(Grid)`
  margin-top: ${headerHeight};
  border-bottom: ${borderBottom};
  align-items: center;
`;

const TotalPrice = styled(Typography)`
  margin-left: 48px;
  font-weight: bold;
`;

const CartItemContainer = styled(Grid)`
  width: 100%;
  border-bottom: ${borderBottom};
`;

const ButtonContainer = styled(Grid)`
  min-height: 150px;
  align-items: center;
  justify-content: center;
`;

const ClearCartButton = styled(Button)`
  width: 100%;
  margin-bottom: 5px;
`;

const CheckoutButton = styled(Button)`
  width: 100%;
  margin-top: 5px;
`;

const ProductMetadata = styled(Typography)`
  text-align: center;
  margin-bottom: 5px;
`;

const Description = styled(Typography)`
  text-align: center;
  margin: 10px;
`;

const CenteredDiv = styled.div`
  justify-content: center;
  display: flex;
`;

const CartItemImage = styled.img`
  width: 125px;
`;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

interface CartDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (state: boolean) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const classes = useStyles();
  const shoppingCart = useShoppingCart();
  const [currentCartCount, setCurrentCartCount] = useState(0);

  const {
    redirectToCheckout,
    clearCart,
    cartDetails,
    incrementItem,
    decrementItem,
    totalPrice,
    removeItem,
  } = shoppingCart;

  useEffect(() => {
    setCurrentCartCount(shoppingCart.cartCount);
  }, [shoppingCart.cartCount]);

  return (
    <FixedWidthDrawer
      variant="persistent"
      anchor="right"
      open={isDrawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <HeaderContainer container>
        <Tooltip title="Close Cart">
          <IconButton onClick={(): void => setIsDrawerOpen(false)}>
            <ChevronRightIcon color="primary" />
          </IconButton>
        </Tooltip>
        <TotalPrice>
          {`Order Total: ${formatCurrencyString({
            value: totalPrice,
            currency: 'USD',
          })}`}
        </TotalPrice>
      </HeaderContainer>
      <Grid container>
        {Object.keys(cartDetails).map((key, index) => (
          <CartItem
            key={key}
            entry={cartDetails[key]}
            index={index}
            keyProp={key}
            incrementItem={incrementItem}
            decrementItem={decrementItem}
            removeItem={removeItem}
          />
        ))}
      </Grid>
      <ButtonContainer container direction="column">
        <div>
          <ClearCartButton
            onClick={() => clearCart()}
            color="primary"
            variant="contained"
          >
            Clear Cart
          </ClearCartButton>
          <CheckoutButton
            onClick={() => redirectToCheckout()}
            color="primary"
            variant="contained"
            disabled={currentCartCount === 0}
          >
            Checkout
          </CheckoutButton>
        </div>
      </ButtonContainer>
    </FixedWidthDrawer>
  );
};

CartDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  setIsDrawerOpen: PropTypes.func.isRequired,
};

interface CartItemProps {
  index: number;
  entry: CartEntry;
  keyProp: string;
  incrementItem: (sku: string) => void;
  decrementItem: (sku: string) => void;
  removeItem: (sku: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  entry,
  keyProp,
  incrementItem,
  decrementItem,
  removeItem,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  return (
    <>
      {isLoading && (
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress />
        </Backdrop>
      )}
      <CartItemContainer item style={isLoading ? { display: 'none' } : {}}>
        <ProductMetadata style={{ margin: '5px' }}>
          {entry.name}
        </ProductMetadata>
        <CenteredDiv>
          <CartItemImage src={entry.image} onLoad={() => setIsLoading(false)} />
        </CenteredDiv>
        <CenteredDiv>
          <Tooltip title="Increment Quantity">
            <IconButton onClick={() => incrementItem(keyProp)}>
              <AddIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Decrement Quantity">
            <IconButton onClick={() => decrementItem(keyProp)}>
              <RemoveIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove All">
            <IconButton onClick={() => removeItem(keyProp)}>
              <CloseIcon color="primary" />
            </IconButton>
          </Tooltip>
        </CenteredDiv>
        <ProductMetadata>{`Quantity: ${entry.quantity}`}</ProductMetadata>
        <Description>{`Description: ${entry.description}`}</Description>
        <ProductMetadata>{`Unit Price: ${entry.formattedValue}`}</ProductMetadata>
      </CartItemContainer>
    </>
  );
};

CartItem.propTypes = {
  entry: PropTypes.any.isRequired,
  keyProp: PropTypes.string.isRequired,
  incrementItem: PropTypes.func.isRequired,
  decrementItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};
