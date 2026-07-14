import { Outlet } from "react-router";
import Footer from "./shared/Footer";
import Header from "./shared/Header";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
