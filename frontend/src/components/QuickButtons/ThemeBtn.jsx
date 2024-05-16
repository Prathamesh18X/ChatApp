import { useTheme } from "../../Context/ThemeContext.jsx";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeBtn() {
    const { themeMode, lightTheme, darkTheme } = useTheme();
    const isDarkMode = themeMode === 'dark';
    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked;
        if (darkModeStatus) {
            darkTheme();
        } else {
            lightTheme();
        }
    };
    return (
        <label className="swap swap-rotate text-black dark:text-white">
            <input
                type="checkbox"
                onChange={onChangeBtn}
                checked={isDarkMode}
                className="sr-only"
            />
            <MdLightMode className="swap-on w-7 h-7" />
            <MdDarkMode className="swap-off w-7 h-7" />
        </label>
    );
}
