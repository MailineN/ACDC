import { useState } from 'react';
import { Button } from '@mui/joy';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
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
  );
};

export default Home;
