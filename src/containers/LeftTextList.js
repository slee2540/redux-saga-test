import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as listAction from "actions";

class LeftTextList extends React.Component {
  render() {
    const { ListAction, news } = this.props;

    return (
      <div>
        <button type="submit" onClick={ListAction.requestApi}>
          눌러봐봐!
        </button>
        <ul>
          {news.map(item => {
            return (
              <li key={`${item.title}left`}>
                <img
                  src={item.urlToImage}
                  alt=""
                  style={{ maxWidth: "10rem" }}
                />
              </li>
            );
          })}
        </ul>
        {/* <img src={article.urlToImage} alt="" /> */}
      </div>
    );
  }
}

LeftTextList.propTypes = {
  ListAction: PropTypes.object,
  news: PropTypes.array
};

LeftTextList.defaultProps = {
  ListAction: {},
  news: {}
};

export default connect(
  state => ({
    news: state.news
  }),
  dispatch => ({
    ListAction: bindActionCreators(listAction, dispatch)
  })
)(LeftTextList);
