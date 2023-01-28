import { Box, BoxProps } from '@mui/material';

const Root = (props: BoxProps) => {
  return (
    <Box
      {...props}
      sx={[
        {
          minHeight: '100vh',
          minWidth: '90vw',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
};

export default Root;
