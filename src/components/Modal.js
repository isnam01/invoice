import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = props => {
    return <div className='backdrop' onClick={props.hidePreview}></div>
};

const ModalOverlay = props => {
    return (
        <div className='modal'>
            <div >{props.children}</div>
        </div>
    )
};

const portalElement = document.getElementById('overlays');

const Modal = props => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop hidePreview={props.hidePreview} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
};

export default Modal;