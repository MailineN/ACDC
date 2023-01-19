import { useState } from 'react';
import { Button } from '@mui/joy';
import Main from '../../shared/layout/Main';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <Main>
      <div className="App">
        <h1>ACDC Homepage 🤘🏻</h1>
        <div className="card">
          <Button
            variant="outlined"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </Button>
          <p>POC ACDC front-end</p>
        </div>
      </div>
    </Main>
  );
};

export default Home;
