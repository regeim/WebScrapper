let selected = [];

$('#example-getting-started').multiselect({
    selectAllValue: 'multiselect-all',
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true,
    maxHeight: '300',
    buttonWidth: '235',
    onChange: function (option, checked, select) {
        let value = $(option).val();
        selected.includes(value) ? selected = selected.filter(x => x!= value) : selected.push(value);
        loadClasses(selected);
    },
});
$( document ).ready( function() {
    loadClasses(selected);
});