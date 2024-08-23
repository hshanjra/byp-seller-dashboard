import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      {/* Header  */}
      {/* <header>Auth Header</header> */}
      <main>
        <Outlet />
      </main>
      {/* <footer>Auth Footer</footer> */}
      {/* Footer  */}
    </>
  );
}

export default AuthLayout;
