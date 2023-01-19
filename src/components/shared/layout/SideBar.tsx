import { Box, BoxProps } from '@mui/joy';

function SideBar(props: BoxProps) {
  return (
    <Box
      component="nav"
      className="Navigation"
      {...props}
      sx={[
        {
          p: 2,
          bgcolor: 'background.surface',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: {
            xs: 'none',
            sm: 'initial',
          },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

export default SideBar;
