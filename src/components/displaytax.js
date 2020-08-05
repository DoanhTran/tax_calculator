/*global chrome*/
import React from "react";

const initial = "nodata;";
const fetching = "fetching data";

class DisplayTax extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      taxRate: initial,
      taxRegian: initial,
    };
    console.log("display");
  }

  componentDidUpdate(prevProps) {
    if (this.props.save !== prevProps.save && this.props.save === true) {
      console.log("saveindisplay");
      this.setState({ taxRate: fetching, taxRegian: fetching });

      fetch("http://0.0.0.0:5000/taxrate/" + this.props.zipcode, {
        methode: "GET",

        // headers: { "Access-Control-Allow-Origin": "*" },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            console.log("inresult");
            console.log(result);
            if (result.error){
              console.log("not valid zipcode.")
            }
            else{
                chrome.storage.sync.set({currentTax: {rate:result.data.EstimatedCombinedRate, tReg:result.data.TaxRegionName, zip:zip} }, function() {
                console.log("tax rate is saved.")
              });
              
            }
            this.setState({
              isLoaded: true,

              taxRate: result.error
                ? result.error
                : result.data.EstimatedCombinedRate,
              taxRegian: result.error
                ? result.error
                : result.data.TaxRegionName,
            });
            this.props.updateTax(result.data.EstimatedCombinedRate);
          },
          (error) => {
            console.log("inerror");
            console.log(error);
            this.setState({ error: true, isLoaded: true });
          }
        );
      // } else if (
      //   this.props.save !== prevProps.save &&
      //   this.props.save === false
      // ) {
      //     this.setState({ taxRate: fetching, taxRegian: fetching })

      // }
    }
  }

  render() {
    return (
      <div>
        {!this.state.error ? (
          <div>
            <h6>Tax Rate: {this.state.taxRate}</h6>
            <h6>Location:{this.state.taxRegian}</h6>
          </div>
        ) : (
          <h6>error: ${this.state.error}</h6>
        )}
      </div>
    );
  }
}

export default DisplayTax;
