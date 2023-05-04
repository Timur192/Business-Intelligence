import { Route, Routes } from "react-router-dom";
// import HomeView from "./pages/Home/HomeView";
// import LoginView from "./pages/Login/LoginView";
// import RegistrationView from "./pages/Registration/RegistrationView";
import userSlice from "./zustand/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Suspense, lazy, useEffect, useState } from "react";

// TEST!
const Chart = lazy(() => import("./pages/ChartPage/ChartView"))
const Map = lazy(() => import("./pages/MapPage/MapView"))
const Login = lazy(() => import("./pages/Login/LoginView"))
const Registration = lazy(() => import("./pages/Registration/RegistrationView"))

function App() {
  const stateUsers = userSlice((state) => state.userState);
  const setUser = userSlice((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Routes>
          {stateUsers && (
            <>
              <Route path="/chart" element={<Suspense fallback={<div>Loading...</div>}><Chart /></Suspense>} />
              <Route path="/map" element={<Suspense fallback={<div>Loading...</div>}><Map /></Suspense>} />
              <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><Chart /></Suspense>} />
            </>
          )}
          {!stateUsers && (
            <>
              <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
              <Route path="/registration" element={<Suspense fallback={<div>Loading...</div>}><Registration /></Suspense>} />
              <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
            </>
          )}
        </Routes>
      )}
    </>
  );
}

export default App;
