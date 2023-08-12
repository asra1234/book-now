// Selecting form and input elements
const form = document.querySelector("form");


// Function to display error message
const showError = (field, errorText) => {
    
    const input = document.getElementById(field);
    input.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    input.closest(".form-group").appendChild(errorElement);
}

// Function to handle form submission
const handleFormData = (e) => {
    e.preventDefault();

    // Retrieving input elements
    const fullnameInput = document.getElementById("fullname").value;
    const emailInput = document.getElementById("email").value;
    const c_emailInput = document.getElementById("c-email").value;
    const genderInput = document.getElementById("gender").value;
    const numberInput = document.getElementById("Mobilenumber").value;
    const continueButton = document.getElementById("submit").value;

    localStorage.setItem("fullname", fullnameInput);
    localStorage.setItem("email", emailInput);
    localStorage.setItem("c_emailInput", c_emailInput);
    localStorage.setItem("gender", genderInput);
    localStorage.setItem("Mobilenumber", numberInput);

    // Getting trimmed values from input fields
    const fullname = fullnameInput.trim();
    const email = emailInput.trim();
    const confirmemail = c_emailInput.trim();
    const Mobilenumber = numberInput.trim();
    const gender = genderInput.value;

    // Regular expression pattern for email and mobile number validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const MobilePttern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    // Clearing previous error messages
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    // Performing validation checks
    if (fullname === "") {
        showError("fullname", "Enter your full name");
    }
    if (!emailPattern.test(email)) {
        showError("email", "Enter a valid email address");
    }
    if (!emailPattern.test(confirmemail)) {
        showError("c-email", "confirm your email address");
    }
    if (!MobilePttern.test(Mobilenumber)) {
        showError("Mobilenumber", "Enter your Mobile number");
    }
    if (gender === "") {
        showError("gender", "Select your gender");
    }

    // Checking for any remaining errors before form submission
    const errorInputs = document.querySelectorAll(".form-group .error");
    if (errorInputs.length > 0) return;

  window.location.href="payment.html";


}


// Handling form submission event
form.addEventListener("submit", handleFormData);


document.addEventListener("DOMContentLoaded", function () {
    // Initialize intlTelInput
    const input = document.getElementById("Mobilenumber");
    const iti = window.intlTelInput(input, {
        preferredCountries: ["us", "gb"],
        separateDialCode: true,

    });

})

function calculatetotal(member) {
    let total = 0;

    for (let label of Object.keys(member)) {
        if (member[label].total > 0) {
            total += member[label].total
        }
    }
    const totalData = document.getElementById('totaltd');
    totalData.innerText = "$ " + total
}

function initialize() {
    let member = JSON.parse(localStorage.getItem('member'));
    let date = localStorage.getItem('date');
    let checkin = localStorage.getItem('checkin');
    let checkout = localStorage.getItem('checkout');
    let duration = localStorage.getItem('duration');

    calculatetotal(member)
    const totalData = document.getElementById('dateid');
    totalData.innerText = date;

    const starttime = document.getElementById('starttime');
    starttime.innerText = checkin;

    const endtime = document.getElementById('endtime');
    endtime.innerText = checkout;

    const selectduration = document.getElementById('selectduration');
    selectduration.innerText = duration+" hours";

    for (let label of Object.keys(member)) {
        if (label !== 'infant') {
            const tableData = document.getElementById(`${label}td`);
            tableData.innerText = "$ " + member[label].total
          }
    }

    localStorage.setItem('member', JSON.stringify(member))
    localStorage.setItem('date', date)
    localStorage.setItem('checkin', checkin)
    localStorage.setItem('checkout', checkout)
}

initialize();