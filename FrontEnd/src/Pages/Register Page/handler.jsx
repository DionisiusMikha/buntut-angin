import DietisianService from '../../Services/Dietisian/dietisian';
import { redirect } from 'react-router-dom';

const register = async (data) => {
    try {
        // console.log(data);
        const res = await DietisianService.registerUser(data);
        console.log(res);
        {alert('Register Success')}
    } catch (error) {
        {alert('ERROR')}
        console.log(error);
        throw error
    }


    // return window.location = "/login";
}

export default { register };