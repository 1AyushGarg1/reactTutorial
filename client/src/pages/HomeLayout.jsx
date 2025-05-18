import { Outlet } from 'react-router-dom';
import Wrapper from '../wrappers/LandingPage'

const HomeLayout = () => {
    return (
        <Wrapper>

        {/* // The Outlet component is used to render the child routes of the current route.
        // It acts as a placeholder for the nested routes defined in the router configuration.
        // When a child route is matched, the corresponding component will be rendered in this location. */}
            <Outlet />
        </Wrapper>
    );
}

export default HomeLayout;