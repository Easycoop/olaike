import './not-found.css';
import Header from '../../user/components/layout/header/Header';
import Footer from '../../user/components/layout/footer/Footer';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <Helmet>
        <title>404 not found - GPS</title>
      </Helmet>
      <Header />
      <section className="not__found">
        <h1>404 NOT FOUND</h1>
        <p>OOPS! We can't seem to find the page you're looking for</p>
        <h3
          onClick={() => {
            navigate('/');
          }}
        >
          Go back to home page
        </h3>
      </section>
      <Footer />
    </div>
  );
}

export default NotFound;
