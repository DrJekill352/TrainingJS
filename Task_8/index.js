( function () {
    if(performance.navigation.type == performance.navigation.TYPE_RELOAD){
        localStorage.clear();
    }else {}
})();

function getFormInfo() {
    var _label = document.querySelector(".mp--form-field-label--input").value;
    var _choisTypeIndex = getSelectOption(".mp--form-choice-type--dropbox");
    var _chois = new Array();
    var _inWrap = document.querySelector(".mp--form-checkbox--checkbox").checked;

    var _firstValueRadio = checkRadio(".mp--form-choice--first-field-radio-button")
    if (_firstValueRadio != false) {
        _chois.push(_firstValueRadio);
    }

    var _secondValueRadio = checkRadio(".mp--form-choice--second-field-radio-button")
    if (_secondValueRadio != false) {
        _chois.push(_secondValueRadio);
    }

    var info = new formInfo(_label, _choisTypeIndex, _chois, _inWrap);
    return info;
}

function formInfo(label, _choisTypeIndex, chois, inWrap) {
    this.label = label;
    this._choisTypeIndex = _choisTypeIndex;
    this.chois = chois;
    this.inWrap = inWrap;
}

function isActiveFild(nameRadio) {
    return document.querySelector(nameRadio).checked;
}

function getSelectOption(nameSelect) {
    var _select = document.querySelector(nameSelect);
    var _valueSelectOptionIndex = _select.selectedIndex;
    return _valueSelectOptionIndex;
}

function checkRadio(nameField) {
    if (isActiveFild(nameField + " .mp--form-choice--radio-button")) {
        var _choisValue = document.querySelector(nameField + " .mp--form-choice--text-radio-button").value;
        return _choisValue;
    } else {
        return false;
    }
}


function writeStorage() {
    var _newStorage = new getFormInfo();

    localStorage.setItem("_label", _newStorage.label);
    localStorage.setItem("_choisTypeIndex", _newStorage._choisTypeIndex);
    localStorage.setItem("_inWrap", _newStorage.inWrap);

    for (var i = 0; i < _newStorage.chois.length; i++) {
        localStorage.setItem("_chois_" + i, _newStorage.chois[i]);
    }
}

function writeInfoForm() {
    var _label = document.querySelector(".mp--form-field-label--input").value = localStorage.getItem("_label");
    if (localStorage.getItem("_inWrap") != "false") {
        var _inWrap = document.querySelector(".mp--form-checkbox--checkbox").checked = localStorage.getItem("_inWrap");
    }
    var _firstValueRadio = localStorage.getItem("_chois_0");
    if (_firstValueRadio != undefined) {
        var _firstChoisValue = document.querySelector(".mp--form-choice--first-field-radio-button .mp--form-choice--text-radio-button");
        _firstChoisValue.value = _firstValueRadio;
        var _firstRadioButton = document.querySelector(".mp--form-choice--first-field-radio-button .mp--form-choice--radio-button");
        _firstRadioButton.checked = true;
    }

    var _secondValueRadio = localStorage.getItem("_chois_1");
    if (_secondValueRadio != undefined) {
        var _secondChoisValue = document.querySelector(".mp--form-choice--second-field-radio-button .mp--form-choice--text-radio-button");
        _secondChoisValue.value = _secondValueRadio;
        var _secondRadioButton = document.querySelector(".mp--form-choice--second-field-radio-button .mp--form-choice--radio-button");
        _secondRadioButton.checked = true;
    }

    var _select = document.querySelector(".mp--form-choice-type--dropbox");
    _select.selectedIndex = localStorage.getItem("_choisTypeIndex");
}

var checkInStorage = (function () {
    if (localStorage.length > 0) {
        return true;
    }
    else {
        return false;
    }
})();

if (checkInStorage) {
    try {
        writeInfoForm();
    } catch (error) {
        console.log("Error, Null referens");
    }
}
else {
}



