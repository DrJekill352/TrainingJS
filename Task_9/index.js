this.CLASS_NAME_DAY = "calendar--day";
this.CLASS_NAME_WEEK = "calendar--week";
this.CLASS_NAME_EMPTY_SELL = " calendar--empty-sell";
this.CLASS_NAME_CURRENT_DAY = " calendar--current-day";
this.NAME_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
this.SMALL_NAME_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
this.WEEK_DAYS_NAME = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
this.CLASS_NAME_CALENDAR = "calendar--calendar";
this.INPUT_MONTH_DATE_SELECTOR = "[name=date]";
this.VIEW_CALENDAR_BUTTON_SELECTOR = "[name=button]";
this.CLASS_NAME_NEXT_MONTH_BUTTON = "calendar--nextMonth-button icon-right-arrow";
this.CLASS_NAME_PRE_MONTH_BUTTON = "calendar--preMonth-button icon-left-arrow";
this.CLASS_NAME_VIEW_MONTH_DATE = "calendar--month-date";
this.CLASS_NAME_MONTH_INFO = "calendar--month-info";
this.CLASS_NAME_INFO_ROW = "calendar--info-row";
this.CLASS_NAME_INFO_DAY = "calendar--info-day";
this.CLASS_NAME_CONTROL_BUTTONS = "calendar--control-buttons";

var getSelectDomElement = function (selectorString) {
    selectDomElement = document.querySelector(selectorString);

    return selectDomElement;
};

function Calendar() {
    this.getMonthDates = function (selectMonthDate) {
        var selectMonthLastDateNumber = getCurrentMonthLastDateNumber(selectMonthDate);
        var arrayMonthDates = [];

        for (var day = 1; day <= selectMonthLastDateNumber; day++) {
            monthDay = new Date(selectMonthDate.getFullYear(), selectMonthDate.getMonth(), day);
            arrayMonthDates.push(monthDay);
        }

        return arrayMonthDates;
    };

    this.getCurrentDayDate = function () {
        var currentDayDate = new Date();

        return currentDayDate;
    };

    this.setSelectDayDate = function (selectDayDate) {
        selectDayDateString = "Your select " + selectDayDate.getMonth() + "." + selectDayDate.getDate() + "." + selectDayDate.getFullYear();
        console.log(selectDayDateString);
    };

    var getCurrentMonthLastDateNumber = function (selectMonthDate) {
        var nextMonthDate = new Date(selectMonthDate.getFullYear(), selectMonthDate.getMonth() + 1);
        var selectMonthLastDate = new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), 0);
        var selectMonthLastDateNumber = selectMonthLastDate.getDate();

        return selectMonthLastDateNumber;
    };
}

function CalendarStrategy() {
    var calendar = new Calendar();

    var calendarRendar = new CalendarRendar();
    calendarRendar.drawCalendar();

    var showInputMonth = function () {
        var inputDate = calendarStrategy.getInputMonthDate();
        var monthDates = calendar.getMonthDates(inputDate);
        calendarRendar.removeCalendarChildren();
        calendarRendar.drawSelectMonth(monthDates);
    };

    var showNextInputMonth = function () {
        var inputDate = calendarStrategy.getInputMonthDate();
        var nextMonthDate = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1);
        calendarRendar.changeInputDate(nextMonthDate);
        var monthDates = calendar.getMonthDates(nextMonthDate);
        calendarRendar.removeCalendarChildren();
        calendarRendar.drawSelectMonth(monthDates);
    };

    var showPreInputMonth = function () {
        var inputDate = calendarStrategy.getInputMonthDate();
        var preMonthDate = new Date(inputDate.getFullYear(), inputDate.getMonth() - 1);
        calendarRendar.changeInputDate(preMonthDate);
        var monthDates = calendar.getMonthDates(preMonthDate);
        calendarRendar.removeCalendarChildren();
        calendarRendar.drawSelectMonth(monthDates);
    };

    this.getInputMonthDate = function () {
        var inputMonthDateStringValue = calendarRendar.getInputMonthDateStringValue();

        if (inputMonthDateStringValue) {
            var inputMonthDateValue = getMonthDate(inputMonthDateStringValue);

            if (inputMonthDateValue.year == null || inputMonthDateValue.month == null) {
                var inputMonthDateStringValue = prompt("Error. Invalid input value. Repeat input");
                inputMonthDateValue = getMonthDate(inputMonthDateStringValue);
            }

            var inputMonthDate = new Date(inputMonthDateValue.year, inputMonthDateValue.month);

            return inputMonthDate;
        }
    };

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
        };
        inputMonthDate.year = year;
        inputMonthDate.month = month;

        return inputMonthDate;
    };

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
    };

    var selectDate = function (event) {
        var selectDayDomElement = event.target;
        var selectDay = selectDayDomElement.innerText;
        var selectMonth = calendarStrategy.getInputMonthDate();
        var selectDayDate = new Date(selectMonth.getFullYear(), selectMonth.getMonth(), selectDay);
        calendar.setSelectDayDate(selectDayDate);
    };

    var calendarDomElement = getSelectDomElement("." + CLASS_NAME_CALENDAR);
    calendarDomElement.addEventListener("click", selectDate);

    var viewClaendarButton = getSelectDomElement(VIEW_CALENDAR_BUTTON_SELECTOR);
    viewClaendarButton.addEventListener("click", showInputMonth);
    viewClaendarButton.addEventListener("click", calendarRendar.showCalendarInfo);
    viewClaendarButton.addEventListener("click", calendarRendar.showSelectMonthDate);

    var preMonthDomElement = getSelectDomElement(".calendar--preMonth-button");
    preMonthDomElement.addEventListener("click", showPreInputMonth);
    preMonthDomElement.addEventListener("click", calendarRendar.showSelectMonthDate);

    var nextMonthDomElement = getSelectDomElement(".calendar--nextMonth-button");
    nextMonthDomElement.addEventListener("click", showNextInputMonth);
    nextMonthDomElement.addEventListener("click", calendarRendar.showSelectMonthDate);

    document.querySelector(".calendar--control-buttons").addEventListener("click", calendarRendar.viewCurrentDate);

}

