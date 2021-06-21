import pic from '../assets/invoice.svg'
import logo from '../assets/logo.png'
import Login from '../components/loginForm'

const Signin = () => {

    return (
        <div className="signincontainer">
            <div className="forms-container">
                <div className="signin">
                    <Login></Login>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <img height="150px" className="logo" width="300px" src={logo} alt="" />
                        <p className="p">
                            Welcome to the Invoice Generator, trusted by
                            millions of people. Invoice Generator lets you quickly make invoices with our attractive invoice template straight from
                            your web browser, no sign up necessary.
                        </p>

                    </div>
                    <img height="500px" width="500px" className="image" src={pic} alt="" />
                </div>


            </div>
        </div>
    )

}
export default Signin;