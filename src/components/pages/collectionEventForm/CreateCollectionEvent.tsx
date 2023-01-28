import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Main from '../../shared/layout/Main';
import EventForm from './CollectionEventForm';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import { DataCollection } from '../../../lib/model/dataCollection';

const CreateCollectionEvent = () => {
  const { t } = useTranslation(['collectionEventForm']);
  const dataCollection = useLocation().state.dataCollection as DataCollection;
  console.log('Create New collection  for dataCollection:', dataCollection);
  const dataCollectionApi: DataCollectionApi = {
    id: dataCollection.id,
    json: dataCollection,
  };
  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Typography variant="h2" fontWeight="xl">
        {t('title')}
      </Typography>
      <Typography variant="subtitle1">
        {t('description') + dataCollection.id}
      </Typography>
      <EventForm DataCollectionApi={dataCollectionApi} />
    </Main>
  );
};

export default CreateCollectionEvent;
