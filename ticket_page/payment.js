
document.getElementById("submit").addEventListener("click", function(event) {
event.preventDefault();
  window.location.href="confirmation.html";
  var cardNumber = document.getElementById("cardnumber").value;
  var expiryDate = document.getElementById("edate").value;
  var cvc = document.getElementById("cvc").value;
  var cardHolderName = document.getElementById("noc").value;

  if (!isValidCardNumber(cardNumber)) {
    alert("Invalid card number");
    return;
  }

  if (!isValidCVC(cvc)) {
    alert("Invalid CVC");
    return;
  }

  if (!isValidCardHolderName(cardHolderName)) {
    alert("Invalid cardholder name");
    return;
  }

  alert("Payment submitted successfully!");
});

function isValidCardNumber(cardNumber) {

  return /^\d{16}$/.test(cardNumber); 
}

function isValidExpiryDate(expiryDate) {
  const currentYear = new Date().getFullYear();
  const expiryMonth = parseInt(document.getElementById('edate').value, 10);
  const expiryYear = parseInt(document.getElementById('edate1').value, 10);

  if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < new Date().getMonth() + 1)) {
    alert('Invalid expiration date. Please enter a valid future date.');
  } else {
    // Proceed with payment processing
    alert('Payment successful!');
    // You can add more code here to submit the payment data to your backend
  }
  
  // return /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate); 
 
}

function isValidCVC(cvc) {
  
  return /^\d{3,4}$/.test(cvc); 
}

function isValidCardHolderName(name) {
  
  return /^[a-zA-Z\s]+$/.test(name);
}
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