import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import shortid from "shortid";
import PropTypes from "prop-types";
import * as listAction from "actions";
import css from "containers/layout.module.css";

// import xml from "xml2js";

class LeftTextList extends React.Component {
  state = {
    list: []
  };

  xml2json = () => {
    const xmlTest = axios({
      method: "GET",
      url: "users"
    })
      .then(res => res.data)
      .catch(error => {
        throw error;
      });

    xmlTest.then(result => {
      console.log(result);
      this.setState({
        list: result
      });
    });
  };

  render() {
    const { ListAction, news } = this.props;
    const { list } = this.state;

    return (
      <div>
        <button type="submit" onClick={ListAction.requestApi}>
          눌러봐봐!
        </button>
        <button type="submit" onClick={this.xml2json}>
          Xml Parsing
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
        {list.length > 0
          ? list.map(item => {
              return (
                <div key={shortid.generate()}>
                  <div className={css.listWrapper}>{item["거래금액"]}</div>
                  <div className={css.listWrapper}>{item["건축년도"]}</div>
                  <div className={css.listWrapper}>{item["년"]}</div>
                  <div className={css.listWrapper}>{item["도로명"]}</div>
                  <div className={css.listWrapper}>
                    {item["도로명건물본번호코드"]}
                  </div>
                </div>
              );
            })
          : null}
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
