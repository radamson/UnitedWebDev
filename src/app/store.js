import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { questionsReducer } from "../reducers/questionsReducer";
import { userReducer } from "../reducers/userReducer";

const rootReducer = combineReducers({
    questions: questionsReducer,
    users: userReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store