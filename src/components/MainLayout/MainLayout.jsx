import {} from "react";
import cls from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={cls.mainLayout}>
      <header>HEADER</header>
      <div className={cls.mainWrapper}>
        <main className={cls.main}>
          <Outlet />
        </main>
        <footer className={cls.footer}>
          React Quiz Cards Application | {currentYear} <br />
          by Mariia Var
        </footer>
      </div>
    </div>
  );
};
