import React from "react";
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";
import numeral from "numeral";
import { timestampToRegularTime } from "./date.utility";

class Receipt extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const {transaction, user, printerRef } = this.props;
    return (
      <div className='receipt-container' ref={printerRef }>
        <h1 className="company">Company Name</h1>
        <small className="address">22 Jump street, Asokoro</small>
        <hr/>
        <h2 className="attendant">Attendant: {user?.name}</h2>
        <h2 className="date">Date: {timestampToRegularTime(transaction?.created_at)}</h2>
        <hr/>

        <h3 className="title">Products</h3>
        <table>
            <thead>
                <tr>
                    <td>Qty</td>
                    <td>product</td>
                    <td>Cost</td>
                </tr>
            </thead>
            <tbody>
                {
                    transaction?.sales.map(((sale, index) => {
                        return (<tr key={index}>
                            <td>{sale.quantity}</td>
                            <td>
                                <p className="product-name">{sale?.product?.productName}</p>
                                <p className="product-description">{sale?.product?.productDescription}</p>
                            </td>
                            <td>
                                <p>{numeral(sale?.retailCost * sale?.quantity).format('0,0.00')}</p>
                            </td>
                        </tr>)
                    }))
                }
            </tbody>
        </table>
        <div className="footer">
            <h3 className="gross-total">Gross Total: {numeral(transaction?.sumTotal).format('0,0.00')}</h3>
            <h3 className="discount">Discount: {numeral(transaction?.totalDiscount).format('0,0.00')}</h3>
            <h3 className="total">Total: {numeral(transaction?.sumTotal - transaction?.totalDiscount).format('0,0.00')}</h3>
            <small>Payment Mode: {transaction?.paymentMode}</small>
        </div>
        <hr />
        <div className="address">
            <small>For inquiry: Call 09023940483, 09088837485</small>
        </div>
      </div>
    );
  }
}

class ReceiptTrigger extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <Receipt ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Receipt;