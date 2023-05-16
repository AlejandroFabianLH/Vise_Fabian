import axios from 'axios';

export class ProductStore{
    baseURL = "http://localhost:8080/api/v1/";

    getAll(){
        return axios.get(this.baseURL + "all").then(res => res.data);
    }

    save(product){
        return axios.post(this.baseURL + "save", product).then(res => res.data);
    }

    delete(id){
        return axios.get(this.baseURL + "delete/" + id).then(res => res.data)
    }
}