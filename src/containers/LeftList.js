import React from "react";
import axios from "axios";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import shortid from "shortid";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
// import * as listAction from "actions/list";
// import * as headerAction from "actions/header";
import DatePicker from "react-datepicker";
import Select from "react-select";
import cx from "classnames";
import scss from "containers/main.module.scss";
import "./date.css";
import "react-datepicker/dist/react-datepicker.css";

const options = [
  { value: "11200", label: "성동구" },
  { value: "11215", label: "광진구" },
  { value: "11710", label: "송파구" },
  { value: "11440", label: "마포구" }
];

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      // label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      // borderColor: "rgba(255,99,132,1)",
      // borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      // hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 60]
    }
  ]
};

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
    borderRadius: 0,
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
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

  xml2json = (e, type) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
    const { pageNo, numOfRows, selectedDate, selectedItem } = this.state;
    let xml = null;
    if (type === "aptTransactionDetail") {
      xml = axios({
        method: "GET",
        url: `aptTransactionDetail?pageNo=${pageNo}&numOfRows=${numOfRows}&date=${selectedDate}&gu=${selectedItem}`
      })
        .then(res => res.data)
        .catch(error => {
          throw error;
        });
    } else if (type === "aptTransaction") {
      xml = axios({
        method: "GET",
        url: `aptTransaction?date=${selectedDate}&gu=${selectedItem}`
      })
        .then(res => res.data)
        .catch(error => {
          throw error;
        });
    } else {
      xml = axios({
        method: "GET",
        url: `aptJunseRent?date=${selectedDate}&gu=${selectedItem}`
      })
        .then(res => res.data)
        .catch(error => {
          throw error;
        });
    }

    xml.then(result => {
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
    // console.log(item.value);
    this.setState({
      selectedItem: item.value
    });
  };

  selectedMenu = select => {
    if (select === "aptTransactionDetail") {
      return (
        <>
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
        </>
      );
    }

    return null;
  };

  render() {
    const { list, startDate } = this.state;
    const { selectedHeader } = this.props;

    return (
      <div>
        <div>
          <form className={scss.form}>
            {this.selectedMenu(selectedHeader)}
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
            <button
              type="submit"
              onClick={e => this.xml2json(e, selectedHeader)}
              className={scss.btn}
            >
              검색하기
            </button>
          </form>
        </div>

        <Bar
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true
          }}
        />

        <div className={scss.aptList}>
          {list.length > 0 ? (
            <table className={scss.table}>
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
                {list.map((item, index) => {
                  return (
                    <tr key={shortid.generate()}>
                      <th>{index}</th>
                      {selectedHeader === "aptJunseRent" ? (
                        <td>{item["보증금액"]}</td>
                      ) : (
                        <td>{item["거래금액"]}</td>
                      )}
                      <td>{item["건축년도"]}</td>
                      <td>{item["아파트"]}</td>
                      <td>{item["전용면적"]}</td>
                      <td>{item["층"]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    );
  }
}

LeftTextList.propTypes = {
  selectedHeader: PropTypes.string
};

LeftTextList.defaultProps = {
  selectedHeader: ""
};

export default connect(
  state => ({
    selectedHeader: state.header.selectedHeader
  }),
  null
)(LeftTextList);
