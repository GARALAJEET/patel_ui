import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DealersList from './pages/DealersList';
import DealerDetail from './pages/DealerDetail';
import ModalsList from './pages/ModalsList';
import ModalDetail from './pages/ModalDetail';

// Placeholder components until real ones are created
const PlaceholderDealersList = () => <div className="p-4">Dealers List Page (Coming Soon)</div>;
const PlaceholderDealerDetail = () => <div className="p-4">Dealer Detail Page (Coming Soon)</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DealersList />} />
          <Route path="dealer/:id" element={<DealerDetail />} />
          <Route path="modals" element={<ModalsList />} />
          <Route path="modals/:id" element={<ModalDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
