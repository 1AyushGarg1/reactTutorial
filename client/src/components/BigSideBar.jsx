import { useDashboardContext } from '../pages/dashboardLayout';
import Wrapper from '../wrappers/BigSidebar'
import NavLinks from './NavLinks'
import Logo from './Logo'


const bigSideBar = () => {
    const { showSideBar } = useDashboardContext();
    // console.log("BigSideBar", data);
    return (
        <Wrapper>
            <div className={showSideBar?'sidebar-container':'sidebar-container show-sidebar' }>
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks isBigSideBar />
                </div>

            </div>
        </Wrapper> 
    );
}
export default bigSideBar;