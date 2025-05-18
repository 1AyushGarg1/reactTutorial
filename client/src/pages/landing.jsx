import styled from 'styled-components';
import Wrapper from '../wrappers/LandingPage'
import main from '../images/main.svg'
// import logo from '../images/logo.svg'
import { Link } from 'react-router-dom';
import { Logo } from '../components';

// const StyledBtn = styled.button`
//   background-color: #4CAF50; /* Green */
//   border: none;
//   font-size: 1.5rem;
//   color: white;
// `;
const Landing = () => {
  return (
    <Wrapper>
            <nav>
                {/* <img src={logo} alt="jobify" className='logo' /> */}
                <Logo></Logo>
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>Job <span>Tracking</span> App</h1>
                    <p>I'm baby chillwave activated charcoal, vaporware glossier tacos 8-bit. Poutine artisan squid, 8-bit brunch four dollar toast. Tofu activated charcoal vaporware, artisan squid four dollar toast.</p>
                    <Link to='/register' className='btn register-link'>Register</Link>
                    <Link to='/login' className='btn login-link'>Login</Link>
                </div>
                <img src={main} alt="job hunt" className='img main-img' />
            </div>    

        {/* // The Outlet component is used to render the child routes of the current route.
        // It acts as a placeholder for the nested routes defined in the router configuration.
        // When a child route is matched, the corresponding component will be rendered in this location. */}
        </Wrapper>
  );
}

// const Wrapper = styled.div`
//   background-color: red;
//   padding: 20px;
//   border-radius: 20px;
//   h1 {
//     color: white;
//   }
//   p {
//     color: white;
//   }
//   .content{
//     background-color: blue;
//     padding: 20px;
//     border-radius: 10px;
//   }
// `;

export default Landing;