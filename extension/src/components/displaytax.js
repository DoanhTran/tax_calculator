import React from "react";
import "../App.css";

const initial = "nodata;";
const fetching = "fetching data";


/*global chrome*/

class DisplayTax extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      taxRate: props.taxRate?props.taxRate:initial,
      taxRegion: props.taxRegion?props.taxRegion:initial,
    };
    console.log("display");
   
  }

  // componentDidMount(){
  //   chrome.storage.sync.get('currentTax', function(result) {
  //     console.log("get dat is called in display");
  //       console.log('Value currently is ' + result.currentTax);
  //       console.log(result)
  //       console.log(result.currentTax)
  //       if (result.currentTax!==undefined){
  //         this.setState({taxRate:result.currentTax.rate, taxRegion:result.currentTax.tReg});
  //       }
  //     }.bind(this));
  // }


  componentDidUpdate(prevProps) {
    if (this.props.save !== prevProps.save && this.props.save === true) {
      console.log("saveindisplay");
      const zip = this.props.zipcode
      this.setState({ taxRate: fetching, taxRegion: fetching });

      fetch("http://0.0.0.0:5000/taxrate/" + zip, {
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
              taxRegion: result.error
                ? result.error
                : result.data.TaxRegionName,
            });
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
      //     this.setState({ taxRate: fetching, taxRegion: fetching })

      // }
    }
  }

  render() {
    return (
      <div className ="rate-display">
        {!this.state.error ? (
          <>
            <p>tax rate: {this.state.taxRate}</p>
            <p>tax regian name:{this.state.taxRegion}</p>
          </>
        ) : (
          <p>error: ${this.state.error}</p>
        )}
      </div>
    );
  }
}

export default DisplayTax;
