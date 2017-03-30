this.CLASS_NAME_DAY = "calendar--day";
this.CLASS_NAME_WEEK = "calendar--week";
this.CLASS_NAME_CURRENT_DAY = " calendar--current-day";
this.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
this.SMALL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
this.CLASS_NAME_EMPTY_SELL = " calendar--empty-sell";

function getArrayDatesMonth(monthCurrentDate) {
    var numberLastDateCurrentMonth = getCurrentMonthLastDateNumber(monthCurrentDate);
    var arrayDatesMonth = [];

    var day = 1;
    for (var index = 0; index < numberLastDateCurrentMonth; index++) {
        arrayDatesMonth[index] = new Date(monthCurrentDate.getFullYear(), monthCurrentDate.getMonth(), day);
        day++;
    }

    return arrayDatesMonth;
}

function getCurrentMonthLastDateNumber(monthCurrentDate) {
    var monthNextDate = new Date(monthCurrentDate.getFullYear(), monthCurrentDate.getMonth() + 1);
    var lastDateCurrentMonth = new Date(monthNextDate.getFullYear(), monthNextDate.getMonth(), 0);
    var numberLastDateCurrentMonth = lastDateCurrentMonth.getDate();

    return numberLastDateCurrentMonth;
}


function drawCalendar(arrayDatesMonth) {
    var arrayWeeks = [];
    arrayWeeks.push(getArrayFirstWeekDates(arrayDatesMonth));
    while (true) {
        var lastWeek = arrayWeeks[arrayWeeks.length - 1];
        var lastdateLastWeek = lastWeek[lastWeek.length - 1];
        if (lastdateLastWeek == undefined) {
            break;
        } else {
            arrayWeeks.push(getArrayWeekDates(arrayDatesMonth, lastdateLastWeek.getDate()));
        }
    }
    var calendar = document.querySelector(".calendar--calendar");

    for (var index = 0; index < arrayWeeks.length; index++) {
        calendar.appendChild(getWeekElement(arrayWeeks[index]));
    }
}

function removeChildren() {
    var calendar = document.querySelector(".calendar--calendar");
    var children = calendar.children;
    var countChildren = children.length;
    for (var index = 0; index < countChildren; index++) {
        calendar.removeChild(children[0]);
    }
}

function getArrayFirstWeekDates(arrayDatesMonth) {
    var monthFirstDateDay = arrayDatesMonth[0].getDay();
    var monthEndFirstWeekDate;
    for (var index = 0; index < arrayDatesMonth.length; index++) {
        if (arrayDatesMonth[index].getDay() == 6) {
            monthEndFirstWeekDate = arrayDatesMonth[index];
            break;
        }
    }
    var arrayFirstWeekDates = [];
    var iterator = 0;
    for (var index = monthFirstDateDay; index < 7; index++) {
        arrayFirstWeekDates[index] = arrayDatesMonth[iterator];
        iterator++;
    }
    return arrayFirstWeekDates;
}

function getArrayWeekDates(arrayDatesMonth, startWeekDate) {
    var arrayWeekDates = [];
    var currentWeekDate = startWeekDate;
    var lenghtWeek = 7;
    for (var index = 0; index < lenghtWeek; index++) {
        arrayWeekDates[index] = arrayDatesMonth[currentWeekDate];
        currentWeekDate++;
    }
    return arrayWeekDates;
}

function getWeekElement(arrayDatesWeek) {
    var arrayDaysElements = [];
    for (var index = 0; index < arrayDatesWeek.length; index++) {
        arrayDaysElements[index] = getDayElement(arrayDatesWeek[index]);
    }

    var week = document.createElement('div');
    week.className = CLASS_NAME_WEEK;
    for (var index = 0; index < arrayDaysElements.length; index++) {
        week.appendChild(getDayElement(arrayDatesWeek[index]));
    }

    return week;
}

function getDayElement(dayDate) {
    var day = document.createElement('div');
    day.className = CLASS_NAME_DAY;
    if (dayDate != undefined) {
        day.innerHTML = dayDate.getDate();
    } else {
        day.innerHTML = "";
        day.className += CLASS_NAME_EMPTY_SELL;
    }
    return day;
}

function viewSelectCalendar() {
    var calendarDate = getInputDate();
    var arrayDatesMonth = getArrayDatesMonth(calendarDate);
    removeChildren();
    drawCalendar(arrayDatesMonth);
}

