import axios from "axios"; 


const clienteAxios = axios.create({

  //baseURL: "http://192.168.0.199:4000/api/",
  baseURL: "https://budgetgo.herokuapp.com/api/",

});

export default clienteAxios;