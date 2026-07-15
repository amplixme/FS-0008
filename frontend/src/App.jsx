import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./global.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Layout from "./components/layout/Layout.jsx";
import ProtectedRoute from "./components/hoc/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import PostDetails from "./pages/posts/PostDetails.jsx";
import CreatePost from "./pages/posts/CreatePost.jsx";
import PreviewPost from "./pages/posts/PreviewPost.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<PostDetails />} />

            {/* Esta ruta se elimina si en algun momento se reemplazan los posts con informacion mockeada */}
            <Route path="/preview/:id" element={<PreviewPost />} />

            {/* Rutas protegidas */}
            <Route
              path="/posts/create-post"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
