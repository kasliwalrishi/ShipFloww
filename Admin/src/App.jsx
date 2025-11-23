import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Parcels from "./pages/Parcels";
import Users from "./pages/Users";
import Branches from "./pages/Branches";
import Orders from "./pages/Orders";
import NewParcel from "./pages/NewParcel";
import NewUsers from "./pages/NewUsers";
import Parcel from "./pages/Parcel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useSelector } from "react-redux";

function App() {
  const admin = useSelector((state) => state.admin);

  const Layout = () => {
    return admin.currentAdmin ? (
      <div className="flex flex-col">
        <Navbar />

        <div className="flex">
          <div className="w-[20%]">
            <Menu />
          </div>

          <div className="w-[80%]">
            <Outlet />
          </div>
        </div>

        <Footer />
      </div>
    ) : (
      <Navigate to="/login" />
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/parcels",
          element: <Parcels />,
        },
        
        {
          path: "/users",
          element: <Users />,
        },

        {
          path: "/branches",
          element: <Branches />,
        },

        {
          path: "/orders",
          element: <Orders />,
        },
        
        {
          path: "/newparcel",
          element: <NewParcel />,
        },
        {
          path: "/newuser",
          element: <NewUsers />,
        },
        {
          path: "/parcel/:id",
          element: <Parcel />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
     
    },
    {
      path: "/login",
      element: <Login />,
    },
    // Registration route removed

  
  ]);

  return <RouterProvider router={router} />;
}

export default App;
