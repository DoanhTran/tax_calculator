import React from "react";
import "../App.css"
const OPEN = "open";
const FORM = "write";
const REQUEST = "request";
let report = "";


class ReportForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.reportIssue = this.reportIssue.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.process = React.createRef()

    this.form = (
      <>
      <div className="process process-invisible" ref ={this.process}><p>processing...</p></div>
      <div className="report-form-container">
      <div className="edit-header">
        <button className="back-button" onClick={this.cancelClick}>Cancel</button>
        <div className="fill-space"></div>
        <div className="enable-text">Report Issue</div>
      </div>
      <div className="divider"></div>
       
      <form className="report" onSubmit={this.handleSubmit}>
        <label className="text-lab" htmlFor="title">topic</label>
        <input name="title" className="report-input" type="text"></input>
        <label className="text-lab" htmlFor="email">
          email (optional!)
        </label>
        <input name="email" className="report-input" type="text"></input>
        <label className="text-lab" htmlFor="message">Please provide some details regarding the issue</label>
        <input name="message" className="report-input" ></input>
        <button className="primary-button"type="submit">Submit</button>
      </form>
      </div>
      </>
    );

   
    this.button = <div className="report-form-main"><div className="informationIcon"></div><div className="report-text"><div className="small-label">If the information is incorrect
    or there are any issues with your experience please<button className="danger-button" onClick={this.reportIssue}>Report</button></div></div></div>;
    this.state = { process: OPEN };
  }

  cancelClick(event){
    this.setState({process:OPEN})
  }

  handleSubmit(event) {
    this.process.current.classList.remove('process-invisible')

    let data = {};
    const val = event.target.elements;
    Object.assign(data, {
      title: val["title"].value,
      email: val["email"].value,
      message: val["message"].value,
    });
    JSON.stringify(data);
    fetch("http://0.0.0.0:5000/report/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      // headers: { "Access-Control-Allow-Origin": "*" },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            window.alert("Sorry, something is wrong!");
          } else if (result.data) {
            window.alert("Submitted, thank you for your feedback!");
          }
        },
        (error) => {
          this.setState({ error: true, isLoaded: true });
        }
      )
  }

  reportIssue(event) {
    this.setState({ process: FORM });
  }

  render() {
    if (report) {
    }

    if (this.state.process === OPEN) {
      return this.button;
    } else if (this.state.process === FORM) {
      return this.form;
    }else return null;
  }
}

export default ReportForm;
