import React from "react";
import css from "containers/layout.module.css";
import LeftTextList from "containers/LeftTextList";
// import RightImage from "containers/RightImage";
import Loading from "containers/loading";

const App = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.headerWrapper}>
        <Loading />
      </div>
      <div className={css.containerWrapper}>
        <div className={css.leftWrapper}>
          <LeftTextList />
        </div>
        {/* <div className={css.rightWrapper}>
          <RightImage />
        </div> */}
      </div>
    </div>
  );
};

export default App;
