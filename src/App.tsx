import './App.css';
import { CssVarsProvider } from '@mui/joy/styles';
import Root from './components/shared/layout/Root';
import RoutesWebs from './lib/routes/routes';

function App() {
  return (
    <CssVarsProvider>
      <Root
        sx={{
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <RoutesWebs />
      </Root>
    </CssVarsProvider>
  );
}

export default App;
