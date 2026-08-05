import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./global.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import User from "./pages/User.jsx";
import Layout from "./components/layout/Layout.jsx";
import ProtectedRoute from "./components/hoc/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import PostDetails from "./pages/posts/PostDetails.jsx";
import CreatePost from "./pages/posts/CreatePost.jsx";
import EditPost from "./pages/posts/EditPost.jsx";
import { Categories } from "./pages/admin/Categories.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import NotFound from "./pages/404/NotFound.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import EditProfile from "./pages/EditProfile.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/posts/:id" element={<PostDetails />} />
              <Route path="/perfil/:id" element={<User />} />

              {/* Rutas protegidas */}
              <Route
                path="/posts/create-post"
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/perfil/editar"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/posts/:id/edit"
                element={
                  <ProtectedRoute>
                    <EditPost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categorias/"
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Catch-all: cualquier ruta no definida */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
