import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../components/pages/home/Home';
import Header from '../../components/shared/header/Header';
import CreateDataCollection from '../../components/pages/dataCollectionForm/CreateDataCollection';
import CreateCollectionEvent from '../../components/pages/collectionEventForm/CreateCollectionEvent';
const RoutesWebs = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
        <Route path="/new" element={<CreateDataCollection />} />
        <Route path="collection/new" element={<CreateCollectionEvent />} />
      </Routes>
    </Router>
  );
};

export default RoutesWebs;
