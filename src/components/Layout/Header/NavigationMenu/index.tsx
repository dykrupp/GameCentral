import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { navigate } from 'gatsby';

const MenuImage = styled(MenuIcon)`
  fill: white;
`;

export const NavigationMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MenuImage />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/products');
          }}
        >
          PS4
        </MenuItem>
        <MenuItem onClick={handleClose}>Xbox One</MenuItem>
        <MenuItem onClick={handleClose}>Nintendo Switch</MenuItem>
        <MenuItem onClick={handleClose}>PC Gaming</MenuItem>
        <MenuItem onClick={handleClose}>Virtual Reality</MenuItem>
      </Menu>
    </div>
  );
};
