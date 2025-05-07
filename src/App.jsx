import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Landing from "./pages/Landing";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import EditEvent from "./pages/EditEvent";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ActivityTimeline from "./pages/ActivityTimeline";
import EventsList from "./pages/EventsList";
import UsersList from "./pages/UsersList";
import AdminHomePage from "./pages/AdminHomePage";
import  PendingRegistrationsPage from "./pages/PendingRegistrationsPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/edit" element={<EditEvent />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/users/:id" element={<Profile />} />
          <Route path="/users/:id/edit" element={<EditProfile />} />
          <Route path="/activity" element={<ActivityTimeline />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/activity/:id" element={<ActivityTimeline />} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/pending-registrations" element={<PendingRegistrationsPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
