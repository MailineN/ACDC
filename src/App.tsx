import './App.css';
import Root from './components/shared/layout/Root';
import RoutesWebs from './lib/routes/routes';

function App() {
  return (
    <Root
      sx={{
        height: '100vh',
      }}
    >
      <RoutesWebs />
    </Root>
  );
}

export default App;
