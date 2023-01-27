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
import { dataCollectionApiMock } from '../../../lib/api/mock/dataCollectionApiMock';

interface DataGridHomePageProps {
  rows: any;
  heightTable: number;
}

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
};

const DataGridHomePage = (props: DataGridHomePageProps) => {
  const { t } = useTranslation(['common']);

  const columns: GridColDef[] = [
    {
      field: 'label',
      headerName: t('statisticalProgram').toString(),
      headerClassName: 'columns--header',
      flex: 0.3,
      description: t('statisticalProgram').toString(),
    },
    {
      field: 'versionDate',
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
          href={`/collection/${params.value.id}`}
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
        p: 2,
        height: props.heightTable,
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
        rows={props.rows}
        columns={columns}
        //getRowHeight={() => 'auto'}
        autoPageSize
        pagination
        getRowClassName={() => 'row--style'}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default DataGridHomePage;
