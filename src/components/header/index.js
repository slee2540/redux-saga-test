import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as headerAction from "actions/header";
import scss from "containers/main.module.scss";

class Header extends React.Component {
  render() {
    const { HeaderAction } = this.props;

    return (
      <div className={scss.inlineBox}>
        <ul className={scss.inlineBox}>
          <li className={scss.inlineBox}>
            <button
              type="submit"
              className={scss.headerBtn}
              onClick={() => HeaderAction.selectHeader("aptTransaction")}
            >
              아파트매매 실거래자료
            </button>
          </li>
          <li className={scss.inlineBox}>
            <button
              type="submit"
              className={scss.headerBtn}
              onClick={() => HeaderAction.selectHeader("aptJunseRent")}
            >
              아파트 전월세 자료
            </button>
          </li>
          <li className={scss.inlineBox}>
            <button
              type="submit"
              className={scss.headerBtn}
              onClick={() => HeaderAction.selectHeader("aptTransactionDetail")}
            >
              아파트매매 실거래 상세 자료
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

Header.propTypes = {
  HeaderAction: PropTypes.object
};

Header.defaultProps = {
  HeaderAction: {}
};

export default connect(
  state => ({
    selectedHeader: state.selectedHeader
  }),
  dispatch => ({
    HeaderAction: bindActionCreators(headerAction, dispatch)
  })
)(Header);