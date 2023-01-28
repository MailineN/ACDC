/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Typography,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Stack,
  TextField,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DataCollection } from '../../../lib/model/dataCollection';
import { createDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import IntlTextInput from '../../shared/intlTextInput/IntlTextInput';

const CollectionForm = () => {
  const { t } = useTranslation(['dataCollectionForm']);
  const navigate = useNavigate();
  const [labelArray, setLabelArray] = useState([
    {
      id: 1,
      language: 'en-IE',
      value: '',
    },
  ]);
  const [descriptionArray, setDescriptionArray] = useState([
    {
      id: 1,
      language: 'en-IE',
      value: '',
    },
  ]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const now = Date.now();
    const today = new Date(now);
    const id = uuidv4();
    let label: Record<'fr-FR' | 'en-IE' | string, string> = labelArray.reduce(
      function (map: Record<'fr-FR' | 'en-IE' | string, string>, obj) {
        map[obj.language] = obj.value;
        return map;
      },
      {}
    );
    let description: Record<'fr-FR' | 'en-IE' | string, string> =
      descriptionArray.reduce(function (
        map: Record<'fr-FR' | 'en-IE' | string, string>,
        obj
      ) {
        map[obj.language] = obj.value;
        return map;
      },
      {});

    const data: DataCollection = {
      id: id,
      agency: 'fr.insee',
      version: 1,
      versionDate: today.toISOString(),
      label: label,
      description: description,
      collectionEvents: [],
    };

    const dataCollection: DataCollectionApi = {
      id: id,
      json: data,
    };
    createDataCollection(dataCollection);
    handleClickOpen();
  };

  return (
    <>
      <FormControl size="small" fullWidth sx={{ marginTop: 3 }}>
        <Stack spacing={2}>
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              paddingTop: 2,
            }}
          >
            <Typography variant="h6">{t('label')}:</Typography>
          </Box>
          <IntlTextInput textArray={labelArray} setTextArray={setLabelArray} />
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              paddingTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">{t('descriptionField')}:</Typography>
          </Box>

          <IntlTextInput
            textArray={descriptionArray}
            setTextArray={setDescriptionArray}
          />
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              paddingTop: 2,
              borderColor: 'divider',
            }}
          >
            <Button
              variant="outlined"
              sx={{ marginRight: 2 }}
              onClick={handleClose}
            >
              <Typography variant="subtitle1">{t('cancel')}</Typography>
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              <Typography variant="subtitle1">{t('submit')}</Typography>
            </Button>
          </Box>
        </Stack>
      </FormControl>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>{t('submitmessage')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} autoFocus>
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CollectionForm;
