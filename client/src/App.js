import {
  BrowserRouter,
  Routes,
  Link,
  Route,
  useNavigate,
} from "react-router-dom";
import SignUp from "./components/sign-up/SignUp";
import CreateDoctor from "./components/sign-up/CreateDoctor";
import CreateOpd from "./components/sign-up/CreateOpd";
import SignIn from "./components/sign-in/SignIn";
import Dashboard from "./components/dashboard/Dashboard";
import BookApt from "./components/dashboard/BookApt";
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
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/create-doctor" element={<CreateDoctor />} />
      <Route path="/create-opd-schedule" element={<CreateOpd />} />
      <Route path="/book-appointment" element={<BookApt />} />
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
