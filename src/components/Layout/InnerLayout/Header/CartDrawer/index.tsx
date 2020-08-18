import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Tooltip, Button, Grid } from '@material-ui/core';
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

const FixedWidthDrawer = styled(Drawer)`
  width: ${drawerWidth};
  flex-shrink: 0;
`;

const HeaderContainer = styled(Grid)`
  margin-top: ${headerHeight};
`;

const CartItemContainer = styled(Grid)`
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

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
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

  console.log(cartCount);

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
    <div>
      {isLoading && (
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress />
        </Backdrop>
      )}
      <CartItemContainer item style={isLoading ? { display: 'none' } : {}}>
        <ProductMetadata>{entry.name}</ProductMetadata>
        <CenteredDiv>
          <img
            style={{ width: '125px' }}
            src={entry.image}
            onLoad={() => setIsLoading(false)}
          />
        </CenteredDiv>
        <ProductMetadata>{`Description: ${entry.description}`}</ProductMetadata>
        <ProductMetadata>{`Quantity: ${entry.quantity}`}</ProductMetadata>
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
        <ProductMetadata>{`Unit Price: ${entry.formattedValue}`}</ProductMetadata>
      </CartItemContainer>
    </div>
  );
};

CartItem.propTypes = {
  entry: PropTypes.any.isRequired,
  keyProp: PropTypes.string.isRequired,
  incrementItem: PropTypes.func.isRequired,
  decrementItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};
