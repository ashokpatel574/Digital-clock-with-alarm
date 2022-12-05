const btnAlarm = document.querySelector(".btn-alarm");
const content = document.querySelector(".contents");
const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");

let alarmTime;
let audiofile = new Audio("./Assets/ringtone.mp3");
let isAlarmSet = false;

function selectHour() {
  for (let i = 12; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;

    let html = `<option value="${i}">${i}</option>`;

    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", html);
  }
}

function selectMinutes() {
  for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;

    let html = `<option value="${i}">${i}</option>`;

    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", html);
  }
}

function selectAMPM() {
  for (let i = 0; i < 2; i++) {
    let ampm = i === 1 ? "AM" : "PM";

    let html = `<option value="${ampm}">${ampm}</option>`;

    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", html);
  }
}

selectAMPM();
selectHour();
selectMinutes();

function setAlarm(e) {
  if (isAlarmSet) {
    alarmTime = "";
    audiofile.pause();
    content.classList.remove("disabled");
    btnAlarm.innerText = "Set Alarm";
    return (isAlarmSet = false);
  }
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AP/PM")
  ) {
    alert("Please select a valid time");
  }
  alarmTime = time;

  content.classList.add("disabled");
  btnAlarm.innerText = "Clear Alarm";
}

function setTime() {
  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let secs = date.getSeconds();
  let ampm;

  if (hour >= 12) {
    hour = hour - 12;
    ampm = "PM";
  } else {
    ampm = "AM";
  }

  // if hour value is 0, set value to 12;
  hour === 0 ? hour === 12 : hour;

  // adding 0 before hr, min, secs if this value is less than 10
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  secs = secs < 10 ? "0" + secs : secs;

  currentTime.innerText = `${hour}:${min}:${secs} ${ampm}`;

  if (alarmTime == `${hour}:${min} ${ampm}`) {
    audiofile.play();
    audiofile.loop = true;
    isAlarmSet = true;
  }
}

btnAlarm.addEventListener("click", setAlarm);
setInterval(setTime, 1000);
