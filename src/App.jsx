import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Loader from './components/Loader';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
