(function () {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        localStorage.clear();
    }

    if (localStorage.length > 0) {
        try {
            writeInfoForm();
        } catch (error) {
            console.log(error);
        }
    }
})();

function formObjects() {
    var classNameLabel = ".mp--form-field-label--input";
    this.label = document.querySelector(classNameLabel);

    var classNameCheckbox = ".mp--form-checkbox--checkbox";
    this.inWrap = document.querySelector(classNameCheckbox);

    var classNameFirstChoisRadioButton = "mp--form-choice--first-radio-button";
    this.firstRadioButton = document.querySelector();

    var classNameFirstChoisInput = "mp--form-choice--first-text-radio-button";
    this.firstChoisInput = document.querySelector();

    var classNameSecondChoisRadioButton = "mp--form-choice--second-radio-button";
    this.secondRadioButton = document.querySelector();

    var classNameSecondChoisInput = "mp--form-choice--second-text-radio-button";
    this.secondChoisInput = document.querySelector();

    var classNameChoisType = ".mp--form-choice-type--dropbox";
    this.choisType = document.querySelector(classNameChoisType);
}


function writeStorage() {
    var form = new formObjects();
    var labelValue = form.label.value;
    var choisTypeIndex = getSelectOption(form.choisType);
    var inWrap = form.inWrap.checked;

    localStorage.setItem("labelValue", labelValue);
    localStorage.setItem("choisTypeIndex", choisTypeIndex);

    var isCheckedFirstRadioButton = form.firstRadioButton.checked
    if (isCheckedFirstRadioButton) {
        var firstChoisInputValue = form.firstChoisInput.value;
        localStorage.setItem("firstChoisInputValue", firstChoisInputValue);
    }

    var isCheckedSecondRadioButton = form.secondRadioButton.checked
    if (isCheckedSecondRadioButton) {
        var secondChoisInputValue = form.secondChoisInput.value;
        localStorage.setItem("secondChoisInputValue", secondChoisInputValue);
    }

    localStorage.setItem("inWrap", inWrap);

}

function writeInfoForm() {
    var form = new formObjects();

    var labelValue = localStorage.getItem("labelValue");
    var choisTypeIndex = localStorage.getItem("choisTypeIndex");
    var inWrap = localStorage.getItem("inWrap");

    var firstChoisInputValue = localStorage.getItem("firstChoisInputValue");
    var isCheckedFirstRadioButton = false;
    if (firstChoisInputValue != undefined) {
        isCheckedFirstRadioButton = true;
        form.firstChoisInput.value = firstChoisInputValue;
        form.firstRadioButton.checked = isCheckedFirstRadioButton;
    }

    var secondChoisInputValue = localStorage.getItem("secondChoisInputValue");
    var isCheckedSecondRadioButton = false;
    if (secondChoisInputValue != undefined) {
        isCheckedSecondRadioButton = true;
        form.secondChoisInput.value = secondChoisInputValue;
        form.secondRadioButton.checked = isCheckedSecondRadioButton;
    }

    form.label.value = labelValue;
    form.choisType.selectedIndex = choisTypeIndex;

    if (inWrap != "false") {
        form.inWrap.checked = true;
    }
}

function getSelectOption(select) {
    var valueSelectOptionIndex = select.selectedIndex;
    return valueSelectOptionIndex;
}



