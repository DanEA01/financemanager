import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/auth';

export const RequireAuth = ({children}:any) => {
    const [authContext, setAuthContext] = useContext<any>(AuthContext);
    
    const navigate = useNavigate();
    
    if (!authContext.token){
        navigate('/Login');
    }
    return children;
}
