import {useTheme} from "../Context/ThemeContext.jsx";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";


export default function ThemeBtn() {
    
    const {themeMode, lightTheme, darkTheme } = useTheme()
    const isDarkMode = themeMode === 'dark'
    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked;
        if (darkModeStatus){
            darkTheme()
        }else{
            lightTheme()
        }
    }
    
    return (
        <label className="items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={onChangeBtn}
                checked = {themeMode === 'dark'}
            />
            <div>{isDarkMode?<MdLightMode className="w-6 h-6 dark:text-white"/> : <MdDarkMode className="w-6 h-6 text-black"/>}</div>
        </label>
    );
}

