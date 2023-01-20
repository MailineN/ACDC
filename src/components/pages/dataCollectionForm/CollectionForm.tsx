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
  InputLabel,
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
  const [statisticalProgram, setStatisticalProgram] = useState('EEC');
  const [statisticalProgramError, setStatisticalProgramError] = useState('');
  const [statisticalCycle, setStatisticalCycle] = useState('2023');
  const [statisticalCycleError, setStatisticalCycleError] = useState('');
  const [label, setLabel] = useState<string[] | undefined>([]);
  const [labelError, setLabelError] = useState('');
  const [description, setDescription] = useState<string[] | undefined>([]);
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

  return (
    <>
      <FormControl size="small" fullWidth sx={{ marginTop: 3 }}>
        <Stack spacing={3}>
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignContent: 'stretch',
            }}
          >
            <InputLabel id="select-program" color="primary" shrink={true}>
              {t('statistical_program')}
            </InputLabel>
            <Select
              color="primary"
              labelId="select-program"
              label={t('statistical_program')}
              displayEmpty
              value={statisticalProgram}
              onChange={handleChangeProgram}
              sx={{ marginRight: 2 }}
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
              onChange={handleChangeCycle}
              notched={true}
              sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 } }}
            >
              <MenuItem value={'2023'}>2023</MenuItem>
              <MenuItem value={'2022'}>2022</MenuItem>
              <MenuItem value={'2021'}>2021</MenuItem>
            </Select>
          </Box>

          <TextField
            required
            size="small"
            label={t('label')}
            value={label}
            error={!!labelError}
            helperText={labelError}
            onChange={(event) =>
              setLabel((currentLabel) => [
                ...(currentLabel !== undefined ? currentLabel : []),
                event.target.value,
              ])
            }
          />
          <TextField
            required
            multiline
            rows={4}
            label={t('descriptionField')}
            value={description}
            error={!!descriptionError}
            helperText={labelError}
            onChange={(event) =>
              setDescription((currentDescription) => [
                ...(currentDescription !== undefined ? currentDescription : []),
                event.target.value,
              ])
            }
          />
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignContent: 'stretch',
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
