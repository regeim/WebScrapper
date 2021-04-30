let data = [];
let fileString;
function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

function loadJSON(callback, fileName) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', fileName, true);
    xobj.onreadystatechange = function () {
//                console.log(xobj.readyState + ' ' + xobj.status);

        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
//                    console.log(xobj.responseText);
        }
    };
    //          if (xobj.readyState == 4 && xobj.status == "200")

    xobj.send(null);
}

function CreateTableFromJSON(tableJson, className) {
    let forums = [];
    let table;
    tableJson.forEach((x, i, array) => array[i].class = className);

    if (className =='death-knight') {

        forums = tableJson;

        // EXTRACT VALUE FOR HTML HEADER.
        let col = [];
        // map to object key, remove duplicates, add put them into a array
        [...new Set(flatten(forums.map(x => Object.keys(x))))].forEach((x) => col.push(x));

        // CREATE DYNAMIC TABLE.
        table = document.createElement('table');
        table.setAttribute("id", 'table-classes');

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        let tr = table.insertRow(-1);                   // TABLE ROW.

        function createHeaderCol(col) {
            let th = document.createElement('th');      // TABLE HEADER.
            th.innerHTML = col;
            tr.appendChild(th);
        };
        col.forEach((x) => createHeaderCol(x));

        // ADD JSON DATA TO THE TABLE AS ROWS.

        forums.forEach((x, i) => {
            tr = table.insertRow(-1);
            col.forEach((y, j) => {
                let tabCell = tr.insertCell(-1);
                tabCell.innerHTML = forums[i][col[j]];
            });
        });

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        let divContainer = document.getElementById('showData');
        divContainer.innerHTML = '';
        divContainer.appendChild(table);
    }
    if (className !='death-knight'){
        forums = tableJson;
        table = document.getElementById('table-classes');

        let col = [];
        // map to object key, remove duplicates, add put them into a array
        [...new Set(flatten(forums.map(x => Object.keys(x))))].forEach((x) => col.push(x));

        let tr;
        forums.forEach((x, i) => {
            tr = table.insertRow(-1);
            col.forEach((y, j) => {
                let tabCell = tr.insertCell(-1);
                tabCell.innerHTML = forums[i][col[j]];
            });
        });
    }
}

function callAsync() {
    fileString = `classes.json`;
    loadJSON((response) => saveClasses(JSON.parse(response)), fileString);
}
function saveClasses (classJson) {
    let classes = classJson;
    console.log(classes[0].name + ' ' + classes[1].name);
    let today = new Date().toISOString().slice(0, 10);
    classes.forEach((x) => creatClassHTML(x));
    function creatClassHTML(o){
        fileString = `${o.name}-${today}.txt`;
        console.log(fileString);
        loadJSON((response) => CreateTableFromJSON(JSON.parse(response), o.name), fileString);
    }

}