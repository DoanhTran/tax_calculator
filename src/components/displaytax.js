import React from "react";

const initial = "nodata;";
const fetching = "fetching data";

/*global chrome*/

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

      fetch("http://0.0.0.0:5000/taxrate/" + this.props.zipcode + "/", {
        methode: "GET",

        // headers: { "Access-Control-Allow-Origin": "*" },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            console.log("inresult");
            console.log(result);
            chrome.extension.sendMessage({tax: result}, function(response) {
              console.log("tax sent");
            });
            if(result.error){
              console.log("invalid zip")
              console.log(result.error)
            }
            else{
              chrome.storage.sync.set({rate: result.data.EstimatedCombinedRate,regionName:result.data.TaxRegionName }, function() {
                window.alert('tax saved')
                

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
            <h6>tax rate: {this.state.taxRate}</h6>
            <h6>tax region name:{this.state.taxRegian}</h6>
          </div>
        ) : (
          <h6>error: ${this.state.error}</h6>
        )}
      </div>
    );
  }
}

export default DisplayTax;
