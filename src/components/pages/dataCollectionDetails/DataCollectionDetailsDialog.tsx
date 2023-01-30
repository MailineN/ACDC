import React, { useState } from 'react';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import { DataCollection } from '../../../lib/model/dataCollection';

interface DataCollectionDetailsDialogProps {
  open: boolean;
  handleClose: () => void;
  dataCollection: DataCollection;
}
const DataCollectionDetailsDialog = (
  props: DataCollectionDetailsDialogProps
) => {
  const { t, i18n } = useTranslation(['dataCollectionDetails']);
  const navigate = useNavigate();
  const { open, handleClose, dataCollection } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const { isLoading, isError, isSuccess, mutate } =
    useMutation(deleteDataCollection);

  const handleCloseDelete = () => {
    setOpenDelete(false);
    navigate('/');
  };
  const handleDelete = (id: string) => {
    console.log(`Delete data collection with id: ${id}`);
    mutate(id);
    setOpenDelete(true);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Typography variant="h5" color="text.secondary">
            {t('dataCollectionDetails')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            (Editable ?)
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                ID:{' '}
              </Typography>
              <Typography variant="body1">{dataCollection.id}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('label')}:{' '}
              </Typography>
              <Typography variant="body1">
                {dataCollection.label[i18n.language]}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                {t('description')}:{' '}
              </Typography>
              <Typography variant="body1">
                {dataCollection.description[i18n.language]}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('version')}:{' '}
              </Typography>
              <Typography variant="body1">{dataCollection.version}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('lastUpdate')}:{' '}
              </Typography>
              <Typography variant="body1">
                {dataCollection.versionDate}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDelete(dataCollection.id);
            }}
            variant="outlined"
            sx={{ marginLeft: 2 }}
          >
            <Typography variant="body1" fontWeight="xl">
              {t('delete')}
            </Typography>
          </Button>
          <Button variant="contained" onClick={handleClose} autoFocus>
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
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
    </>
  );
};

export default DataCollectionDetailsDialog;
