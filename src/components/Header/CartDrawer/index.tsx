import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Tooltip, Button, Grid } from '@material-ui/core';
import { headerHeight } from '../index';
import { useShoppingCart } from 'use-shopping-cart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = '350px';

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  gridContainer: {
    marginTop: headerHeight,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  productMetaData: {
    textAlign: 'center',
  },
  quantityButtonDiv: {
    justifyContent: 'center',
    display: 'flex',
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

  const {
    redirectToCheckout,
    cartCount,
    clearCart,
    cartDetails,
    formattedTotalPrice,
    incrementItem,
    decrementItem,
    removeItem,
  } = useShoppingCart();

  console.log(cartDetails);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={isDrawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item>
          <Tooltip title="Close Cart">
            <IconButton onClick={(): void => setIsDrawerOpen(false)}>
              <ChevronRightIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item container>
          {Object.keys(cartDetails).map((key, index) => {
            const entry = cartDetails[key];
            return (
              <Grid
                item
                key={index}
                style={{
                  width: '100%',
                  borderBottom: '2px solid black',
                  marginTop: '5px',
                }}
              >
                <p
                  className={classes.productMetaData}
                >{`Name: ${entry.name}`}</p>
                <div className={classes.quantityButtonDiv}>
                  <img style={{ width: '125px' }} src={entry.image} />
                </div>
                <p
                  className={classes.productMetaData}
                >{`Description: ${entry.description}`}</p>
                <p
                  className={classes.productMetaData}
                >{`Quantity: ${entry.quantity}`}</p>
                <div className={classes.quantityButtonDiv}>
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
                </div>
                <p
                  className={classes.productMetaData}
                >{`Total Price: ${entry.formattedValue}`}</p>
              </Grid>
            );
          })}
        </Grid>
        <Grid item style={{ marginTop: '20px' }}>
          <p
            className={classes.productMetaData}
          >{`Total Price: ${formattedTotalPrice}`}</p>
        </Grid>
        <Grid
          item
          style={{ borderBottom: '2px solid black', marginBottom: '20px' }}
        >
          <p
            className={classes.productMetaData}
          >{`Cart Count: ${cartCount}`}</p>
        </Grid>
        <Grid item className={classes.buttonContainer}>
          <Button onClick={clearCart} color="primary" variant="contained">
            Clear Cart
          </Button>
        </Grid>
        <Grid item className={classes.buttonContainer}>
          <Button
            onClick={() => redirectToCheckout()}
            color="primary"
            variant="contained"
            disabled={cartCount === 0}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  );
};

CartDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  setIsDrawerOpen: PropTypes.func.isRequired,
};
