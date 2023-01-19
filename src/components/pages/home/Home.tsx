import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Main from '../../shared/layout/Main';
const Home = () => {
  const [count, setCount] = useState(0);
  const { t, i18n } = useTranslation(['home']);
  return (
    <Main>
      <div className="App">
        <Typography variant="h2" fontWeight="xl">
          {t('title')}
        </Typography>
        <div className="card">
          <Typography variant="subtitle1" fontWeight="xl">
            {t('description')}
          </Typography>
        </div>
      </div>
    </Main>
  );
};

export default Home;
