import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/dashboardLayout';


const ThemeToggle = () => {
    const { isDarkTheme, toggleTheme } = useDashboardContext();
    return (
        <Wrapper onClick={toggleTheme}>
            {isDarkTheme? (<BsFillSunFill className='toggle-icon'/>) :<BsFillMoonFill/>}
        </Wrapper>
    );
}

export default ThemeToggle;