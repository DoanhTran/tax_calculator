import React from "react";
import "../App.css";

const initial = "no data;";
const fetching = "fetching data";


/*global chrome*/

class DisplayTax extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      taxRate: initial,
      taxRegion: initial,
    };
  }


  componentWillUnmount(){
    window.alert("unmount")
  }

  componentDidUpdate(prevProps) {
    if (this.props.taxRate && this.props.taxRate!== prevProps.taxRate){
      this.setState({taxRate:this.props.taxRate})
    }

    if (this.props.taxRegion && this.props.taxRegion!== prevProps.taxRegion){
      this.setState({taxRegion:this.props.taxRegion})
    }

    if (this.props.save !== prevProps.save && this.props.save === true) {
      const zip = this.props.zipcode
      this.setState({ taxRate: fetching, taxRegion: fetching });

      fetch("http://0.0.0.0:5000/taxrate/" + zip, {
        methode: "GET",

        // headers: { "Access-Control-Allow-Origin": "*" },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (!result.error) {
              chrome.storage.sync.set({currentTax: {rate:result.data.EstimatedCombinedRate, tReg:result.data.TaxRegionName, zip:zip} }, function() {
              });
              
            }
            this.setState({
              isLoaded: true,

              taxRate: result.error
                ? result.error
                : result.data.EstimatedCombinedRate,
              taxRegion: result.error
                ? result.error
                : result.data.TaxRegionName,
            }); 
            this.props.updateTax(result.data.EstimatedCombinedRate)
          },
          (error) => {
            this.setState({ error: true, isLoaded: true });
          }
        );
      }
  }

  render() {
    return (
      <div className ="rate-display">
        {!this.state.error ? (
          <>
            <p>tax rate: {this.state.taxRate}</p>
            <p>tax region: {this.state.taxRegion}</p>
          </>
        ) : (
          <p>error: ${this.state.error}</p>
        )}
      </div>
    );
  }
}

export default DisplayTax;
