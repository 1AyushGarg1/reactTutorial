import Wrapper from '../wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/dashboardLayout';
import { FaTimes } from 'react-icons/fa';
import  Logo from './Logo'
import NavLinks from './NavLinks'

const SmallSideBar = () => {
    const { showSideBar,toggleSideBar } = useDashboardContext();
    // console.log("SmallSideBar", data);
    return (
        <Wrapper> 
            <div className={showSideBar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
                <div className="content">
                    <button type='button' className='close-btn' onClick={toggleSideBar}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks/>

                </div>
            </div>
        </Wrapper> 
    );
}
export default SmallSideBar;