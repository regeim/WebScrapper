let selected = [];

$('#class_select').multiselect({
    selectAllValue: 'multiselect-all',
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true,
    maxHeight: '300',
    buttonWidth: '235',
    includeSelectAllOption: true,
    onChange: function (option, checked, select) {
        let value = $(option).val();
        selected.includes(value) ? selected = selected.filter(x => x!= value) : selected.push(value);
        loadClasses(selected,'change');
    },
    onInitialized: function(select, container) {
        let value = $(select).val();
        selected = selected.concat(value);
        loadClasses(value,'init');
    }
});
$('#country-select').multiselect({
    selectAllValue: 'multiselect-all',
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true,
    maxHeight: '300',
    buttonWidth: '235',
    includeSelectAllOption: true
});
$( document ).ready( function() {
    loadClasses(selected);
});