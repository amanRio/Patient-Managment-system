import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
 // to get new token with api but currently not working it get new token from local storage
 // !bug
    const refresh = async () => {
        const accessToken  = localStorage?.accessToken;
        const roles = [localStorage?.roles]
        const username=localStorage?.username
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(accessToken);
            return {
                ...prev,
                roles: roles,
                accessToken: accessToken,
                username: username
            }
        });
        
        return accessToken;
    }
    return refresh;
};

export default useRefreshToken;
