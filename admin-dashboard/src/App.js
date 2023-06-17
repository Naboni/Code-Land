import { Switch, Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthUserContext } from "./context/authUserContext";
import useFirebaseAuth from "./hooks/useFirebaseAuth";
import Login from "./pages/Login";
import Questions from "./pages/Questions";
import Topics from "./pages/Topics";
import Solutions from "./pages/Solutions";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthUserContext.Provider value={useFirebaseAuth()}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />}/>
              <Route index path="/dashboard" element={<Home />}/>
              <Route path="/questions" element={<Questions/>}/>
              <Route path="/topics" element={<Topics/>}/>
              <Route path="/solutions" element={<Solutions/>}/>
              <Route path="/profile" element={<Profile />}/>
            </Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthUserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
