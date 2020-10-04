import axios from "axios"; //npm i axios
const clienteAxios = axios.create({
  //baseURL: "https://distribuidapp.herokuapp.com/api/", //"http://192.168.0.22:4000/api/", //
  baseURL: "http://192.168.0.199:4000/api/",
});
export default clienteAxios;