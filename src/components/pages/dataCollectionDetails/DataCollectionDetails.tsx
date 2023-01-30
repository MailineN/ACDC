import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import Main from '../../shared/layout/Main';
import { DataCollection } from '../../../lib/model/dataCollection';
import DataCollectionDetailsDialog from './DataCollectionDetailsDialog';
import CollectionEventDisplay from './CollectionEvent';
import BottomActionBar from './BottomActionBar';

const DataCollectionDetails = () => {
  const { t, i18n } = useTranslation(['dataCollectionDetails']);
  const dataCollection = useLocation().state.dataCollection as DataCollection;
  console.log('Data Collection Details Page:', dataCollection);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="h6" fontWeight="xl">
          {t('title') + dataCollection.label[i18n.language]}
        </Typography>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{ marginLeft: 2 }}
        >
          <Typography variant="body1" fontWeight="xl">
            {t('showDetails')}
          </Typography>
        </Button>
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          sx={{ marginLeft: 2 }}
        >
          <Typography variant="body1" fontWeight="xl">
            {t('delete')}
          </Typography>
        </Button>
      </Box>

      <DataCollectionDetailsDialog
        open={open}
        handleClose={handleClose}
        dataCollection={dataCollection}
      />
      <Box>
        {dataCollection.collectionEvents.map((event) => {
          return (
            <CollectionEventDisplay key={event.id} collectionEvent={event} />
          );
        })}
      </Box>

      <BottomActionBar dataCollection={dataCollection} />
    </Main>
  );
};

export default DataCollectionDetails;
