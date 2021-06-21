import { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from "../contexts/userContext";


const User = () => {

    const [add, setadd] = useState(false)
    const [email, setemail] = useState('')
    const [number, setnumber] = useState('')
    const [department, setdepartment] = useState('')
    const [name, setname] = useState('')
    const [users, setusers] = useState([])
    const ctx = useContext(UserContext)

    const deluser = (id) => {
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
                    const items = users.filter(item => item._id !== id);
                    setusers(items);
                }
            })
            .catch((err) => {
                console.log("Error", err)
            })

    }


    useEffect(() => {
        fetch("http://localhost:5000/getusers", {
            method: "get",
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
                    setusers(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })


    }, [])

    const adduser = () => {
        if (!name || !email || !department || !number) {
            toast.error("Add all details")
        }
        else if (!email.includes('@')) {
            toast.error("Enter correct email")
        }
        else if (number.length !== 10) {
            toast.error("Enter correct number")
        }
        else {
            fetch("http://localhost:5000/signup", {
                method: "post",
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password: "1234",
                    department,
                    number
                })

            }).then(res => res.json())
                .then(data => {

                    if (data.error) {
                        toast.error(data.error)
                    }
                    else {
                        toast.success(data.message)
                        setusers([{
                            name: name,
                            email: email,
                            department: department,
                            number: number

                        }, ...users])
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            setname('')
            setemail('')
            setnumber('')
            setdepartment('')
            setadd(false)

        }



    }



    return (
        <div style={{
            height: "100%"
        }}>
            <ToastContainer />
            <div style={{ display: "flex", justifyContent: "space-between", margin: "4rem 8vw" }}>
                <p>
                    <strong>
                        List of all creators
                    </strong>

                </p>


                <button style={{ width: "fit-content", margin: "0px", padding: "0.5rem" }} onClick={() => { setadd(!add) }}>+ Create Invoice Creator</button>



            </div>
            {
                add &&

                <div style={{ margin: "4rem 8vw" }} className="userform">
                    <input placeholder="Enter name" value={name} name="name" type="text" onChange={(e) => setname(e.target.value)}></input>
                    <input placeholder="Enter email" value={email} name="email" type="text" onChange={(e) => setemail(e.target.value)}></input>
                    <input placeholder="Enter number" value={number} name="number" type="number" onChange={(e) => setnumber(e.target.value)}></input>
                    <select value={department} name="department" onChange={(e) => setdepartment(e.target.value)} style={{ margin: "1rem" }}>
                        <option value="SE">Social Engine AddOns</option>
                        <option value="PM">Prime Messenger</option>
                        <option value="GSTA">AlmaHub</option>
                        <option value="GSTM">MegaCube</option>
                        <option value="OPP">Other</option>
                    </select>

                    <button onClick={adduser}>Add</button>
                </div>
            }
            <div className="manage">
                <table className="invoice">
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Number
                        </th>
                        <th>
                            Department
                        </th>

                    </tr>

                    {
                        users.length > 0 ?
                            (
                                users.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.number}</td>
                                            <td>{item.department}</td>

                                            <i className="fa fa-trash-o" onClick={() => { deluser(item._id) }}></i>
                                        </tr>
                                    )
                                })
                            ) :
                            'no'
                    }



                </table>
            </div>

        </div >
    )
}

export default User;