import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import"./components/Toggle.css";
import NewInputBox from "./components/inputbox/inputbox2";
import ReportForm from "./components/reportForm";
import Toggle from "./components/Toggle"

function App() {
  return (
    <div className="grid-container">
      <div className="web-enable-container">
        <label>Use tax calculator on this site?</label>
        <div className="fill-space"></div>
        <Toggle size="small"></Toggle>
      </div>
      <div className="divider"></div>
      <NewInputBox />
      <ReportForm />
    </div>
  );
}

export default App;
