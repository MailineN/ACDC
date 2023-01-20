import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../components/pages/home/Home';
import Header from '../../components/shared/header/Header';
import DataCollectionForm from '../../components/pages/dataCollectionForm/DataCollectionForm';

const RoutesWebs = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
        <Route path="/new" element={<DataCollectionForm />} />
      </Routes>
    </Router>
  );
};

export default RoutesWebs;
