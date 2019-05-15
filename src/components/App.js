import React from "react";
import LeftList from "containers/LeftList";
import Header from "components/header";
// import RightList from "containers/RightList";
// import Loading from "containers/loading";
import scss from "containers/main.module.scss";

const App = () => {
  return (
    <div className={scss.wrapper}>
      <div className={scss.headerWrapper}>
        {/* <Loading /> */}
        <Header />
      </div>
      <div className={scss.containerWrapper}>
        <div className={scss.leftWrapper}>
          <LeftList />
        </div>
        <div className={scss.rightWrapper}>
          <LeftList />
        </div>
      </div>
    </div>
  );
};
export default App;
