import React from 'react';
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
  const { open, handleClose, dataCollection } = props;
  return (
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
        <Button variant="contained" onClick={handleClose} autoFocus>
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataCollectionDetailsDialog;
