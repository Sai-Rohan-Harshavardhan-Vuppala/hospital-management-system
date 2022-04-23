import {BrowserRouter,Routes,Link,Route,useNavigate,} from "react-router-dom";
import SignUp from "./components/sign-up/SignUp";
import SignIn from "./components/sign-in/SignIn";
import Dashboard from "./components/dashboard/Dashboard";
import { useEffect, createContext, useReducer, useContext } from "react";
import { initialState, reducer } from "./reducers/userReducer";
import { useCookies } from "react-cookie";


export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log(user);
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      //  navigate("/login");
    }
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing></Routing>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;