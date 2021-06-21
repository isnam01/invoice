import { useEffect, useReducer, useState } from 'react';

const ProductForm = (props) => {

    const { products, setproducts, getTotal } = props
    const [add, setadd] = useState(false)
    const [showadd, setshowadd] = useState(false)
    const [formIsValid, setformIsValid] = useState(false)
    const productReducer = (state, action) => {

        if (action.type === 'NAME_INPUT') {
            return { ...state, name: action.val, nameIsValid: !!action.val.trim() };
        }
        if (action.type === 'NAME_BLUR') {
            return { ...state, name: state.name, nameIsValid: !!state.name.trim() };
        }
        if (action.type === 'QUANTITY_INPUT') {
            if (state.rate) {
                return { ...state, total: state.rate * action.val, rate: action.val, rateIsValid: !!action.val.trim() };
            }
            return { ...state, quantity: action.val, quantityIsValid: !!action.val.trim() };
        }
        if (action.type === 'QUANTITY_BLUR') {
            return { ...state, quantity: state.quantity, quantityIsValid: !!state.quantity.trim() };
        }
        if (action.type === 'RATE_INPUT') {
            if (state.quantity) {
                return { ...state, total: state.quantity * action.val, rate: action.val, rateIsValid: !!action.val.trim() };
            }
            return { ...state, rate: action.val, rateIsValid: !!action.val.trim() };
        }
        if (action.type === 'RATE_BLUR') {
            return { ...state, rate: state.rate, rateIsValid: !!state.rate.trim() };
        }
        if (action.type === 'RESET') {
            return {

                name: '',
                nameIsValid: false,
                quantity: '',
                quantityIsValid: false,
                rate: '',
                rateIsValid: false,
                total: 0,
            };
        }
        return {
            name: '',
            nameIsValid: false,
            rate: '',
            rateIsValid: false,
            quantity: '',
            quantityIsValid: false,
            total: 0,
        };
    };

    const productNameChangeHandler = (event) => {
        dispatchProduct({ type: 'NAME_INPUT', val: event.target.value });

    };
    const validateProductNameHandler = () => {
        dispatchProduct({ type: 'NAME_BLUR' });
    };


    const quantityChangeHandler = (event) => {
        dispatchProduct({ type: 'QUANTITY_INPUT', val: event.target.value });

    };
    const validateQuantityHandler = () => {
        dispatchProduct({ type: 'QUANTITY_BLUR' });
    };


    const rateChangeHandler = (event) => {
        dispatchProduct({ type: 'RATE_INPUT', val: event.target.value });

    };
    const validateRateHandler = () => {
        dispatchProduct({ type: 'RATE_BLUR' });
    };





    const [productState, dispatchProduct] = useReducer(productReducer, {

        name: '',
        nameIsValid: false,
        quantity: '',
        quantityIsValid: false,
        rate: '',
        rateIsValid: false,
        total: 0,
    });


    useEffect(() => {
        if (!!products) {
            let total = products.reduce((total, item) => {
                total = parseInt(item.total) + parseInt(total)
                return total
            }, 0)
            getTotal(total)
        }

    }, [products, getTotal])




    const addProduct = (e) => {
        e.preventDefault();
        setadd(true)
        if (formIsValid) {
            setproducts([{
                name: productState.name,
                quantity: productState.quantity,
                rate: productState.rate,
                total: productState.total
            }, ...products])

            dispatchProduct({ type: 'RESET' });
            setshowadd(false)
            setadd(false)
        }

    }


    const cancelProduct = (e) => {
        e.preventDefault();
        setadd(false)

        dispatchProduct({ type: 'RESET' });
        setshowadd(false)
    }




    useEffect(() => {
        setformIsValid(productState.quantityIsValid && productState.rateIsValid && productState.nameIsValid)
    }, [productState.quantityIsValid, productState.rateIsValid, productState.nameIsValid])


    return (
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
            <div>

            </div>
            {
                showadd ?
                    (
                        <form className="addform" onSubmit={addProduct}>
                            <div>
                                <div>
                                    <input type="text"
                                        id="name"
                                        onChange={productNameChangeHandler}
                                        onBlur={validateProductNameHandler}
                                        placeholder="Item"></input>
                                </div>

                                <div>
                                    {add && productState.nameIsValid !== true ? "Enter a valid name" : ''
                                    }
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input type="Number"
                                        id="quantity"
                                        onChange={quantityChangeHandler}
                                        onBlur={validateQuantityHandler}
                                        placeholder="Quantity"></input>
                                </div>
                                <div>
                                    {add && productState.quantityIsValid !== true ? "Enter a valid quantity" : ''
                                    }
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input type="Number"
                                        id="rate"
                                        onChange={rateChangeHandler}
                                        onBlur={validateRateHandler}
                                        placeholder="Rate"></input>
                                </div>
                                <div>
                                    {add && productState.rateIsValid !== true ? "Enter a valid rate" : ''
                                    }
                                </div>
                            </div>


                            <button onClick={cancelProduct}>Cancel</button>
                            <button type="submit">Add</button>
                        </form>
                    )
                    :
                    ''
            }


            <button onClick={() => setshowadd(true)} style={{ margin: " 30px 0px" }}>Add Item</button>
        </div>


    )
}

export default ProductForm;