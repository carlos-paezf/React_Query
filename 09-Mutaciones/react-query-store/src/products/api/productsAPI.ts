import axios from "axios";


const productsAPI = axios.create( {
    baseURL: 'http://localhost:3100'
} );


export { productsAPI };