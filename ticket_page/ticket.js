let member = localStorage.getItem('member');
member = {
  foreigneradult: { label: "Foreigner Adult", total: 0, count: 0 },
  foreignerchild: { label: "Foreigner Child", total: 0, count: 0 },
  sladult: { label: "SL Adult", total: 0, count: 0 },
  slchild: { label: "SL Child", total: 0, count: 0 },
  infant: { label: "Infant", total: 0, count: 0 }
}
localStorage.setItem('member', JSON.stringify(member))
localStorage.setItem('checkin', 7)
localStorage.setItem('checkout', 8)
localStorage.setItem('duration', 1)


var element = document.getElementById("my-calendar");
var myCalendar = jsCalendar.new(element);
myCalendar.onDateClick(function(event, date){
  myCalendar.set(date)
  date.setDate(date.getDate() + 1)
  const totalData = document.getElementById('dateid');
  totalData.innerText = date.toISOString().split('T')[0];
  const datedata = document.getElementById('select-date');
  datedata.value = date.toISOString().split('T')[0];
  localStorage.setItem('date', date.toISOString().split('T')[0])
});

function calculate(valueType, calcType = 'increment') {
  let member = JSON.parse(localStorage.getItem('member'));
  let hours = [];
  let peakhourCount = 0;
  let nonpeakhourCount = 0;
  let price = 0;
  let checkin = document.getElementById("checkin").value;
  let checkout = document.getElementById("checkout").value;

  const peakHours = [10, 11, 12,13, 15, 16, 17, 18];
  const prices = {
    "foreigneradult": { normal: 10, peak: 13 },
    "foreignerchild": { normal: 5, peak: 8 },
    "sladult": { normal: 4, peak: 6 },
    "slchild": { normal: 2, peak: 3 },
    "infant": { normal: 0, peak: 0 }
  }

  // get number of hours
  for (let i = checkin; Number(i) < Number(checkout); i++) {
    hours.push(i);
    if (peakHours.includes(i)) {
      peakhourCount++;
    } else {
      nonpeakhourCount++;
    }
  }

  if (calcType === 'increment') {
    member[valueType].count++;
  } else {
    member[valueType].count -= 1;
  }

  if (peakhourCount > 0) {
    price += prices[valueType].peak * member[valueType].count * peakhourCount;
    member[valueType].total = price;
  }
  if (nonpeakhourCount > 0) {
    price += prices[valueType].normal * member[valueType].count * nonpeakhourCount;
    member[valueType].total = price;
  }

  // display added total in table
  if (valueType !== 'infant') {
    const tableData = document.getElementById(`${valueType}td`);
    tableData.innerText = "$ " + member[valueType].total
  }

  calculatetotal(member);
  document.getElementById(valueType).value = member[valueType].count
  localStorage.setItem('member', JSON.stringify(member))
}
const visitdate = document.getElementById("select-date");
const dateontable = document.getElementById("dateid");

const checkout = document.getElementById("checkout").value;
const summarytable = document.getElementById("summary-table");
const timeontable = document.getElementById("selectetime");
const starttime = document.getElementById("starttime");
const endtime = document.getElementById("endtime");

const currentdate = new Date();
const year = currentdate.getFullYear();
const month = String(currentdate.getMonth() + 1).padStart(2, "0");
const day = String(currentdate.getDate() + 1).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;

visitdate.value = formattedDate;

function updatesummarytable() {
  const selectedDate = visitdate.value;

  const [year, month, day] = selectedDate.split("-");
  const formattedDate = `${year}-${month}-${day}`;
  dateontable.textContent = formattedDate;
  myCalendar.set(new Date(selectedDate))
  localStorage.setItem('date', selectedDate.toISOString().split('T')[0])
}

function updatetime(type) {
  let checkin = document.getElementById("checkin").value;
  let checkout = document.getElementById("checkout").value;

  if (type === "checkin") {
    starttime.innerText = formatdate(checkin) + " to ";
  } else {
    endtime.innerText = formatdate(checkout) + " ";

  }
  
  localStorage.setItem('checkin', formatdate(checkin))
  localStorage.setItem('checkout', formatdate(checkout))
  localStorage.setItem('duration', Number(checkout) - Number(checkin))
  document.getElementById("selectduration").innerText = Number(checkout) - Number(checkin) + " hours.";
}

function formatdate(hours) {
  const difference = hours - 12;
  if (difference > 0) {
    return difference + ":00 p.m";
  } else {
    return hours + ":00 a.m";
  }
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

function getDate() {
  const date = new Date();
  const totalData = document.getElementById('dateid');
  totalData.innerText = date.toISOString().split('T')[0];
  const datedata = document.getElementById('select-date');
  datedata.value = date.toISOString().split('T')[0];
  localStorage.setItem('date', date.toISOString().split('T')[0])
}

getDate();

function checkboxChange(value) {
  let member = JSON.parse(localStorage.getItem('member'));
  let div = document.getElementById(`${value}div`);
  let checkbox = document.getElementById(`${value}check`);
  if (checkbox.checked) {
    div.style.display = 'unset'
  } else {
    div.style.display = 'none'
    member[value].total = 0;
    member[value].count = 0;
    document.getElementById(value).value = 0;
  }

  localStorage.setItem('member', JSON.stringify(member))
}