var calendarStrategy = new CalendarStrategy();

function CalendarRendar() {

    var calendar = new Calendar();

    this.drawCalendar = function () {
        var calendarDomElement = getSelectDomElement(".calendar");
        calendarDomElement.appendChild(getInputFieldDomElement());
        calendarDomElement.appendChild(getControlButtonsDomElement());
        calendarDomElement.appendChild(getInfoRowDomElement());
        calendarDomElement.appendChild(getCalendarDomElement());
    };

    var getInputFieldDomElement = function () {
        var inputFieldDomElement = document.createElement("div");
        var classNameInputField = "calendar--input-fild";
        inputFieldDomElement.className = classNameInputField;

        inputFieldDomElement.appendChild(getInputDateDomElement());

        return inputFieldDomElement;
    };

    var getInputDateDomElement = function () {
        var inputDateDomElement = document.createElement("input");
        var classNameInputDate = "calendar--input-date";
        inputDateDomElement.className = classNameInputDate;
        inputDateDomElement.setAttribute("name", "date");
        inputDateDomElement.setAttribute("type", "text");

        return inputDateDomElement;
    };

    var getControlButtonsDomElement = function () {
        var controlButtonsDomElement = document.createElement("div");
        controlButtonsDomElement.className = CLASS_NAME_CONTROL_BUTTONS;

        controlButtonsDomElement.appendChild(getViewButtonDomElement());
        controlButtonsDomElement.appendChild(getMonthInfoDomElement());

        return controlButtonsDomElement;
    };


    var getViewButtonDomElement = function () {
        var viewMonthButtonDomElement = document.createElement("button");
        var classNameMonthButton = "calendar--view-button";
        viewMonthButtonDomElement.className = classNameMonthButton;
        viewMonthButtonDomElement.setAttribute("name", "button");
        viewMonthButtonDomElement.innerText = "View"
        return viewMonthButtonDomElement;
    };

    var getMonthInfoDomElement = function () {
        var monthInfoDomElement = document.createElement("div");
        monthInfoDomElement.className = CLASS_NAME_MONTH_INFO;

        monthInfoDomElement.appendChild(getPreMonthButtonDomElement());
        monthInfoDomElement.appendChild(getMonthDateDomElement());
        monthInfoDomElement.appendChild(getNextMonthButtonDomElement());

        return monthInfoDomElement;
    };
    var getPreMonthButtonDomElement = function () {
        var preMonthButtonDomElement = document.createElement("div");
        preMonthButtonDomElement.className = CLASS_NAME_PRE_MONTH_BUTTON;

        return preMonthButtonDomElement;
    };

    var getMonthDateDomElement = function () {
        var monthDateDomElement = document.createElement("div");
        monthDateDomElement.className = CLASS_NAME_VIEW_MONTH_DATE;

        return monthDateDomElement;
    };

    var getNextMonthButtonDomElement = function () {
        var nextMonthButtonDomElement = document.createElement("div");
        nextMonthButtonDomElement.className = CLASS_NAME_NEXT_MONTH_BUTTON;

        return nextMonthButtonDomElement;
    };

    var getInfoRowDomElement = function () {
        var infoRowDomElement = document.createElement("div");
        infoRowDomElement.className = CLASS_NAME_INFO_ROW;

        for (var dayNumber = 0; dayNumber < 7; dayNumber++) {
            var infoDayDomElement = getInfoDayDomElement(dayNumber);
            infoRowDomElement.appendChild(infoDayDomElement);
        }

        return infoRowDomElement;
    };

    var getInfoDayDomElement = function (dayNumber) {
        var infoDayDomElement = document.createElement("div");
        infoDayDomElement.className = CLASS_NAME_INFO_DAY;
        infoDayDomElement.innerText = WEEK_DAYS_NAME[dayNumber];

        return infoDayDomElement;
    };

    var getCalendarDomElement = function () {
        var calendarDomElement = document.createElement("div");
        calendarDomElement.className = CLASS_NAME_CALENDAR;

        return calendarDomElement;
    };

    this.removeCalendarChildren = function () {
        var calendarDomElement = getSelectDomElement("." + CLASS_NAME_CALENDAR);
        var calendarChildren = calendarDomElement.children;
        var countCalendarChildren = calendarChildren.length;

        for (var index = 0; index < countCalendarChildren; index++) {
            calendarDomElement.removeChild(calendarChildren[0]);
        }
    };

    this.getInputMonthDateStringValue = function () {
        var inputMonthDate = getSelectDomElement(INPUT_MONTH_DATE_SELECTOR);
        var inputMonthDateStringValue = inputMonthDate.value;
        return inputMonthDateStringValue;
    };

    this.drawSelectMonth = function (monthDates) {
        var weeks = getMonthWeeks(monthDates);
        var calendarDomElement = getSelectDomElement("." + CLASS_NAME_CALENDAR);

        for (var index = 0; index < weeks.length; index++) {
            var weekDomElement = getWeekDomElement(weeks[index]);
            calendarDomElement.appendChild(weekDomElement);
        }
    };

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
    };

    var getWeekDomElement = function (weekDays) {
        var weekDomElement = document.createElement('div');
        weekDomElement.className = CLASS_NAME_WEEK;
        for (var index = 0; index < weekDays.length; index++) {
            var dayDomElement = getDayDomElement(weekDays[index]);
            weekDomElement.appendChild(dayDomElement);
        }

        return weekDomElement;
    };

    var getFirstWeekDates = function (monthDates) {
        var newMonthDates = monthDates.slice();
        var monthFirstDayDate = newMonthDates[0].getDay();
        var firstWeekLastDayDate = getFirstWeekLastDayDate(newMonthDates);

        var firstWeekDates = [];
        for (var index = monthFirstDayDate; index < 7; index++) {
            firstWeekDates[index] = newMonthDates.shift();
        }

        return firstWeekDates;
    };

    var getWeekDates = function (monthDates, weekStartDate) {
        var weekDates = [];
        var weekLenght = 7;

        for (var currentWeekDate = weekStartDate; currentWeekDate < weekStartDate + weekLenght; currentWeekDate++) {
            var date = monthDates[currentWeekDate];
            weekDates.push(date);
        }

        return weekDates;
    };

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
    };

    var getFirstWeekLastDayDate = function (monthDates) {
        var firstWeekLastDayDate = null;
        for (var index = 0; index < monthDates.length; index++) {
            if (monthDates[index].getDay() == 6) {
                weekLastDayDate = monthDates[index];
                break;
            }
        }
        return weekLastDayDate;
    };

    this.changeInputDate = function (newDate) {
        var stringNewDate = newDate.getFullYear() + " " + (newDate.getMonth() + 1);
        var inputMonthDate = getSelectDomElement(INPUT_MONTH_DATE_SELECTOR);
        inputMonthDate.value = stringNewDate;
    };

    this.showSelectMonthDate = function () {
        var calendarDate = calendarStrategy.getInputMonthDate();
        var monthNumber = calendarDate.getMonth();
        var year = calendarDate.getFullYear();
        var stringDate = NAME_MONTHS[monthNumber] + " " + year;

        var viewMonthDate = getSelectDomElement("." + CLASS_NAME_VIEW_MONTH_DATE)
        viewMonthDate.innerText = stringDate;
    };

    this.showCalendarInfo = function () {
        var monthInfo = getSelectDomElement("." + CLASS_NAME_MONTH_INFO);
        monthInfo.style.display = "flex";
        var infoRow = getSelectDomElement("." + CLASS_NAME_INFO_ROW);
        infoRow.style.display = "flex";
    };

    this.viewCurrentDate = function () {
        var currentDayDate = calendar.getCurrentDayDate();
        var selectDate = calendarStrategy.getInputMonthDate();
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
    };
}