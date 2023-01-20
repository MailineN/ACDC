/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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
  SelectChangeEvent,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const CollectionForm = () => {
  const { t } = useTranslation(['dataCollectionForm']);
  const navigate = useNavigate();

  const [lgLabel, setLgLabel] = useState(1);
  const [firstLanguage, setFirstLanguage] = useState('en');
  const [lgDescription, setLgDescription] = useState(1);
  const [statisticalProgram, setStatisticalProgram] = useState('EEC');
  const [statisticalProgramError, setStatisticalProgramError] = useState('');
  const [statisticalCycle, setStatisticalCycle] = useState('2023');
  const [statisticalCycleError, setStatisticalCycleError] = useState('');
  const [label, setLabel] = useState('');
  const [labelError, setLabelError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [open, setOpen] = useState(false);

  const handleChangeProgram = (event: SelectChangeEvent<string>) => {
    setStatisticalProgram(event.target.value);
  };

  const handleChangeCycle = (event: SelectChangeEvent<string>) => {
    setStatisticalCycle(event.target.value);
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
    handleClickOpen();
  };

  const addLanguageLabel = (event: any, lg: string) => {
    console.log('Select Language: ' + lg);
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
            }}
          >
            <Typography variant="h6">
              {t('statistical_program')} & {t('statistical_cycle')}:
            </Typography>
          </Box>

          <Box
            component="form"
            className="CollectionForm"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <Select
              color="primary"
              labelId="select-program"
              label={t('statistical_program')}
              displayEmpty
              value={statisticalProgram}
              onChange={(event) => setStatisticalProgram(event.target.value)}
              sx={{
                '& legend': { display: 'none' },
                '& fieldset': { top: 0 },
                marginRight: 2,
              }}
              notched={true}
            >
              <MenuItem value={'EEC'}>Enquête Emploi En Continu</MenuItem>
              <MenuItem value={'Option1'}>Other1</MenuItem>
              <MenuItem value={'Option2'}>Other2</MenuItem>
            </Select>
            <Select
              color="primary"
              value={statisticalCycle}
              displayEmpty
              onChange={(event) => setStatisticalCycle(event.target.value)}
              notched={true}
              sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 } }}
            >
              <MenuItem value={'2023'}>2023</MenuItem>
              <MenuItem value={'2022'}>2022</MenuItem>
              <MenuItem value={'2021'}>2021</MenuItem>
            </Select>
          </Box>
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              paddingTop: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">{t('label')}:</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <TextField
              required
              size="small"
              label={t('label')}
              value={label}
              error={!!labelError}
              helperText={labelError}
              sx={{ marginRight: 2, width: '100%' }}
              onChange={(event) => setLabel(event.target.value)}
            />
            <Select
              color="primary"
              value={firstLanguage}
              onChange={(event) => setFirstLanguage(event.target.value)}
              sx={{
                '& legend': { display: 'none' },
                '& fieldset': { top: 0 },
              }}
              notched={true}
            >
              <MenuItem value="fr">🇫🇷</MenuItem>
              <MenuItem value="en">🇬🇧</MenuItem>
            </Select>
          </Box>
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Button variant="outlined" size="small" onClick={handleSubmit}>
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <TextField
              required
              multiline
              rows={3}
              label={t('descriptionField')}
              value={description}
              error={!!descriptionError}
              helperText={labelError}
              sx={{ marginRight: 2, width: '100%' }}
              onChange={(event) => setDescription(event.target.value)}
            />
            <Select
              color="primary"
              value={firstLanguage}
              onChange={(event) => setFirstLanguage(event.target.value)}
              sx={{
                '& legend': { display: 'none' },
                '& fieldset': { top: 0 },
              }}
              notched={true}
            >
              <MenuItem value="fr">🇫🇷</MenuItem>
              <MenuItem value="en">🇬🇧</MenuItem>
            </Select>
          </Box>
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
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
