import { Box, BoxProps } from '@mui/joy';

function Root(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        {
          minHeight: '100vh',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

export default Root;
