import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Main from '../../shared/layout/Main';
import { useParams } from 'react-router-dom';

const DataCollectionDetails = () => {
  const { t } = useTranslation(['dataCollectionDetails']);
  const id = useParams<string>();
  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Typography variant="h5" fontWeight="xl">
        {t('title') + id}
      </Typography>
    </Main>
  );
};

export default DataCollectionDetails;
