import React from "react";
import styles from "./App.module.css";

export const App: React.FC = () => {
  return (
    <div>
      <h1 className={styles.test}>TEST!!! 123</h1>
      <hr />
      <h1 className="text-4xl text-blue-700">My Webpack + Tailwind App</h1>
    </div>
  );
};
