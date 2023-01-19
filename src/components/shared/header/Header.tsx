import { useState } from 'react';
import { Box, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { FiFlag } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import HeaderComponent from '../layout/Header';

const Header = () => {
  const { t, i18n } = useTranslation(['header']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChange = (event: any, lg: string) => {
    console.log('Select Language: ' + lg);
    i18n.changeLanguage(lg);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <HeaderComponent>
      <Typography variant="h5" fontWeight="xl">
        {t('app_title')}
      </Typography>
      <IconButton
        id="flag-button"
        aria-controls={open ? 'select-language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FiFlag />
      </IconButton>
      <Menu
        id="select-language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        <MenuItem value="fr" onClick={(event) => handleChange(event, 'fr')}>
          🇫🇷
        </MenuItem>
        <MenuItem value="en" onClick={(event) => handleChange(event, 'en')}>
          🇬🇧
        </MenuItem>
      </Menu>
    </HeaderComponent>
  );
};

export default Header;
