import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import img from "loading_spinner.gif";

const Loading = ({ loading }) =>
  loading ? (
    <div style={{ textAlign: "center" }}>
      <img
        src={`${process.env.PUBLIC_URL}/loading_spinner.gif`}
        alt="loading"
      />
      <h1>LOADING</h1>
    </div>
  ) : null;

Loading.propTypes = {
  loading: PropTypes.bool
};

Loading.defaultProps = {
  loading: false
};

export default connect(
  state => ({
    loading: state.loading
  }),
  null
)(Loading);

// export default Loading;
