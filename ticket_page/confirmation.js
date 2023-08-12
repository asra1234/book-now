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
    let fullnameInput=localStorage.getItem('fullname');
    let emailInput=localStorage.getItem('email');
    let genderInput=localStorage.getItem('gender');
    let numberInput=localStorage.getItem('Mobilenumber');

    calculatetotal(member)
    const totalData = document.getElementById('dateid');
    totalData.innerText = date;

    const starttime = document.getElementById('starttime');
    starttime.innerText = checkin;

    const endtime = document.getElementById('endtime');
    endtime.innerText = checkout;

    const selectduration = document.getElementById('selectduration');
    selectduration.innerText = duration+" hours";

    const email=document.getElementById("email");
    email.innerText=emailInput;

    const Mobilenumber=document.getElementById("Mobilenumber");
    Mobilenumber.innerText=numberInput;

    const fullname=document.getElementById("fullname");
    fullname.innerText=fullnameInput;

    const gender=document.getElementById("gender");
    gender.innerText=genderInput;

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