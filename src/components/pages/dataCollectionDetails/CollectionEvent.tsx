import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Typography,
  Box,
  Button,
  Card,
  Divider,
  CardActions,
  IconButton,
  IconButtonProps,
  Collapse,
  CardContent,
} from '@mui/material';
import { FiChevronDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import CollectionEvent from '../../../lib/model/collectionEvents';

interface CollectionEventDisplayProps {
  collectionEvent: CollectionEvent;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
}));

const CollectionEventDisplay = (props: CollectionEventDisplayProps) => {
  const { t, i18n } = useTranslation(['dataCollectionDetails']);
  const { collectionEvent } = props;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card
      key={collectionEvent.id}
      sx={{
        px: 1,
        my: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="text.secondary"
            sx={{ marginLeft: 1 }}
          >
            {`${collectionEvent.collectionEventName[i18n.language]} `}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          <Typography variant="body1" fontWeight="xl">
            {`${collectionEvent.label[i18n.language]} `}
          </Typography>
        </Box>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <FiChevronDown />
          </ExpandMore>
        </CardActions>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
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
            <Typography variant="body1">{collectionEvent.id}</Typography>
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
              {collectionEvent.label[i18n.language]}
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
              {t('description')}:{' '}
            </Typography>
            <Typography variant="body1">
              {collectionEvent.description[i18n.language]}
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
            <Typography variant="body1">{collectionEvent.version}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              size="small"
              onClick={() => {
                console.log('show details');
              }}
              variant="contained"
              sx={{ marginLeft: 2 }}
            >
              <Typography variant="body1" fontWeight="xl">
                {t('edit')}
              </Typography>
            </Button>
            <Button
              size="small"
              onClick={() => {
                console.log('delete event');
              }}
              variant="outlined"
              sx={{ marginLeft: 2 }}
            >
              <Typography variant="body1" fontWeight="xl">
                {t('delete')}
              </Typography>
            </Button>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CollectionEventDisplay;
