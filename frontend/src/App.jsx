/* eslint-disable react-refresh/only-export-components */
import { StrictMode, lazy, Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { prefetchOnIdle } from "./utils/prefetch.js";
import "./global.css";

// Layout y vistas criticas
import Home from "./pages/Home.jsx";
import Layout from "./components/layout/Layout.jsx";
import ProtectedRoute from "./components/hoc/ProtectedRoute.jsx";
import ProtectedAdminRoute from "./components/hoc/ProtectedAdminRoute.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import Spinner from "./components/common/Spinner.jsx";
import ProgressActivityIcon from "~icons/material-symbols/progress-activity";

// Lazy loading del resto de rutas
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
    // Solo precargar rutas publicas de alta probabilidad
    prefetchOnIdle([
      // () => import("./pages/Login.jsx"),
      () => import("./pages/Register.jsx"),
      () => import("./pages/posts/PostDetails.jsx"),
    ]);
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
