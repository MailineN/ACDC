import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Main from '../../shared/layout/Main';
import EventForm from './CollectionEventForm';

const CreateCollectionEvent = () => {
  const { t } = useTranslation(['collectionEventForm']);
  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Typography variant="h2" fontWeight="xl">
        {t('title')}
      </Typography>
      <Typography variant="subtitle1">{t('description')}</Typography>
      <EventForm />
    </Main>
  );
};

export default CreateCollectionEvent;
