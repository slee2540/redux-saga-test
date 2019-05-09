import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import shortid from "shortid";
import PropTypes from "prop-types";
import * as listAction from "actions";
import DatePicker from "react-datepicker";
import Select from "react-select";
import cx from "classnames";
import "react-datepicker/dist/react-datepicker.css";
import css from "containers/layout.module.css";
import "./date.css";
import scss from "containers/test.module.scss";

const options = [
  { value: "11200", label: "성동구" },
  { value: "11215", label: "광진구" },
  { value: "11710", label: "송파구" }
];

const styles = {
  control: base => ({
    ...base,
    minHeight: 32
  }),
  dropdownIndicator: base => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0
  }),
  clearIndicator: base => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0
  }),
  menu: base => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
    // kill the white space on first and last option
    padding: 0
  })
};

class LeftTextList extends React.Component {
  state = {
    list: [],
    pageNo: "",
    numOfRows: "",
    startDate: new Date(),
    selectedDate: "201905",
    selectedItem: options[0].value
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  xml2json = e => {
    e.preventDefault();
    const { pageNo, numOfRows, selectedDate, selectedItem } = this.state;

    const xmlTest = axios({
      method: "GET",
      url: `users?pageNo=${pageNo}&numOfRows=${numOfRows}&date=${selectedDate}&gu=${selectedItem}`
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
    const selDate = date.getFullYear() + `00${date.getMonth() + 1}`.slice(-2);

    this.setState({
      startDate: date,
      selectedDate: selDate
    });
  };

  selectItem = item => {
    console.log(item.value);
    this.setState({
      selectedItem: item.value
    });
  };

  render() {
    // const { ListAction, news } = this.props;
    // const { news } = this.props;
    const { list, startDate } = this.state;

    return (
      <div>
        <div>
          <form className={scss.form}>
            <input
              type="text"
              onChange={this.onchangeText("pageNo")}
              placeholder="페이지수"
              className={scss.formInput}
            />
            <input
              type="text"
              onChange={this.onchangeText("numOfRows")}
              placeholder="페이지당 리스트 개수"
              className={scss.formInput}
            />
            <DatePicker
              selected={startDate}
              onChange={this.handleChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className={cx(
                "react-datepicker-wrapper",
                "react-datepicker__input-container",
                scss.formInput
              )}
            />
            <Select
              options={options}
              defaultValue={options[0]}
              onChange={this.selectItem}
              styles={styles}
            />
            <button type="submit" onClick={this.xml2json} className={scss.btn}>
              검색하기
            </button>
          </form>
        </div>
        {/* <button type="submit" onClick={ListAction.requestApi}>
          눌러봐봐!
        </button> */}
        {/* <ul>
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
        </ul> */}
        {/* <img src={article.urlToImage} alt="" /> */}
        <div className={css.aptList}>
          <table className={css.table}>
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
