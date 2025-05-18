import Wrapper from '../wrappers/Navbar'
import { FaAlignCenter } from 'react-icons/fa'
import Logo  from './Logo'
import { useDashboardContext } from '../pages/dashboardLayout';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { toggleSideBar } = useDashboardContext();
    // console.log("Navbar", data);
    return (
        <Wrapper> 
            <div className="nav-center">
                <button type="button" className="toggle-btn" onClick={toggleSideBar}>
                    <FaAlignCenter />
                </button>
                <div>
                    <Logo />
                    <h4 className="logo-text">
                        dashboard
                    </h4>
                </div>
                <div className="btn-container">
                    <ThemeToggle />
                    <LogoutContainer />
                </div>
            </div>
        </Wrapper> 
    );
}
export default Navbar;