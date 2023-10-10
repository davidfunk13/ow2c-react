import { FC } from 'react';
import api from '../../utils/axiosInstance';

interface LandingPageProps {

}
const handleLogin = async () => {
    await api.get('/sanctum/csrf-cookie');
    window.location.href = 'http://localhost:3001/battlenet/login'
}

const LandingPage: FC<LandingPageProps> = () => {

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LandingPage;