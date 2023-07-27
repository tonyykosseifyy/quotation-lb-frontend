import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // Redirect to "/dashboard" when the component mounts
    window.location.href = "/dashboard";
  }, []);

  // This component won't be rendered, as it redirects before rendering.

  return null;
};

export default Home;
