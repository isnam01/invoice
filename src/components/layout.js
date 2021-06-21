import { Fragment, useContext } from 'react';
import userContext from '../contexts/userContext';
import MainNavigation from './navbar';
import Footer from './footer'

const Layout = (props) => {
    const userCtx = useContext(userContext);
    return (
        <Fragment>

            {userCtx.isLoggedIn && (
                <>
                    <MainNavigation />

                </>


            )}
            <main style={{ minHeight: "70vh", maxHeight: "max-content" }}>{props.children}</main>
            {userCtx.isLoggedIn && (
                <>
                    <Footer />

                </>


            )}

        </Fragment>
    );
};

export default Layout;