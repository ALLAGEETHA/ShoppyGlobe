// Main App component with layout structure and lazy loading support
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Loader from './components/Loader';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        {/* Suspense wrapper for lazy-loaded route components */}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
