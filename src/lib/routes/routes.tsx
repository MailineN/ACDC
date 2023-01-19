import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../components/pages/home/Home';

const RoutesWebs = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default RoutesWebs;
