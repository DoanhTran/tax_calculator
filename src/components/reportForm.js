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
    // this.formToJSON = this.formToJSON.bind(this);

    this.form = (
      <>
      <div className="process process-invisible" ref ={this.process}><p>processing...</p></div>
      <div className="report-form-container">
        <button onClick={this.cancelClick}>cancel</button>

       <h3>Report Issue</h3>
      
      <form className="report" onSubmit={this.handleSubmit}>
        <label htmlFor="title">topic</label>
        <input name="title" type="text"></input>
        <label htmlFor="email">
          email(optional in case you want to hear back from us)
        </label>
        <input name="email" type="text"></input>
        <label htmlFor="message">Please provide detail</label>
        <input name="message"></input>
        <button type="submit">Submit</button>
      </form>
      </div>
      </>
    );

   
    this.button = <div className="report-form-main"><div className="informationIcon"></div><div className="report-text"><p>This information if from ......... if it is incorrect
    or you have experience any issue please<button id="report-button" onClick={this.reportIssue}>Report</button>.</p></div></div>;
    this.state = { process: OPEN };
  }

  cancelClick(event){
    this.setState({process:OPEN})
  }

  handleSubmit(event) {
    console.log("handle supmit is called");
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
          console.log("inresult");
          if (result.error) {
            window.alert("sorry something is wrong");
            console.log(result.error);
          } else if (result.data) {
            window.alert("Submitted, thank you for your feedback");
            console.log(result.data);
          }
        },
        (error) => {
          console.log("inerror");
          console.log(error);
          this.setState({ error: true, isLoaded: true });
        }
      )
      // .then(this.setState({ process: OPEN }));
  }

  reportIssue(event) {
    this.setState({ process: FORM });
  }

  render() {
    if (report) {
      console.log(report);
    }

    if (this.state.process === OPEN) {
      return this.button;
    } else if (this.state.process === FORM) {
      return this.form;
    }else return null;
  }
}

export default ReportForm;
/*
want json 
{
    title:"title",
    email:"email",
    message:"text"

}

*/
