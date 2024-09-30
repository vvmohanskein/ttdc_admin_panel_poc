import axios from 'axios';

export const loginAPI = async (data) => {
    console.log('data--->',data)
    return await axios.post('https://demo.emeetify.com:81/tourism/category/login',data);
}

export const eventsGetApi = async ()=>{
    return await axios.get(`https://demo.emeetify.com:81/tourism/category/getEvents?CategoryId=1&currentPage=1&itemsPerPage=10&source=socketio&lang=en`)
}