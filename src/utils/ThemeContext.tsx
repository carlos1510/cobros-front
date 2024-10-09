import * as React from 'react';

// Definir la interfaz para el contexto del tema
interface ThemeContextType {
    currentTheme: string;
    changeCurrentTheme: (newTheme: string) => void;
  }

const ThemeContext = React.createContext<ThemeContextType>({
    currentTheme: 'light',
    changeCurrentTheme: () => {},
});

interface ThemeProviderProps {
    children: React.ReactNode;
  }
  

export default function ThemeProvider({children}: ThemeProviderProps){
    const persistedTheme = localStorage.getItem('theme');
    const [theme, setTheme] = React.useState<string>(persistedTheme || 'light');

    const changeCurrentTheme = (newTheme: string) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    React.useEffect(() => {
        document.documentElement.classList.add('[&_*]:!transition-none');
        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        }

        const transitionTimeout = setTimeout(() => {
            document.documentElement.classList.remove('[&_*]:!transition-none');
        }, 1);

        return () => clearTimeout(transitionTimeout);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeProvider = () => React.useContext(ThemeContext);