import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Main from '../../shared/layout/Main';
import CollectionForm from './CollectionForm';
const DataCollectionForm = () => {
  const { t } = useTranslation(['dataCollectionForm']);
  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Typography variant="h2" fontWeight="xl">
        {t('title')}
      </Typography>
      <Typography variant="subtitle1">{t('description')}</Typography>
      <CollectionForm />
    </Main>
  );
};

export default DataCollectionForm;
