this.CLASS_NAME_DAY = "calendar--day";
this.CLASS_NAME_WEEK = "calendar--week";
this.CLASS_NAME_EMPTY_SELL = " calendar--empty-sell";
this.CLASS_NAME_CURRENT_DAY = " calendar--current-day";
this.NAME_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
this.SMALL_NAME_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
this.CALENDAR_DOM_ELEMENT = document.querySelector(".calendar--calendar");
this.INPUT_MONTH_DATE_DOM_ELEMENT = document.querySelector("[name=date]");
this.SHOW_CALENDAR_BUTTON_DATE_DOM_ELEMENT = document.querySelector("[name=button]");
this.SHOW_NEXT_MONTH_DOM_ELEMENT = document.querySelector(".calendar--nextMonth-button");
this.SHOW_PRE_MONTH_DOM_ELEMENT = document.querySelector(".calendar--preMonth-button");
this.MONTH_DATE_DOM_ELEMENT = document.querySelector(".calendar--month-date");

function Calendar() {
    this.getMonthDates = function (selectMonthDate) {
        var selectMonthLastDateNumber = getCurrentMonthLastDateNumber(selectMonthDate);
        var arrayMonthDates = [];

        for (var day = 1; day <= selectMonthLastDateNumber; day++) {
            monthDay = new Date(selectMonthDate.getFullYear(), selectMonthDate.getMonth(), day);
            arrayMonthDates.push(monthDay);
        }

        return arrayMonthDates;
    }

    this.getCurrentDayDate = function () {
        var currentDayDate = new Date();
        return currentDayDate;
    }

    this.setSelectDayDate = function (selectDayDate) {
        selectDayDateString = "Your select " + selectDayDate.getMonth() + "." + selectDayDate.getDate() + "." + selectDayDate.getFullYear();
        console.log(selectDayDateString);
    }

    var getCurrentMonthLastDateNumber = function (selectMonthDate) {
        var nextMonthDate = new Date(selectMonthDate.getFullYear(), selectMonthDate.getMonth() + 1);
        var selectMonthLastDate = new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), 0);
        var selectMonthLastDateNumber = selectMonthLastDate.getDate();

        return selectMonthLastDateNumber;
    }
}

