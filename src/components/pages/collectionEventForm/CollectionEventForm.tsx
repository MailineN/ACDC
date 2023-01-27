/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
  const { t } = useTranslation(['collectionEventForm']);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [modeCollection, setModeCollection] = useState([
    {
      id: 1,
      type: 'CAPI',
    },
  ]);
  const [label, setLabel] = useState([
    {
      id: 1,
      language: 'en-IE',
      value: '',
    },
  ]);
  const [description, setDescription] = useState([
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

  const addLanguageLabel = () => {
    const lastLabelId = label[label.length - 1].id;
    return setLabel([
      ...label,
      {
        id: lastLabelId + 1,
        language: 'en',
        value: '',
      },
    ]);
  };
  const handleLabelChange = (e: any) => {
    e.preventDefault();
    const index = e.target.id;
    setLabel((s) => {
      const newLabel = s.slice();
      newLabel[index].value = e.target.value;
      return newLabel;
    });
  };

  const handleLabelLanguageChange = (e: any, index: number) => {
    e.preventDefault();
    setLabel((s) => {
      const newLabel = s.slice();
      newLabel[index].language = e.target.value;
      return newLabel;
    });
  };

  const addLanguageDescription = () => {
    const lastDescriptionId = description[description.length - 1].id;
    return setDescription([
      ...description,
      {
        id: lastDescriptionId + 1,
        language: 'en',
        value: '',
      },
    ]);
  };

  const handleDescriptionChange = (e: any, index: number) => {
    e.preventDefault();
    setDescription((s) => {
      const newDescription = s.slice();
      newDescription[index].value = e.target.value;
      return newDescription;
    });
  };

  const handleDescriptionLanguageChange = (e: any) => {
    e.preventDefault();
    const index = e.target.id;
    setDescription((s) => {
      const newDescription = s.slice();
      newDescription[index].language = e.target.value;
      return newDescription;
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

    const dates: Map<string, string> = new Map();
    dates.set('startDate', formatISO(startDate) || '');
    dates.set('endDate', formatISO(endDate) || '');
    const data: CollectionEvent = {
      id: uuidv4(),
      agency: 'fr.insee',
      version: 1,
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

    console.log('Data: ', data);

    updateDataCollection(updatedDataCollection);

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
            <Typography variant="h6">{t('label')}:</Typography>
          </Box>
          {label.map((label, index) => {
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
                key={label.id}
              >
                <TextField
                  required
                  size="small"
                  label={t('label')}
                  value={label.value}
                  sx={{ marginRight: 2, width: '100%' }}
                  onChange={handleLabelChange}
                  id={index.toString()}
                />
                <Select
                  color="primary"
                  value={label.language}
                  onChange={(e) => handleLabelLanguageChange(e, index)}
                  id={index.toString()}
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                  notched={true}
                >
                  <MenuItem value="fr-FR">🇫🇷</MenuItem>
                  <MenuItem value="en-IE">🇬🇧</MenuItem>
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
            <Button variant="outlined" size="small" onClick={addLanguageLabel}>
              <Typography>{t('addLanguage')}</Typography>
            </Button>
          </Box>

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

          {description.map((description, index) => {
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}
                key={description.id}
              >
                <TextField
                  required
                  multiline
                  rows={3}
                  label={t('descriptionField')}
                  value={description.value}
                  sx={{ marginRight: 2, width: '100%' }}
                  onChange={(e) => handleDescriptionChange(e, index)}
                />
                <Select
                  color="primary"
                  value={description.language}
                  onChange={handleDescriptionLanguageChange}
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                  notched={true}
                >
                  <MenuItem value="fr-FR">🇫🇷</MenuItem>
                  <MenuItem value="en-IE">🇬🇧</MenuItem>
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
            <Button
              variant="outlined"
              size="small"
              onClick={addLanguageDescription}
            >
              <Typography>{t('addLanguage')}</Typography>
            </Button>
          </Box>

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
                  labelId="select-program"
                  label={t('statistical_program')}
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

export default EventForm;
