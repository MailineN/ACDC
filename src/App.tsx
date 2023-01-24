import './App.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Root from './components/shared/layout/Root';
import RoutesWebs from './lib/routes/routes';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Root
        sx={{
          height: '100vh',
        }}
      >
        <RoutesWebs />
      </Root>
    </LocalizationProvider>
  );
}

export default App;
