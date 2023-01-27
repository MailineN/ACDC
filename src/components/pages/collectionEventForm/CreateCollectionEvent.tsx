import { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Main from '../../shared/layout/Main';
import EventForm from './CollectionEventForm';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import { getDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import { useParams } from 'react-router-dom';

const CreateCollectionEvent = () => {
  const { t } = useTranslation(['collectionEventForm']);
  const id = useParams<string>();
  const [dataCollection, setDataCollection] = useState<DataCollectionApi>();
  useEffect(() => {
    getDataCollection(id).then((r) => setDataCollection(r));
  }, []);
  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Typography variant="h2" fontWeight="xl">
        {t('title')}
      </Typography>
      <Typography variant="subtitle1">{t('description')}</Typography>
      <EventForm DataCollectionApi={dataCollection} />
    </Main>
  );
};

export default CreateCollectionEvent;
