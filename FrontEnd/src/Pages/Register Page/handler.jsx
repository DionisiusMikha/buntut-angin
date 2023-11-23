import DietisianService from '../../Services/Dietisian/dietisian';
import { redirect } from 'react-router-dom';

const register = async (data) => {
    try {
        const res = await DietisianService.registerUser(data);
    } catch (error) {
        throw error
    }

    return window.location = "/login";
}

export default { register };