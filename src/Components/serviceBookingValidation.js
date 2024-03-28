export default function ServiceBookingFormValidation( selectedDate, streetAddress, city, state, zipCode) {
    const errors = {};

   

    if (selectedDate === "") {
        errors.selectedDate = "Date is required";
    }

    if (streetAddress === "") {
        errors.streetAddress = "Street address is required";
    }

    if (city === "") {
        errors.city = "City is required";
    }

    if (state === "") {
        errors.state = "State is required";
    }

    if (zipCode === "") {
        errors.zipCode = "Zip code is required";
    } else if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(zipCode)) {
        errors.zipCode = "Invalid postal code format";
    }


    return errors;
}