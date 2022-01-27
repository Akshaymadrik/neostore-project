import { MAIN_URL } from "./Url";
import axios from 'axios';
let token=localStorage.getItem('_token');

export function registerUser(data){
    return axios.post(`${MAIN_URL}neostore/register`,data)
}
export function loginUser(data){
    return axios.post(`${MAIN_URL}neostore/login`,data)
}
export function registerUser1(data){
    return axios.post(`${MAIN_URL}neostore/social`,data)
}
export function editData(data){
    return axios.put(`${MAIN_URL}neostore/updatedata`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function addAddressto(data,email){
    return axios.post(`${MAIN_URL}neostore/addaddress/${email}`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function updpassword(data){
    return axios.post(`${MAIN_URL}neostore/changepassword`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function updaddress(data,email){
    return axios.put(`${MAIN_URL}neostore/updaddress/${email}`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function deleteddress(data,email){
    return axios.post(`${MAIN_URL}neostore/deleteaddress/${email}`,data,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function forgotEmail(email){
    return axios.get(`${MAIN_URL}neostore/forgot/${email}`);
}
export function forgotChange(email,data){
    return axios.post(`${MAIN_URL}neostore/forgot/change/${email}`,data);
}
export function getProducts(data){
    return axios.get(`${MAIN_URL}neostore/getdata`,data)
}
export function getAllCategories(){
    return axios.get(`${MAIN_URL}neostore/categories`)
}
export function getAllColors(){
    return axios.get(`${MAIN_URL}neostore/colors`)
}
export function getCategoryProducts(id){
    return axios.get(`${MAIN_URL}neostore/categoryproducts/${id}`)
}
export function getColorProducts(id){
    return axios.get(`${MAIN_URL}neostore/colorproducts/${id}`)
}
export function getCategory(data){
    return axios.get(`${MAIN_URL}neostore/getcat`,data)
}
export function Postrate(data,id){
    return axios.post(`${MAIN_URL}addrate/${id}`,data)
}
export function getItem(id) {
    console.log(id)
    return axios.get(`${MAIN_URL}neostore/getproduct/${id}`);
}
export function addToCart(data){
    return axios.post(`${MAIN_URL}neostore/addtocart`,data,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function getCart(email){
    return axios.get(`${MAIN_URL}neostore/getcart/${email}`,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function getOrder(email){
    return axios.get(`${MAIN_URL}neostore/getorder/${email}`,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function incrementproduct(data){
    return axios.put(`${MAIN_URL}neostore/incrementquantity`, data,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function decrementproduct(data){
    return axios.put(`${MAIN_URL}neostore/decrementquantity`, data,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function deleteOrder(id){
    return axios.delete(`${MAIN_URL}neostore/deleteorder/${id}`,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function checkout_order(data){
    return axios.put(`${MAIN_URL}neostore/checkout`,data,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function getOrd(id) {
    return axios.get(`${MAIN_URL}neostore/getorderbyid/${id}`);
}

export function getUser(email){
    return axios.get(`${MAIN_URL}neostore/userdata/${email}`,{
        headers:{"Authorization":`Bearer ${token}`}});
}
export function getlogo(email){
    return axios.get(`${MAIN_URL}neostore/updlogo/${email}`)
}