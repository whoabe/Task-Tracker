import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import todo from "./todo";
import mode from "./mode";

export default combineReducers({ alert, auth, todo, mode });
