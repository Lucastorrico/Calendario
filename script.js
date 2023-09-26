const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");
const sendRequestButton = document.getElementById("sendRequestButton");
const selectedDateField = document.getElementById("selectedDateField");
const nameEnter = document.getElementById("nameEnter");
const seeVacation =document.getElementById("seeVacations");
const vacaciones =document.getElementById("vacaciones");

const fechas=JSON.parse(localStorage.getItem("fechas"))

const dates=[];

function createDate(date,name){
  var vacaciones={
   date:date,
   name:name
  }
  dates.unshift(vacaciones);
}

for (fe in fechas){
  createDate(fechas[fe]["date"],fechas[fe]["name"])
  // console.log(fechas[fe])
}



let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const selectedDates = new Set();

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
  let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    let isSelected = selectedDates.has(i) ? "selected" : "";
    liTag += `<li class="${isToday} ${isSelected}" data-day="${i}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  const days = daysTag.querySelectorAll("li");
  days.forEach((day) => {
    day.addEventListener("click", () => {
      const selectedDay = day.getAttribute("data-day");
      const selectedDate = new Date(currYear, currMonth, selectedDay); // Crea un objeto Date completo
      if (selectedDates.has(selectedDate.getTime())) {
        selectedDates.delete(selectedDate.getTime());
      } else {
        selectedDates.add(selectedDate.getTime());
      }
  
      // Actualiza el campo de entrada con las fechas seleccionadas
      updateSelectedDateField();
      day.classList.toggle("selected");
    });
  });
};

const updateSelectedDateField = () => {
  const sortedDates = Array.from(selectedDates).sort((a, b) => a - b);
  const selectedDateText = sortedDates
    .map((timestamp) => {
      const selectedDate = new Date(timestamp);
      const day = selectedDate.getDate();
      const monthName = months[selectedDate.getMonth()];
      const year = selectedDate.getFullYear();
      return `${day} ${monthName} ${year}`;
    })
    .join(", ");
  selectedDateField.value = selectedDateText;

  // Muestra u oculta el botón "Enviar Solicitud" según si hay fechas seleccionadas
  sendRequestButton.style.display = selectedDates.size > 0 ? "block" : "none";
};

renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0) {
      currMonth = 11;
      currYear--;
    } else if (currMonth > 11) {
      currMonth = 0;
      currYear++;
    }

    renderCalendar();
  });
});

sendRequestButton.addEventListener("click", () => {
  const selectedDate = selectedDateField.value;
  createDate(selectedDate,nameEnter.value)
  alert(`Solicitud enviada para las fechas: ${selectedDate} por ${nameEnter.value}`);
  // selectedDateField.value=null
  // localStorage.removeItem("fechas")
  localStorage.setItem("fechas",JSON.stringify(dates));
  console.log(JSON.parse(localStorage.getItem("fechas")))
  // nameEnter.value=null
  
});

seeVacation.addEventListener("click",()=>{
  for (fe in dates){
    const vacacion=document.createElement("p")
    vacacion.innerHTML=dates[fe]["name"]+" se tomo el "+dates[fe]["date"]
    vacaciones.appendChild(vacacion)
    console.log(vacacion)
  }
})

// console.log(JSON.parse(localStorage.getItem("fechas")))
console.log(dates);
//localStorage.removeItem("fechas")