function getInputDate() {
    var inputDateString = document.querySelector("[name=date]").value;
    if (inputDateString) {
        var inputMonthDate = getMonthDate(inputDateString);
        console.log(inputMonthDate);
        if (inputMonthDate.year == null || inputMonthDate.month == null) {
            var newInputDateString = prompt("Error. Invalid input value. Repeat input");
            inputMonthDate = getMonthDate(newInputDateString);
        }
        var calendarDate = new Date(inputMonthDate.year, inputMonthDate.month);
        return calendarDate;
    }
}

function getMonthDate(dateString) {

    var date = dateString.split(' ');
    var year = null;
    var month = null;
    if (date[0].length == 4 && !isNaN(date[0])) {
        year = date[0];
        month = getMonthNumber(date[1]);
    } else {
        year = date[1];
        month = getMonthNumber(date[0]);
    }

    var inputMonthDate = {
        year: null,
        monthNumber: null
    }
    inputMonthDate.year = year;
    inputMonthDate.month = month;

    return inputMonthDate;
}

function getMonthNumber(monthDateString) {
    for (var index = 0; index < MONTHS.length; index++) {
        if (MONTHS[index] == monthDateString) {
            return index;
        }
    }
    for (var index = 0; index < SMALL_MONTHS.length; index++) {
        if (SMALL_MONTHS[index] == monthDateString) {
            return index;
        }
    }
    return (+monthDateString - 1);
}

function viewSelectMonthDate() {
    var calendarDate = getInputDate();
    var monthNumber = calendarDate.getMonth();
    var year = calendarDate.getFullYear();
    var stringDate = MONTHS[monthNumber] + " " + year;
    var monthDateElement = document.querySelector(".calendar--month-date");
    monthDateElement.innerText = stringDate;
}

function viewNextMonth() {
    var selectCalendarDate = getInputDate();
    var nextCalendarDate = new Date(selectCalendarDate.getFullYear(), selectCalendarDate.getMonth() + 1);
    chengeInputDate(nextCalendarDate);
    var arrayDatesMonth = getArrayDatesMonth(nextCalendarDate);
    removeChildren();
    drawCalendar(arrayDatesMonth);
}

function viewPreMonth() {
    var selectCalendarDate = getInputDate();
    var preCalendarDate = new Date(selectCalendarDate.getFullYear(), selectCalendarDate.getMonth() - 1);
    chengeInputDate(preCalendarDate);
    var arrayDatesMonth = getArrayDatesMonth(preCalendarDate);
    removeChildren();
    drawCalendar(arrayDatesMonth);
}

function chengeInputDate(newDate) {
    var inputDate = document.querySelector("[name=date]");
    var stringNewDate = newDate.getFullYear() + " " + (newDate.getMonth() + 1);
    inputDate.value = stringNewDate;
}

function viewCurrentDate() {
    var currentDate = new Date();
    var selectDate = getInputDate();
    var currentDateElement = null;
    if (selectDate.getFullYear() == currentDate.getFullYear()) {
        if (selectDate.getMonth() == currentDate.getMonth()) {
            var dates = document.querySelectorAll("." + CLASS_NAME_DAY);
            for (var index = 0; index < dates.length; index++) {
                if (dates[index].innerText == currentDate.getDate()) {
                    currentDateElement = dates[index];
                    break;
                }
            }
        }
    }
    if (currentDateElement != null) {
        currentDateElement.className += CLASS_NAME_CURRENT_DAY;
    }
}


function showSelectDate(event) {
    var selectDayElement = event.target;
    var selectDay = selectDayElement.innerText;
    var selectMonth = getInputDate();
    var selectDate = new Date(selectMonth.getFullYear(), selectMonth.getMonth(), selectDay);
    var stringSelectDate = (selectDate.getMonth() + 1) + "." + selectDate.getDate() + "." + selectDate.getFullYear();
    console.clear();
    console.log(stringSelectDate);
}

function showCalendarInfo() {
    var monthInfo = document.querySelector(".calendar--month-info");
    monthInfo.style.display = "flex";
    var infoRow = document.querySelector(".calendar--info-row");
    infoRow.style.display = "flex";
}

document.querySelector(".calendar").addEventListener("click", viewCurrentDate);
document.querySelector(".calendar--calendar").addEventListener("click", showSelectDate);
document.querySelector("[name=button]").addEventListener("click", viewSelectCalendar);
document.querySelector("[name=button]").addEventListener("click", viewSelectMonthDate);
document.querySelector("[name=button]").addEventListener("click", showCalendarInfo);
document.querySelector(".calendar--preMonth-button").addEventListener("click", viewPreMonth);
document.querySelector(".calendar--preMonth-button").addEventListener("click", viewSelectMonthDate);
document.querySelector(".calendar--nextMonth-button").addEventListener("click", viewNextMonth);
document.querySelector(".calendar--nextMonth-button").addEventListener("click", viewSelectMonthDate);