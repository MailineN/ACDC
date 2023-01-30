import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Main from '../../shared/layout/Main';
import { DataCollection } from '../../../lib/model/dataCollection';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import DataCollectionDetailsDialog from './DataCollectionDetailsDialog';
import CollectionEventDisplay from './CollectionEvent';
import BottomActionBar from './BottomActionBar';
import { updateDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';

const DataCollectionDetails = () => {
  const { t, i18n } = useTranslation(['dataCollectionDetails']);
  const navigate = useNavigate();
  const dataCollection = useLocation().state.dataCollection as DataCollection;
  console.log('Data Collection Details Page:', dataCollection);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { isLoading, isError, isSuccess, mutate } =
    useMutation(updateDataCollection);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteCollectionEvent = (id: string) => {
    console.log('Delete Collection Event: ', id);
    const updatedCollectionEvents = dataCollection.collectionEvents.filter(
      (event) => event.id !== id
    );
    dataCollection.collectionEvents = updatedCollectionEvents;
    const updatedDataCollection: DataCollectionApi = {
      id: dataCollection?.id,
      json: dataCollection,
    };
    console.log(
      'Updated Data Collection deleting Collection Event: ',
      updatedDataCollection
    );
    mutate(updatedDataCollection);
    setOpenDelete(true);
  };

  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontWeight="xl">
          {dataCollection.label[i18n.language]}
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
      </Box>

      <DataCollectionDetailsDialog
        open={open}
        handleClose={handleClose}
        dataCollection={dataCollection}
      />
      <Box>
        {dataCollection.collectionEvents.map((event) => {
          return (
            <CollectionEventDisplay
              key={event.id}
              collectionEvent={event}
              handleDeleteCollectionEvent={handleDeleteCollectionEvent}
            />
          );
        })}
      </Box>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>
          <Typography variant="h5">{t('deleteCollectionEvent')}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isSuccess ? t('successEvent') : ''}
            {isLoading ? t('loading') : ''}
            {isError ? t('error') : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDelete} autoFocus>
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
      <BottomActionBar dataCollection={dataCollection} />
    </Main>
  );
};

export default DataCollectionDetails;
