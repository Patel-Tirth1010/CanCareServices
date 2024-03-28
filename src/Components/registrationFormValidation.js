export default function RegistrationFormValidation(fName,lName, password, email){

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;




const errors = {}


if(fName === ""){
    errors.fName = "FirstName is required";
}
if(lName === ""){
    errors.lName = "LastName is required";
}

if(email === ""){
    errors.email = "Email is Required";
}
else if(!emailRegex.test(email)) {
    errors.email = "Wrong email format";
}


if(password === "")
errors.password = "Password is Required";

else if(!passwordRegex.test(password)) {
    errors.password = "Must Contain one digit One lowercase letter One Uppercase letter Minimum Length 8 Characters";
}


    return errors;

} 


