import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import shortid from "shortid";
import PropTypes from "prop-types";
import * as listAction from "actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import css from "containers/layout.module.css";

class LeftTextList extends React.Component {
  state = {
    list: [],
    pageNo: "",
    numOfRows: "",
    startDate: new Date(),
    selectedDate: "201905"
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  xml2json = () => {
    const { pageNo, numOfRows, selectedDate } = this.state;

    const xmlTest = axios({
      method: "GET",
      url: `users?pageNo=${pageNo}&numOfRows=${numOfRows}&date=${selectedDate}`
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

  onchangeText = id => {
    return e => {
      const scope = {};
      scope[id] = e.target.value;
      // console.log(e.target.value,id)
      this.setState(scope);
    };
  };

  handleChange = date => {
    // console.log(date);
    // console.log(date.getFullYear());
    // console.log(date.getMonth());
    const selDate =
      date.getFullYear() + ("00" + (date.getMonth() + 1)).slice(-2);
    // console.log(selectedDate);
    // console.log(typeof date);
    this.setState({
      startDate: date,
      selectedDate: selDate
    });
  };

  render() {
    // const { ListAction, news } = this.props;
    const { news } = this.props;
    const { list, startDate } = this.state;

    return (
      <div>
        <input type="text" onChange={this.onchangeText("pageNo")} />
        <input type="text" onChange={this.onchangeText("numOfRows")} />

        <DatePicker
          selected={startDate}
          onChange={this.handleChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />

        {/* <button type="submit" onClick={ListAction.requestApi}>
          눌러봐봐!
        </button> */}

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
        <table style={{ textAlign: "center" }}>
          <caption>아파트매매 실거래 상세 자료</caption>
          <thead>
            <tr>
              <th />
              <th>거래금액</th>
              <th>건축년도</th>
              <th>아파트</th>
              <th>전용면적</th>
              <th>층</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0
              ? list.map((item, index) => {
                  return (
                    <tr key={shortid.generate()}>
                      <th>{index}</th>
                      <td>{item["거래금액"]}</td>
                      <td>{item["건축년도"]}</td>
                      <td>{item["아파트"]}</td>
                      <td>{item["전용면적"]}</td>
                      <td>{item["층"]}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
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
