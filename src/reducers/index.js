import { combineReducers } from "redux";
import molds from './molds';
import deliveries from './deliveries';
import items from './items';
import buyers from "./buyers";
import materials from "./materials";
import suppliers from "./suppliers";
import auth from './auth';

export default combineReducers({
    molds,
    items,
    deliveries,
    buyers,
    materials,
    suppliers,
    auth,
});