function CalendarStrategy() {

    var calendar = new Calendar();

    var showInputMonth = function () {
        var inputDate = getInputMonthDate();
        var monthDates = calendar.getMonthDates(inputDate);
        removeCalendarChildren();
        drawSelectMonth(monthDates);
    }

    var showNextInputMonth = function () {
        var inputDate = getInputMonthDate();
        var nextMonthDate = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1);
        chengeInputDate(nextMonthDate);
        var monthDates = calendar.getMonthDates(nextMonthDate);
        removeCalendarChildren();
        drawSelectMonth(monthDates);
    }

    var showPreInputMonth = function () {
        var inputDate = getInputMonthDate();
        var preMonthDate = new Date(inputDate.getFullYear(), inputDate.getMonth() - 1);
        chengeInputDate(preMonthDate);
        var monthDates = calendar.getMonthDates(preMonthDate);
        removeCalendarChildren();
        drawSelectMonth(monthDates);
    }

    var chengeInputDate = function (newDate) {
        var stringNewDate = newDate.getFullYear() + " " + (newDate.getMonth() + 1);
        INPUT_MONTH_DATE_DOM_ELEMENT.value = stringNewDate;
    }

    var removeCalendarChildren = function () {
        var calendarChildren = CALENDAR_DOM_ELEMENT.children;
        var countCalendarChildren = calendarChildren.length;
        for (var index = 0; index < countCalendarChildren; index++) {
            CALENDAR_DOM_ELEMENT.removeChild(calendarChildren[0]);
        }
    }

    var drawSelectMonth = function (monthDates) {
        var weeks = getMonthWeeks(monthDates);

        for (var index = 0; index < weeks.length; index++) {
            var weekDomElement = getWeekDomElement(weeks[index])
            CALENDAR_DOM_ELEMENT.appendChild(weekDomElement);
        }
    }

    var getMonthWeeks = function (monthDates) {
        var weeks = [];
        var firstWeekDates = getFirstWeekDates(monthDates);
        weeks.push(firstWeekDates);

        var isUndefined = false;
        while (!isUndefined) {
            var lastWeek = weeks[weeks.length - 1];
            var lastWeekLastDate = lastWeek[lastWeek.length - 1];
            if (lastWeekLastDate == undefined) {
                isUndefined = true;
            } else {
                weeks.push(getWeekDates(monthDates, lastWeekLastDate.getDate()));
            }
        }
        return weeks;
    }

    var getFirstWeekDates = function (monthDates) {
        var newMonthDates = monthDates.slice();
        var monthFirstDayDate = newMonthDates[0].getDay();
        var firstWeekLastDayDate = getFirstWeekLastDayDate(newMonthDates);

        var firstWeekDates = [];
        for (var index = monthFirstDayDate; index < 7; index++) {
            firstWeekDates[index] = newMonthDates.shift();
        }

        return firstWeekDates;
    }

    var getFirstWeekLastDayDate = function (monthDates) {
        var firstWeekLastDayDate = null;
        for (var index = 0; index < monthDates.length; index++) {
            if (monthDates[index].getDay() == 6) {
                weekLastDayDate = monthDates[index];
                break;
            }
        }
        return weekLastDayDate;
    }

    var getWeekDates = function (monthDates, weekStartDate) {
        var weekDates = [];
        var weekLenght = 7;

        for (var currentWeekDate = weekStartDate; currentWeekDate < weekStartDate + weekLenght; currentWeekDate++) {
            var date = monthDates[currentWeekDate];
            weekDates.push(date);
        }

        return weekDates;
    }

    var getWeekDomElement = function (weekDays) {
        var weekDomElement = document.createElement('div');
        weekDomElement.className = CLASS_NAME_WEEK;
        for (var index = 0; index < weekDays.length; index++) {
            var dayDomElement = getDayDomElement(weekDays[index]);
            weekDomElement.appendChild(dayDomElement);
        }

        return weekDomElement;
    }

    var getDayDomElement = function (dayNumber) {
        var dayDomElement = document.createElement('div');
        dayDomElement.className = CLASS_NAME_DAY;
        if (dayNumber != undefined) {
            dayDomElement.innerHTML = dayNumber.getDate();
        } else {
            dayDomElement.innerHTML = "";
            dayDomElement.className += CLASS_NAME_EMPTY_SELL;
        }
        return dayDomElement;
    }

    var getInputMonthDate = function () {
        var inputMonthDateStringValue = INPUT_MONTH_DATE_DOM_ELEMENT.value;

        if (inputMonthDateStringValue) {
            var inputMonthDateValue = getMonthDate(inputMonthDateStringValue);

            if (inputMonthDateValue.year == null || inputMonthDateValue.month == null) {
                var inputMonthDateStringValue = prompt("Error. Invalid input value. Repeat input");
                inputMonthDateValue = getMonthDate(inputMonthDateStringValue);
            }

            var inputMonthDate = new Date(inputMonthDateValue.year, inputMonthDateValue.month);
            return inputMonthDate;
        }
    }

    var getMonthDate = function (dateString) {

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
            month: null
        }
        inputMonthDate.year = year;
        inputMonthDate.month = month;

        return inputMonthDate;
    }

    var getMonthNumber = function (monthString) {
        for (var index = 0; index < NAME_MONTHS.length; index++) {
            if (NAME_MONTHS[index] == monthString) {
                return index;
            }
        }
        for (var index = 0; index < SMALL_NAME_MONTHS.length; index++) {
            if (SMALL_NAME_MONTHS[index] == monthString) {
                return index;
            }
        }
        return (+monthString - 1);
    }

    var showSelectMonthDate = function () {
        var calendarDate = getInputMonthDate();
        var monthNumber = calendarDate.getMonth();
        var year = calendarDate.getFullYear();
        var stringDate = NAME_MONTHS[monthNumber] + " " + year;

        MONTH_DATE_DOM_ELEMENT.innerText = stringDate;
    }

    var showCalendarInfo = function () {
        var monthInfo = document.querySelector(".calendar--month-info");
        monthInfo.style.display = "flex";
        var infoRow = document.querySelector(".calendar--info-row");
        infoRow.style.display = "flex";
    }

    var selectDate = function (event) {
        var selectDayDomElement = event.target;
        var selectDay = selectDayElement.innerText;
        var selectMonth = getInputMonthDate();
        var selectDayDate = new Date(selectMonth.getFullYear(), selectMonth.getMonth(), selectDay);
        calendar.setSelectDayDate(selectDayDate);
    }

    var viewCurrentDate = function () {
        var currentDayDate = calendar.getCurrentDayDate();
        var selectDate = getInputMonthDate();
        var currentDateDomElement = null;
        if (selectDate.getFullYear() == currentDayDate.getFullYear()) {
            if (selectDate.getMonth() == currentDayDate.getMonth()) {
                var datesDomElements = document.querySelectorAll("." + CLASS_NAME_DAY);
                for (var index = 0; index < datesDomElements.length; index++) {
                    if (datesDomElements[index].innerText == currentDayDate.getDate()) {
                        currentDateDomElement = datesDomElements[index];
                        break;
                    }
                }
            }
        }
        if (currentDateDomElement != null) {
            currentDateDomElement.className += CLASS_NAME_CURRENT_DAY;
        }
    }

    document.querySelector(".calendar").addEventListener("click", viewCurrentDate);
    CALENDAR_DOM_ELEMENT.addEventListener("click", selectDate);
    SHOW_CALENDAR_BUTTON_DATE_DOM_ELEMENT.addEventListener("click", showInputMonth);
    SHOW_CALENDAR_BUTTON_DATE_DOM_ELEMENT.addEventListener("click", showSelectMonthDate);
    SHOW_CALENDAR_BUTTON_DATE_DOM_ELEMENT.addEventListener("click", showCalendarInfo);
    SHOW_PRE_MONTH_DOM_ELEMENT.addEventListener("click", showPreInputMonth);
    SHOW_PRE_MONTH_DOM_ELEMENT.addEventListener("click", showSelectMonthDate);
    SHOW_NEXT_MONTH_DOM_ELEMENT.addEventListener("click", showNextInputMonth);
    SHOW_NEXT_MONTH_DOM_ELEMENT.addEventListener("click", showSelectMonthDate);
}

var CalendarRendar = {
    
}

var calendarStrategy = new CalendarStrategy();