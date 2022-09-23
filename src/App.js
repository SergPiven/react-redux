import { useDispatch, useSelector } from "react-redux";
import {
  addCustomerAction,
  removeCustomerAction,
} from "./store/customerReducer";

import "./App.css";
import { fetchCustomers } from "./asyncAction/customers";

function App() {
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.cash.cash);
  const customer = useSelector((state) => state.customers.customers);

  const userStr = " Users not found";

  const addCash = (cash) => {
    dispatch({ type: "ADD_CASH", payload: cash });
  };

  const getCash = (cash) => {
    dispatch({ type: "GET_CASH", payload: cash });
  };

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    };
    dispatch(addCustomerAction(customer));
  };

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id));
  };

  console.log(cash);
  return (
    <div className={"App"}>
      <div style={{ fontSize: "2rem" }}> Balance: {cash}</div>
      <div>
        <button onClick={() => addCash(Number(prompt()))}> Add cash</button>
        <button onClick={() => getCash(Number(prompt()))}> Get cash</button>
        <button onClick={() => addCustomer(prompt())}> Add customer</button>
        <button onClick={() => dispatch(fetchCustomers())}>
          Add customers from base
        </button>
      </div>
      {customer.length > 0 ? (
        <div>
          {customer.map((customer) => (
            <div
              style={{ fontSize: "2rem", marginTop: 20 }}
              onClick={() => removeCustomer(customer)}
            >
              {customer.name}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: "2rem", marginTop: 20 }}>{userStr}</div>
      )}
    </div>
  );
}

export default App;
