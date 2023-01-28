import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import Main from '../../shared/layout/Main';
import { Typography, Button } from '@mui/material';
import { DataCollection } from '../../../lib/model/dataCollection';

const DataCollectionDetails = () => {
  const { t } = useTranslation(['dataCollectionDetails']);
  const navigate = useNavigate();
  const dataCollection = useLocation().state.dataCollection as DataCollection;
  console.log('Data Collection Details Page:', dataCollection);

  const handleClick = () => {
    navigate(`/collection/new/${dataCollection.id}`, {
      state: { dataCollection: dataCollection },
    });
  };

  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Typography variant="h5" fontWeight="xl">
        {t('title') + dataCollection.id}
      </Typography>
      <Button variant="contained" sx={{ marginTop: 3 }} onClick={handleClick}>
        <Typography variant="subtitle1">{t('createButton')}</Typography>
      </Button>
    </Main>
  );
};

export default DataCollectionDetails;
