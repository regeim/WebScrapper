let selectedClass = [];
let selectedCountry = [];

function callLoadTable () {
    loadClasses(selectedClass, selectedCountry);
}


$('#class_select').multiselect({
    selectAllValue: 'multiselect-all',
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true,
    maxHeight: '300',
    buttonWidth: '235',
    includeSelectAllOption: false,
    onChange: function (option, checked, select) {
        let value = $(option).val();
        selectedClass.includes(value) ? selectedClass = selectedClass.filter(x => x!= value) : selectedClass.push(value);
        callLoadTable();
        (selectedClass.length == 0 || selectedCountry.length == 0)? $("main").css("height", "800px") : $("main").css("height", "auto");
    },
    onInitialized: function(select, container) {
        let value = $(select).val();
        selectedClass = selectedClass.concat(value);
//        callLoadTable();
    }
});
$('#country-select').multiselect({
    selectAllValue: 'multiselect-all',
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true,
    maxHeight: '300',
    buttonWidth: '235',
    includeSelectAllOption: false,
    onChange: function (option, checked, select) {
        let value = $(option).val();
        selectedCountry.includes(value) ? selectedCountry = selectedCountry.filter(x => x!= value) : selectedCountry.push(value);
        callLoadTable();
        (selectedClass.length == 0 || selectedCountry.length == 0) ? $("main").css("height", "800px") : $("main").css("height", "auto");
    },
    onInitialized: function(select, container) {
        let value = $(select).val();
        selectedCountry = selectedCountry.concat(value);
    }
});
$( document ).ready( function() {
    callLoadTable();
});