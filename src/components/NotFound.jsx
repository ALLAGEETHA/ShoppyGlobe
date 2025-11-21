// NotFound component: 404 error page for unknown routes
import { Link, useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  return (
    <section className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>
        The path <code>{location.pathname}</code> does not exist.
      </p>
      <p>Please check the URL or return to the home page.</p>
      <Link to="/" className="btn">
        Go Home
      </Link>
    </section>
  );
}

export default NotFound;
