import {
  GridToolbarContainer,
  DataGrid,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridColDef,
} from '@mui/x-data-grid';
import { Box, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FiChevronRight } from 'react-icons/fi';
const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
};

const DataGridHomePage = (rows: any) => {
  const { t } = useTranslation(['common']);

  const columns: GridColDef[] = [
    {
      field: 'statisticalProgram',
      headerName: t('statisticalProgram').toString(),
      headerClassName: 'columns--header',
      flex: 0.6,
      description: t('statisticalProgram').toString(),
    },
    {
      field: 'programCycle',
      headerName: t('programCycle').toString(),
      headerClassName: 'columns--header',
      flex: 0.2,

      description: t('programCycle').toString(),
    },
    {
      field: 'date',
      headerName: t('lastUpdate').toString(),
      headerClassName: 'columns--header',
      flex: 0.2,

      description: t('lastUpdate').toString(),
    },
    {
      field: 'action',
      headerName: ' ',
      headerClassName: 'columns--header',
      flex: 0.15,
      align: 'center',
      description: t('goToCollection').toString(),
      renderCell: (params: any) => (
        <Link
          href={`/collection/${params.value.url}`}
          underline="none"
          color="inherit"
        >
          <FiChevronRight />
        </Link>
      ),
    },
  ];
  return (
    <Box
      sx={{
        width: '100%',
        '& .columns--header': {
          fontWeight: '700',
        },
      }}
    >
      <DataGrid
        components={{
          Toolbar: CustomToolbar,
        }}
        localeText={{
          toolbarFilters: t('filter'),
          toolbarExport: 'Export',
        }}
        rows={rows}
        columns={columns}
        //getRowHeight={() => 'auto'}
        autoPageSize
        //pagination
        initialState={{
          pagination: {
            page: 0,
          },
        }}
        getRowClassName={() => 'row--style'}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default DataGridHomePage;
