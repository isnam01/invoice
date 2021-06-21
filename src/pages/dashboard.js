import { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from "../contexts/userContext";
import { Link } from "react-router-dom";
const Dashboard = () => {

    const [invoices, setinvoices] = useState([])
    const [data, setdata] = useState([])
    const [paid, setpaid] = useState(0)
    const [pending, setpending] = useState(0)
    const [status, setstatus] = useState('')
    const [value, setvalue] = useState('')
    const ctx = useContext(UserContext)

    const updateStatus = (status, id) => {
        fetch('http://localhost:5000/invoice', {
            method: "put",
            body: JSON.stringify({
                id,
                status
            }),
            headers: {
                "Authorization": `Bearer ${ctx.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error)
                }
                else {
                    toast.success(data.message)
                    const eleIndex = invoices.findIndex(el => el._id === id)
                    let newArr = [...invoices]
                    newArr[eleIndex] = { ...newArr[eleIndex], status: status }
                    setinvoices(newArr)
                }

            })
            .catch((err) => {
                console.log("Error", err)
            })
    }

    const delinvoice = (id) => {
        fetch('http://localhost:5000/invoice', {
            method: "delete",
            body: JSON.stringify({
                id
            }),
            headers: {
                "Authorization": `Bearer ${ctx.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error)
                }
                else {
                    toast.success(data.message)
                    const items = invoices.filter(item => item._id !== id);
                    setinvoices(items);
                    if (data.invoices.length > 0) {
                        const pend = data.invoices.reduce((total, i) => {
                            if (i.status === 'Pending') {
                                return total = total + 1
                            }


                        }, 0)
                        setpending(pend)
                        setpaid(data.invoices.length - pend)
                    }
                    else {
                        setpending(0)
                        setpaid(0)
                    }
                }
            })
            .catch((err) => {
                console.log("Error", err)
            })

    }

    useEffect(() => {
        fetch('http://localhost:5000/invoice', {
            method: "get",
            headers: {
                "Authorization": `Bearer ${ctx.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                if (data.invoices.length > 0) {
                    const pend = data.invoices.reduce((total, i) => {
                        if (i.status === 'Pending') {
                            return total = total + 1
                        }


                    }, 0)
                    setpending(pend)
                    setpaid(data.invoices.length - pend)
                }
                setinvoices(data.invoices)
            })
            .catch((err) => {
                console.log("Error", err)
            })


    }, [ctx.token])


    // useEffect(() => {
    //     const arr = invoices.filter((el =>
    //         Object.values(el).filter((item) => {
    //             item.includes(value)
    //         })
    //     ))
    //     setdata(arr)
    //     console.log(arr)
    // }, [value, invoices])



    return (
        <div className="dashboard">
            <ToastContainer />
            <div className="briefdata">
                <div className="data">
                    <h4>
                        Total invoices
                    </h4>
                    <h1 style={{ color: "rgb(83, 204, 206)" }}>
                        {invoices.length}
                    </h1>
                </div>
                <div>
                    <div className="data">
                        <h5>
                            Paid
                        </h5>
                        <h5 style={{ color: "rgb(83, 204, 206)" }}>
                            {paid}
                        </h5>
                    </div>
                    <div className="data">
                        <h5>
                            Pending
                        </h5>
                        <h5 style={{ color: "rgb(83, 204, 206)" }}>
                            {pending}
                        </h5>
                    </div>
                </div>

            </div>


            <hr style={{ width: "200px", border: "2px solid rgb(83, 204, 206)", margin: "0 auto", borderRadius: "2px", color: "rgb(83, 204, 206)" }}></hr>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "2rem" }}>
                <Link

                    to="/user"
                    exact

                >
                    <button style={{ width: "fit-content", marginTop: "0" }}>Manage Creators</button>


                </Link>
            </div>
            <div className="manage">

                <div style={{ display: "flex", justifyContent: "space-between", margin: "2rem 0" }}>
                    <p>
                        <strong>
                            List of all invoices
                        </strong>

                    </p>

                    <Link

                        to="/invoice"
                        exact

                    >
                        <button style={{ width: "fit-content", marginTop: "0" }}>+ Create Invoice</button>


                    </Link>


                </div>
                <table className="invoice">
                    <tr>
                        <th>
                            Invoice No.
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Total
                        </th>
                    </tr>
                    {
                        invoices.length > 0 ?
                            (
                                invoices.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.invoiceNo}</td>
                                            <td>{item.date.slice(0, 10)}</td>
                                            <td>{item.customer.name}</td>
                                            <td>{item.status}</td>
                                            <td>{item.total}</td>
                                            <select name="status" style={{ margin: "1rem" }} value={status} onChange={(e) => { updateStatus(e.target.value, item._id) }}>
                                                <option value="">Change Status</option>
                                                <option value="Paid" >Paid</option>
                                                <option value="Unpaid">Unpaid</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                            <i className="fa fa-trash-o" onClick={() => { delinvoice(item._id) }}></i>
                                        </tr>
                                    )
                                })
                            ) :
                            <h6>No invoice created yet</h6>
                    }

                </table>
                {/* <div>
                    <input type="text" onChange={(e) => setvalue(e.target.value)} />
                    <div>
                        {data}
                    </div>
                </div> */}
            </div>
        </div >

    )
}

export default Dashboard;

