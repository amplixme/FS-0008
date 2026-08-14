/* eslint-disable react-refresh/only-export-components */

import { StrictMode, lazy, Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./global.css";
import { prefetchOnIdle } from "./utils/prefetch.js";

// Componentes estructurales y de control
import Layout from "./components/layout/Layout.jsx";
import ProtectedRoute from "./components/hoc/ProtectedRoute.jsx";
import ProtectedAdminRoute from "./components/hoc/ProtectedAdminRoute.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import Spinner from "./components/common/Spinner.jsx";
import ProgressActivityIcon from "~icons/material-symbols/progress-activity";

// Lista de las rutas a precargar
const prefetchRoutes = () => {
  prefetchOnIdle([
    () => import("./pages/Login.jsx"),
    () => import("./pages/Register.jsx"),
    () => import("./pages/posts/PostDetails.jsx"),
    () => import("./pages/admin/AdminDashboard.jsx"),
  ]);
};

// Lazy loading de las paginas
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const User = lazy(() => import("./pages/User.jsx"));
const PostDetails = lazy(() => import("./pages/posts/PostDetails.jsx"));
const CreatePost = lazy(() => import("./pages/posts/CreatePost.jsx"));
const EditPost = lazy(() => import("./pages/posts/EditPost.jsx"));
const EditProfile = lazy(() => import("./pages/EditProfile.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const Categories = lazy(() => import("./pages/admin/Categories.jsx"));
const NotFound = lazy(() => import("./pages/404/NotFound.jsx"));

function App() {
  useEffect(() => {
    prefetchRoutes();
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <Spinner message={"Cargando..."} icon={ProgressActivityIcon} />
              </div>
            }
          >
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
                    <ProtectedAdminRoute>
                      <AdminDashboard />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/categorias/"
                  element={
                    <ProtectedAdminRoute>
                      <Categories />
                    </ProtectedAdminRoute>
                  }
                />

                {/* Catch-all: cualquier ruta no definida */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
