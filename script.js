//To render a calendar

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const prevMonth = document.querySelector("#showPrevMonth");
const nextMonth = document.querySelector("#showNextMonth");

const date = document.querySelector(".date");
const body = document.querySelector(".body");
const closeEventPopup = document.querySelector("#closeEvent");
const btnAddEvent = document.querySelector("#btnAddEvent");
const eventTitle = document.querySelector("#eventTitle");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const monthYear = document.querySelector("#monthYear");
renderCalendar(currentYear, currentMonth);

function renderCalendar(year, month) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  const tbleBody = document.querySelector("#calendarDates");

  tbleBody.innerHTML = "";

  monthYear.innerText = months[month] + " " + year;

  let date = 1;

  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");
      if (i === 0 && j < firstDay) {
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);

        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(date);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell.classList.add("date");
        cell.addEventListener("click", function () {
          body.classList.add("show");
          this.classList.add("active");
        });
      }
      date++;
    }
    tbleBody.appendChild(row);
  }
}

nextMonth.addEventListener("click", function () {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  renderCalendar(currentYear, currentMonth);
});

prevMonth.addEventListener("click", function () {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  renderCalendar(currentYear, currentMonth);
});

closeEventPopup.addEventListener("click", function () {
  closeEventPopupWindow();
});

btnAddEvent.addEventListener("click", function () {
  const selectedTd = document.querySelector(".active");
  const span = document.createElement("span");
  const dateTd = document.querySelectorAll(".date");
  localStorage.setItem(eventTitle.value, eventTitle.value);
  span.innerHTML = localStorage.getItem(eventTitle.value);
  selectedTd.appendChild(span);
  dateTd.forEach(function (item) {
    item.classList.remove("active");
  });
  eventTitle.value = "";
  closeEventPopupWindow();
});

function closeEventPopupWindow() {
  body.classList.remove("show");
}
