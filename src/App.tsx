import './App.css';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import RoutesWebs from './lib/routes/routes';

function App() {
  return (
    <CssVarsProvider>
      <RoutesWebs />
    </CssVarsProvider>
  );
}

export default App;
