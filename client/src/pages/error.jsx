import { Link,useRouteError } from 'react-router-dom';
import Wrapper from '../wrappers/ErrorPage';
import img from '../images/not-found.svg';
// This is a functional component that represents an error page.

const Error = () => {
  const error = useRouteError();
  if(error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Oops! Page not found</h3>
          <p>We cannot seems to find the page you are looking for </p>
          <Link to='/'>back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h1>Error</h1>
      <p>Something went wrong!</p>
      <p>Sorry, an unexpected error has occurred which is :{error.statusText || error.message}</p>
      {/* The Link component is used to create a link to the home page. */}
      {/* When clicked, it will navigate the user back to the home page. */}
      <p>Go to</p>
      {/* The Link component is used to create a link to the home page. */}
      {/* When clicked, it will navigate the user back to the home page. */}
      <Link to='/'>back home</Link>
    </Wrapper>
  );
}

export default Error;