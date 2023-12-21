import DietisianService from '../../Services/Dietisian/dietisian';
import { redirect } from 'react-router-dom';

const register = async (data) => {
    try {
        const res = await DietisianService.registerUser(data);
        console.log(res);
    } catch (error) {
        throw error
    }

    {alert('Register Success')}

    return window.location = "/login";
}

export default { register };