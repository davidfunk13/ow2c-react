import { FC } from 'react';
import api from '../../utils/axiosInstance';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface LandingPageProps {

}
const handleLogin = async () => {
    await api.get('/sanctum/csrf-cookie');
    window.location.href = 'http://localhost:3001/battlenet/login'
}

const LandingPage: FC<LandingPageProps> = () => {
    const navigate = useNavigate();

    const handleLogout = async (navigate: NavigateFunction) => {
        await api.post('/logout');
        navigate('/');
    }
    
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => handleLogout(navigate)}>Logout</button>

        </div>
    );
};

export default LandingPage;