import Modal from "./Modal";
import pic from '../assets/bigstep.png';
import Pdf from "react-to-pdf";
import React from 'react';

const Preview = (props) => {
    const ref = React.createRef();
    const { customer, products, date, duedate, currency, subtotal, region, sgst, gst, igst, total, points } = props
    return (


        <Modal hidePreview={props.hidePreview} >

            <div className="receipt-content" ref={ref}>
                <div className="container bootstrap snippets bootdey">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header" style={{ backgroundColor: "rgb(235, 255, 250)" }}>
                                <img src={pic} alt="logo" height="100px"></img>
                            </div>
                            <div className="invoice-wrapper" style={{ padding: "1.5rem" }}>


                                <div className="payment-info">
                                    <div className="row">

                                        <div className="col-sm-6">
                                            <span>Payment Date : </span>
                                            <strong>{date}</strong>
                                        </div>
                                        <div className="col-sm-6 text-right">
                                            <span>Due Date : </span>
                                            <strong>{duedate}</strong>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="payment-details">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <span><strong>Client : </strong></span>
                                            <br />
                                            <br />
                                            <strong>
                                                {customer.name}
                                            </strong>
                                            <br />
                                            <p>
                                                {customer.address}
                                                <br />
                                                {customer.email}
                                                <br />
                                                {customer.number}
                                            </p>
                                        </div>
                                        <div className="col-sm-6 text-right">
                                            <span><strong>Payment To : </strong></span>
                                            <br />
                                            <br />
                                            <strong>
                                                Bigstep Technologies
                                            </strong>
                                            <br />
                                            <p>
                                                344 9th Avenue <br />
                                                San Francisco <br />
                                                99383 <br />
                                                USA <br />

                                                bigstep@gmail.com

                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="items">

                                    <table style={{ width: "100%" }}>
                                        <tbody>
                                            <tr>
                                                <th>ITEM</th>
                                                <th>QTY</th>
                                                <th>RATE</th>
                                                <th>TOTAL</th>
                                            </tr>
                                            {

                                                products.length > 0 ?
                                                    (


                                                        products.map((item, i) => {
                                                            return (
                                                                <tr key={i} className="item">
                                                                    <td>{item.name}</td>
                                                                    <td>{item.rate}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>{item.total}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    )
                                                    :
                                                    <tr><td>No items on the list</td></tr>

                                            }

                                        </tbody>

                                    </table>

                                </div>
                                <br />
                                <div className="price">
                                    <table className="data">
                                        <tbody>
                                            {
                                                currency === 'INR' ?
                                                    (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    Subtotal
                                                                </td>
                                                                <td>
                                                                    &#8377; {subtotal}
                                                                </td>
                                                            </tr>

                                                            {
                                                                region === 'Haryana' ?
                                                                    (
                                                                        <>
                                                                            <tr>
                                                                                <td>
                                                                                    SGST@9%
                                                                                </td>
                                                                                <td>
                                                                                    &#8377; {sgst}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    GST@9%
                                                                                </td>
                                                                                <td>
                                                                                    &#8377; {gst}
                                                                                </td>
                                                                            </tr>
                                                                        </>
                                                                    ) :

                                                                    (

                                                                        <tr>
                                                                            <td>
                                                                                IGST@18%
                                                                            </td>
                                                                            <td>
                                                                                &#8377; {igst}
                                                                            </td>
                                                                        </tr>

                                                                    )
                                                            }

                                                        </>
                                                    )
                                                    :
                                                    <></>
                                            }
                                            <hr style={{ width: "30vw" }} />
                                            <tr >
                                                <td>
                                                    Total
                                                </td>
                                                <td >
                                                    {currency} {total}
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>


                                </div>
                                <br />
                                <div>
                                    <p>
                                        <strong>
                                            Points to Remember :
                                        </strong>
                                        {points}
                                    </p>
                                </div>

                            </div>

                            <div style={{ backgroundColor: "rgb(235, 255, 250)", padding: "1rem", color: "rgba(3, 18, 19, 0.671)" }}>
                                Copyright © 2021. Bigstep Technologies
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Pdf targetRef={ref} filename="code-example.pdf" >
                {({ toPdf }) => <button onClick={toPdf} style={{ width: "fit-content", margin: " 1rem 40%" }}>Generate Pdf</button>}
            </Pdf>
        </Modal>

    )
}

export default Preview;