import { Outlet } from "react-router-dom";

function Wrapper() {
  return (
    <div className="min-h-screen max-w-screen-2xl bg-ud-black py-16 px-5 mx-auto">
      <Outlet />
    </div>
  );
}

export default Wrapper;
