import { createContext, useState, useEffect } from 'react';
import {useGetAppConfig} from '../redux/actions/configAction';

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const getAppConfig = useGetAppConfig();

    const fetchConfig = async () => {
        const response = await getAppConfig();
        if(response?.payload?.data){
            setConfig(response.payload.data);
            localStorage.setItem('easycoop_config', JSON.stringify(response.payload.data));
        }
        
        // return response;
    }

    const [config, setConfig] = useState({});

    useEffect(() => {
        const stored_config = JSON.parse(localStorage.getItem('easycoop_config'));
        if (stored_config && stored_config.logos) {
            setConfig(stored_config);
        }else{
            fetchConfig();
        }
        
    }, []);

    return (
        <ConfigContext.Provider value={{config, fetchConfig}}>
            {children}
        </ConfigContext.Provider>
    )
}