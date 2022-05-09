import axios from 'axios'

export const  getTour = async (page) => {
    await axios.post(`http://localhost:8000/api/tour/get-all-tour`, {params: {page: page}})
    .then((response) => {
        console.log(response);
        return response.json().data;
    })
   
    .catch((err) => {
       console.log(err);
    })
}

