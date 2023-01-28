/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { DatePicker } from '@mui/x-date-pickers';
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
  DialogTitle,
} from '@mui/material';
import IntlTextInput from '../../shared/intlTextInput/IntlTextInput';
import CollectionEvent from '../../../lib/model/collectionEvents';
import TypeOfModeOfCollection from '../../../lib/model/typeOfModeOfCollection';
import InstrumentReference from '../../../lib/model/instrumentReference';
import { formatISO } from 'date-fns';
import { updateDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';

interface DataCollectionProps {
  DataCollectionApi?: DataCollectionApi;
}
const EventForm = (props: DataCollectionProps) => {
  //TODO: Refactor tout ça pour que ce soit plus propre
  const { t } = useTranslation(['collectionEventForm']);
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, error, mutate } =
    useMutation(updateDataCollection);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [modeCollection, setModeCollection] = useState([
    {
      id: 1,
      type: 'CAPI',
    },
  ]);
  const [collectionEventNameArray, setCollectionEventNameArray] = useState([
    {
      id: 1,
      language: 'en-IE',
      value: '',
    },
  ]);
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

  const addModeCollection = () => {
    const lastModeCollectionId = modeCollection[modeCollection.length - 1].id;
    return setModeCollection([
      ...modeCollection,
      {
        id: lastModeCollectionId + 1,
        type: 'CAPI',
      },
    ]);
  };

  const handleModeCollectionChange = (e: any, index: number) => {
    e.preventDefault();
    setModeCollection((s) => {
      const newLabel = s.slice();
      newLabel[index].type = e.target.value;
      return newLabel;
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
    console.log('Start date: ', startDate);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const instrument: InstrumentReference = {
      id: '493f8b38-1198-4e45-99d2-531ac8a48a48',
      agency: 'fr.insee',
      version: 1,
      typeOfObject: 'Instrument',
    };

    const modeOfCollection: TypeOfModeOfCollection[] = [];
    modeCollection.forEach((mode) => {
      modeOfCollection.push({
        type: mode.type,
      });
    });
    let collectionEventName: Record<'fr-FR' | 'en-IE' | string, string> =
      collectionEventNameArray.reduce(function (
        map: Record<'fr-FR' | 'en-IE' | string, string>,
        obj
      ) {
        map[obj.language] = obj.value;
        return map;
      },
      {});
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

    const dates: Map<string, string> = new Map();
    dates.set('startDate', formatISO(startDate) || '');
    dates.set('endDate', formatISO(endDate) || '');
    const data: CollectionEvent = {
      id: uuidv4(),
      agency: 'fr.insee',
      version: 1,
      collectionEventName: collectionEventName,
      label: label,
      description: description,
      instrumentReference: instrument,
      typeOfModeOfCollection: modeOfCollection,
      dataCollectionDate: dates,
    };
    props.DataCollectionApi?.json.collectionEvents.push(data);

    const updatedDataCollection: DataCollectionApi = {
      id: props.DataCollectionApi?.id,
      json: props.DataCollectionApi.json,
    };

    console.log(
      'Updated Data Collection with new Collection Event: ',
      updatedDataCollection
    );

    mutate(updatedDataCollection);

    handleClickOpen();
  };

  return (
    <>
      <FormControl size="small" fullWidth sx={{ marginTop: 3 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Typography variant="h6">{t('name')}:</Typography>
          </Box>
          <IntlTextInput
            textArray={collectionEventNameArray}
            setTextArray={setCollectionEventNameArray}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">{t('label')}:</Typography>
          </Box>
          <IntlTextInput textArray={labelArray} setTextArray={setLabelArray} />
          <Box
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
            sx={{
              paddingTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">{t('dataCollectionDate')}:</Typography>
          </Box>
          <Stack spacing={2} direction="row">
            <DatePicker
              label={t('collectionStartDate')}
              value={startDate}
              onChange={(date) => date && setStartDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label={t('collectionEndDate')}
              value={endDate}
              minDate={startDate}
              onChange={(date) => date && setEndDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>

          <Box
            sx={{
              paddingTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">{t('modeOfCollection')}:</Typography>
          </Box>

          {modeCollection.map((mode, index) => {
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}
                key={mode.id}
              >
                <Select
                  color="primary"
                  labelId="select-mode-collection"
                  label={t('modeOfCollection')}
                  displayEmpty
                  value={mode.type}
                  onChange={(e) => handleModeCollectionChange(e, index)}
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                  notched={true}
                >
                  <MenuItem value={'CAPI'}>CAPI</MenuItem>
                  <MenuItem value={'CATI'}>CATI</MenuItem>
                  <MenuItem value={'CAWI'}>CAWI</MenuItem>
                  <MenuItem value={'PAPI'}>PAPI</MenuItem>
                </Select>
              </Box>
            );
          })}

          <Box
            component="form"
            className="CollectionForm"
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Button variant="outlined" size="small" onClick={addModeCollection}>
              <Typography>{t('addModeCollection')}</Typography>
            </Button>
          </Box>

          <Box
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
        <DialogTitle>
          <Typography variant="h5">{t('submitmessage')}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isSuccess ? t('success') : ''}
            {isLoading ? t('loading') : ''}
            {isError ? t('error') : ''}
          </DialogContentText>
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

export default EventForm;
