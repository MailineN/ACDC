import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import Main from '../../shared/layout/Main';
import DataGridHomePage from './DataTable';
import { dataCollectionApiMock } from '../../../lib/api/mock/dataCollectionApiMock';
import DataCollection from '../../../lib/model/dataCollection';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import { getDataCollectionRows } from '../../../lib/api/remote/dataCollectionApi';
import { da } from 'date-fns/locale';
const Home = () => {
  const { t } = useTranslation(['home']);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/new');
  };

  const getRows = async () => {
    const rows: any[] = [];
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL + 'api/data-collections'
    );
    return response.json();
  };

  const { data, error, isLoading, isSuccess } = useQuery(
    ['allDataCollection'],
    getRows
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
    const rows: any[] = [];
    data.forEach((dataCollectionApi: DataCollectionApi) => {
      const dataCollection: DataCollection = dataCollectionApi.json;
      rows.push({
        id: dataCollection.id,
        label: dataCollection.label,
        version: dataCollection.version,
        versionDate: dataCollection.versionDate,
        action: dataCollection,
      });
      console.log('Retrieved rows data : ', rows);
    });
    return (
      <Main>
        <Typography variant="h2" fontWeight="xl">
          {t('title')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="xl">
          {t('description')}
        </Typography>
        <DataGridHomePage rows={rows} heightTable={400} />
        {/* <DataGridHomePage rows={data} heightTable={400} /> */}
        <Button variant="contained" sx={{ marginTop: 3 }} onClick={handleClick}>
          <Typography variant="subtitle1">{t('createButton')}</Typography>
        </Button>
      </Main>
    );
  }

  //TODO: Responsive table height
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
