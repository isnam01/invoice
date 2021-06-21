
import { useContext, useEffect, useState } from "react";
import BillForm from '../components/billForm';
import ProductForm from "../components/productForm";
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from "../contexts/userContext";
import Preview from "../components/preview";

const Invoice = () => {
    const history = useHistory()
    const [currency, setCurrency] = useState('$')
    const [region, setRegion] = useState('Others')
    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [igst, setIgst] = useState(0)
    const [gst, setGst] = useState(0)
    const [sgst, setSgst] = useState(0)
    const [points, setPoints] = useState('')
    const [customer, setcustomer] = useState({})
    const [products, setproducts] = useState([])
    const [date, setdate] = useState()
    const [duedate, setduedate] = useState()
    const [cartIsShown, setCartIsShown] = useState(false)
    const showPreview = () => {
        setCartIsShown(true)
    }
    const hidePreview = () => {
        setCartIsShown(false)
    }
    const ctx = useContext(UserContext)

    const submitHandler = (e) => {
        e.preventDefault()
        if (!products) {
            toast.error("Please enter products");
        }
        if (!date || !duedate) {
            toast.error("Please enter date");
        }
        if (!customer) {
            toast.error("Please enter customer details");
        }
        else {
            fetch("http://localhost:5000/invoice", {
                method: "post",
                headers: {
                    "Authorization": `Bearer ${ctx.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    customer,
                    region,
                    currency,
                    subtotal,
                    total,
                    products,
                    points,
                    gst,
                    sgst,
                    igst,
                    date,
                    duedate
                })

            }).then(res => res.json())
                .then(data => {

                    if (data.error) {
                        toast.error(data.error)
                    }
                    else {

                        history.push('/dashboard')
                        toast.success(data.message)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

        }

    }



    useEffect(() => {

        if (currency === '$') {
            setIgst(0)
            setGst(0)
            setSgst(0)
            setTotal(subtotal)
        }
        if (region === 'Haryana') {
            setIgst(0)
            setGst(0.09 * parseInt(subtotal))
            setSgst(0.09 * parseInt(subtotal))
            setTotal(subtotal + gst + sgst)
        }
        else if (region === 'Out of Haryana') {
            setGst(0)
            setSgst(0)
            setIgst(0.18 * parseInt(subtotal))
            setTotal(subtotal + igst)
        }
        setTotal(subtotal + igst + gst + sgst)
    }, [subtotal, region, total, sgst, igst, gst, currency])



    return (
        <div className="invoice-container">
            <ToastContainer />
            <div className="invoice-action">
                <div>
                    <div>
                        <label>Select Currency</label>
                        <select onChange={(e) => {
                            setCurrency(e.target.value)
                            if (e.target.value === '$') {
                                setRegion('Others')
                            }
                            else if (e.target.value === 'INR') {
                                setRegion('Haryana')
                            }
                        }}>
                            <option value="$" >$</option>
                            <option value="INR">&#8377;</option>
                        </select>
                    </div>

                    {
                        currency === 'INR' ?
                            (
                                <div>
                                    <label>Select State</label>
                                    <select onChange={(e) => {
                                        setRegion(e.target.value)
                                    }}>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Out of Haryana">Out of Haryana</option>
                                    </select>
                                </div>
                            ) :
                            (
                                <div>
                                    <label>Select State</label>
                                    <select disabled>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Out of Haryana">Out of Haryana</option>
                                    </select>

                                </div>
                            )
                    }


                </div>
                <div className='buttons'>
                    <button onClick={showPreview}>Preview</button>
                    {
                        cartIsShown && <Preview hidePreview={hidePreview} currency={currency} region={region} customer={customer} products={products} date={date} duedate={duedate} total={total} igst={igst} gst={gst} sgst={sgst} points={points} subtotal={subtotal} />
                    }
                    <button onClick={submitHandler} >Save</button>
                </div>

            </div>
            <div className="invoice-form">
                <div className="date">
                    <p >Date <input type="Date" id="date" onChange={(e) => setdate(e.target.value)} style={{ maxWidth: "200px", margin: " 10px 15px" }}></input></p>

                    <p >Due Date <input type="Date" id="duedate" onChange={(e) => setduedate(e.target.value)} style={{ maxWidth: "200px", margin: " 10px 15px" }}></input></p>
                </div>
                <hr style={{ color: "#E6E8EF" }} />
                <div className="detail">
                    <div>
                        <h4>Bill to:</h4>
                    </div>
                    <div>
                        <BillForm setcustomer={setcustomer}></BillForm>
                    </div>
                </div>
                <hr style={{ color: "#E6E8EF" }} />

                <div>
                    <div>
                        <ProductForm getTotal={setSubtotal} setproducts={setproducts} products={products} ></ProductForm>
                    </div>

                    <hr style={{ color: "#E6E8EF" }} />
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
                </div>

                <hr style={{ color: "#E6E8EF" }} />
                <div className="bank-details">
                    <div className="bank">
                        <p>PAN Number : DDABC0760F</p>
                        <p>GST Number : 12ABCDE0120F1X1</p>
                        <p>LUT Number : 154/CGST/Division-Nor/GGN/2017-18date04.10.2017</p>
                    </div>
                    <div className="points">
                        <p>Points to Remember</p>
                        <textarea type="text" id='points' onChange={(e) => { setPoints(e.target.value) }}>

                        </textarea>
                    </div>
                </div>

            </div>

        </div >
    );
};

export default Invoice;
