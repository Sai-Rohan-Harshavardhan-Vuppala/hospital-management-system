// import "./App.css";
import {
  BrowserRouter,
  Routes,
  Link,
  Route,
  useNavigate,
} from "react-router-dom";
//import Templates from "./Templates";
import SignUp from "./sign-up/SignUp";
import SignIn from "./sign-in/SignIn";
import Dashboard from "./dashboard/Dashboard";
import { useEffect, createContext, useReducer, useContext } from "react";

// export const UserContext = createContext();

// const Routing = () => {
//   const navigate = useNavigate();
//   const { state, dispatch } = useContext(UserContext);
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       dispatch({ type: "USER", payload: user });
//     } else {
//       history.push("/login");
//     }
//   }, []);
//   return (
//     <Routes>
//       <Route path="/signup" element={<SignUp />} />
//       <Route path="/login" element={<SignIn />} />
//       <Route path="/" element={<Dashboard />} />
//     </Routes>
//   );
// };

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <UserContext.Provider value={{ state, dispatch }}>
//       <BrowserRouter>
//         <Routing></Routing>
//       </BrowserRouter>
//     </UserContext.Provider>
//   );
// }

// export default App;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
