import axios from 'axios';

const API = axios.create({baseURL: 'http://10.0.1.221:5000/mm'});

//ITEM
export const getItems = () => API.get(`/items`);
export const createItem = (newItem) => API.post(`/items`,newItem);
export const editItem = (id,editedItem) => API.patch(`/items/${id}/editItem`,editedItem);

//MOLD
export const getMolds = () => API.get(`/molds`);
export const getMoldsByItemId = (id) => API.get(`/molds/${id}/getMoldsByItemId`);
export const createMold = (id,newMold) => API.post(`/molds/${id}/createMold`,newMold);
export const editMoldWithId = (id,editMold) => API.patch(`/molds/${id}/editMoldWithId`,editMold);

// DELIVERIES
export const getDeliveriesByMoldId = (id) => API.get(`/deliveries/${id}/getDeliveriesByMoldId`);
export const addDelivery = (id,newDelivery) => API.post(`/deliveries/${id}/addDelivery`,newDelivery);

//BUYER
export const getBuyers = () => API.get(`/buyers`);

//SUPPLIERS
export const getSuppliers = () => API.get(`/suppliers`);

//MATERIALS
export const getMaterials = () => API.get(`/materials`);

//MOLDS

// AUTH
export const signIn = (user) => API.post(`/auth/signIn`,user);
export const changePassword = (user) => API.post('/auth/changePassword',user);