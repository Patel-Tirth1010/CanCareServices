import React from 'react';
import "../Styles/radioButtonGroup.css"

function RadioButtonGroup(props) {
  return (
    <div>
    <h3>Please select Login As:</h3>
    <div className="radio-container">
    <label>
      <input type="radio" value="Customer" checked={props.selectedOption === 'Customer'} onChange={props.handleChange} />
      Customer
    </label>
    <label>
      <input type="radio" value="Employee" checked={props.selectedOption === 'Employee'} onChange={props.handleChange} />
      Employee
    </label>
    <label>
      <input type="radio" value="Admin" checked={props.selectedOption === 'Admin'} onChange={props.handleChange} />
      Admin
    </label>
  </div>
  </div>
  );
}

export default RadioButtonGroup;