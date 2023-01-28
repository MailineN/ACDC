import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import Main from '../../shared/layout/Main';
import DataGridHomePage from './DataTable';
import {
  DataCollection,
  DataCollectionRow,
} from '../../../lib/model/dataCollection';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import { getAllDataCollections } from '../../../lib/api/remote/dataCollectionApiFetch';

const Home = () => {
  const { t, i18n } = useTranslation(['home']);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/new');
  };

  const { data, error, isLoading, isSuccess } = useQuery(
    ['allDataCollection'],
    getAllDataCollections
  );

  if (error)
    return (
      <Typography variant="h2" fontWeight="xl">
        Request Failed
      </Typography>
    );
  if (isLoading)
    return (
      <Main>
        <Typography variant="h2" fontWeight="xl">
          {t('title')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="xl">
          {t('description')}
        </Typography>
        <Typography variant="h2" fontWeight="xl">
          Loading...
        </Typography>
        <Button variant="contained" sx={{ marginTop: 3 }} onClick={handleClick}>
          <Typography variant="subtitle1">{t('createButton')}</Typography>
        </Button>
      </Main>
    );

  if (isSuccess) {
    const rows: DataCollectionRow[] = [];
    data.forEach((dataCollectionApi: DataCollectionApi) => {
      const dataCollection: DataCollection = dataCollectionApi.json;
      const labelData = () => {
        switch (i18n.language) {
          case 'fr-FR':
            return dataCollection.label['fr-FR'];
          case 'en-IE':
            return dataCollection.label['en-IE'];
          default:
            return dataCollection.label['en-IE'];
        }
      };
      rows.push({
        ...dataCollection,
        label: labelData(),

        action: dataCollection,
      });
    });
    console.log('Get all data collection: ', rows);
    return (
      <Main>
        <Typography variant="h2" fontWeight="xl">
          {t('title')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="xl">
          {t('description')}
        </Typography>
        <DataGridHomePage rows={rows} heightTable={400} />
        <Button variant="contained" sx={{ marginTop: 3 }} onClick={handleClick}>
          <Typography variant="subtitle1">{t('createButton')}</Typography>
        </Button>
      </Main>
    );
  }

  // TODO: Responsive table height
  return (
    <Main>
      <Typography variant="h2" fontWeight="xl">
        {t('title')}
      </Typography>
      <Typography variant="subtitle1" fontWeight="xl">
        {t('description')}
      </Typography>
      <Typography variant="h2" fontWeight="xl">
        Request Failed
      </Typography>
      <Button variant="contained" sx={{ marginTop: 3 }} onClick={handleClick}>
        <Typography variant="subtitle1">{t('createButton')}</Typography>
      </Button>
    </Main>
  );
};

export default Home;
