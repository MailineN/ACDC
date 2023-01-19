import { useState } from 'react';
import { Box, IconButton, Typography, Menu, MenuItem } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import { Flag } from '@mui/icons-material';
import HeaderComponent from '../layout/Header';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <HeaderComponent>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Typography component="h1" fontWeight="xl">
          ACDC Homepage
        </Typography>
        <IconButton
          variant="outlined"
          size="sm"
          onClick={handleClick}
          //sx={{ display: { sm: 'none' } }}
        >
          <Flag />
        </IconButton>
        <Menu
          id="lang-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Français 🇫🇷</MenuItem>
          <MenuItem onClick={handleClose}>English 🇬🇧</MenuItem>
        </Menu>
      </Box>
    </HeaderComponent>
  );
};

export default Header;
