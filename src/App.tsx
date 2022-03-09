import { Route, Routes } from 'react-router-dom';
import CountryPageView from './views/CountryPageView';
import HomePageView from './views/HomePageView';
import NotFoundView from './views/NotFoundView';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageView />} />
        <Route path="/:code" element={<CountryPageView />} />
        <Route path="/*" element={<NotFoundView />} />
      </Routes>
    </>
  );
}

export default App;
