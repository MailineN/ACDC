import { Box, BoxProps } from '@mui/material';

const BottomBar = (props: BoxProps) => {
  return (
    <Box
      component="footer"
      className="BottomBar"
      {...props}
      sx={[
        {
          m: 1,
          p: 1,
          display: 'inline-flex',
          alignItems: 'left',
          justifyContent: 'flex-end',
          width: '90%',
          position: 'fixed',
          bottom: 0,
          left: '5%',
          zIndex: 1100,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
};

export default BottomBar;
