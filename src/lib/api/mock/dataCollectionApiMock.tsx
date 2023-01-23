import {
  FiChevronRight,
  FiCheck,
  FiPauseCircle,
  FiSlash,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
export const columnsProcessData = [
  {
    field: 'tag',
    headerName: "Nom de l'enquête",
    headerClassName: 'columns--header',
    flex: 0.2,
    description: 'Nom du processus défini par BPMN',
  },
  {
    field: 'processKey',
    headerName: "Type d'enquête",
    headerClassName: 'columns--header',
    flex: 0.2,
    minWidth: 150,
    description: "Type d'enquête",
  },
  {
    field: 'documentation',
    headerName: 'Description',
    headerClassName: 'columns--header',
    flex: 0.6,
    minWidth: 300,
    description: 'Description du processus',
  },
  {
    field: 'date',
    headerName: 'Date début',
    headerClassName: 'columns--header',
    flex: 0.2,
    minWidth: 150,
    description: "Date de début de l'exécution du processus",
  },
  {
    field: 'action',
    headerName: ' ',
    headerClassName: 'columns--header',
    flex: 0.15,
    align: 'center',
    description: "Accès à l'exécution du processus",
    renderCell: (params: any) => (
      <Link
        to={`/collection/${params.value.url}`}
        style={{ textDecoration: 'none' }}
      >
        <FiChevronRight />
      </Link>
    ),
  },
];
