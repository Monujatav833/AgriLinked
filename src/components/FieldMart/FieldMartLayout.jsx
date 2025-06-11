import { Outlet } from "react-router-dom";
import FieldMartNavbar from "./FieldMartNavbar";

export default function FieldMartLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <FieldMartNavbar />
      <main className="flex-grow mt-14 mb-12">
        <Outlet />
      </main>
    </div>
  );
}
