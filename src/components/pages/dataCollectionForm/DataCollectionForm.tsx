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

  const addLanguageLabel = () => {
    const lastLabelId = labelArray[labelArray.length - 1].id;
    return setLabelArray([
      ...labelArray,
      {
        id: lastLabelId + 1,
        language: 'en-IE',
        value: '',
      },
    ]);
  };
  const handleLabelChange = (e: any) => {
    e.preventDefault();
    const index = e.target.id;
    setLabelArray((s) => {
      const newLabel = s.slice();
      newLabel[index].value = e.target.value;
      return newLabel;
    });
  };

  const handleLabelLanguageChange = (e: any, index: number) => {
    e.preventDefault();
    setLabelArray((s) => {
      const newLabel = s.slice();
      newLabel[index].language = e.target.value;
      return newLabel;
    });
  };

  const addLanguageDescription = () => {
    const lastDescriptionId = descriptionArray[descriptionArray.length - 1].id;
    return setDescriptionArray([
      ...descriptionArray,
      {
        id: lastDescriptionId + 1,
        language: 'en-IE',
        value: '',
      },
    ]);
  };

  const handleDescriptionChange = (e: any, index: number) => {
    e.preventDefault();
    setDescriptionArray((s) => {
      const newDescription = s.slice();
      newDescription[index].value = e.target.value;
      return newDescription;
    });
  };

  const handleDescriptionLanguageChange = (e: any) => {
    e.preventDefault();
    const index = e.target.id;
    setDescriptionArray((s) => {
      const newDescription = s.slice();
      newDescription[index].language = e.target.value;
      return newDescription;
    });
  };
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
          {labelArray.map((label, index) => {
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

          {descriptionArray.map((description, index) => {
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
