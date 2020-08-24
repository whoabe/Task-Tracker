import { combineReducers } from "redux";
import alert from "./auth";
import auth from "./auth";
import todo from "./todo";
import time from "./time";

export default combineReducers({ alert, auth, todo, time });
