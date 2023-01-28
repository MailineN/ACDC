import { useState } from 'react';
import { IconButton, Typography, Menu, MenuItem, Link } from '@mui/material';
import { FiFlag } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import HeaderComponent from '../layout/Header';

const Header = () => {
  const { t, i18n } = useTranslation(['header']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChange = (event: any, lg: string) => {
    console.log('Select Language: ', lg);
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
        <Link href="/" underline="none" color="inherit">
          {t('app_title')}
        </Link>
      </Typography>
      <IconButton
        id="flag-button"
        aria-controls={open ? 'select-language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ mr: 2 }}
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
        <MenuItem
          value="fr-FR
"
          onClick={(event) => handleChange(event, 'fr-FR')}
        >
          🇫🇷
        </MenuItem>
        <MenuItem
          value="en-IE"
          onClick={(event) => handleChange(event, 'en-IE')}
        >
          🇬🇧
        </MenuItem>
      </Menu>
    </HeaderComponent>
  );
};

export default Header;
