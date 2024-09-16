import { createContext } from "react";
import useLocalStorage from "use-local-storage";

const StateContext = createContext({});

export const StateProvider = ({ children }) => {
  const themePreference = "#00208a";
  const [theme, setTheme] = useLocalStorage("theme", themePreference);
  const [chartTheme, setChartTheme] = useLocalStorage("chartTheme", {
    primaryColor: theme,
    secondaryColor: "#000000",
  });

  return (
    <StateContext.Provider
      value={{
        chartTheme,
        setChartTheme,
        theme,
        setTheme,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
