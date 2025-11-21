// Loader component: loading spinner for Suspense fallback
function Loader() {
  return (
    <div className="loader">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
