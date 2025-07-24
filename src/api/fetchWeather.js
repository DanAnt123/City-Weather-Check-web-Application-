
import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const APIKey = '6e52daf8438d59fb4873293fd664ddc4';

// PUBLIC_INTERFACE
export const fetchWeather = async (query) => {
    // 'appid' (not 'AppID'), and leave out fixed lat/lon
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            appid: APIKey,
        }
    });
    return data;
}