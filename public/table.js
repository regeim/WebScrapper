let data = [];
let fileString;
let classData;

function LinkCheck(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

function loadJSON(callback) {
    let fileName
    let today = new Date().toISOString().slice(0, 10);
    let x = LinkCheck(`${today}_1.txt`);
    x ? fileName = `${today}_1.txt` : fileName = `${today}_2.txt`;
    console.log(fileName);
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', fileName, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    };


    xobj.send(null);
}

/*const loadJSON = async () => {
    let today = new Date().toISOString().slice(0, 10);
    let fileName = `${today}.txt`;
    console.log(fileName);
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', fileName, true);
    const data = await xobj.onreadystatechange = async () => {
        if (xobj.readyState == 4 && xobj.status == '200') {
            const res = await (xobj.responseText);
            const data = await JSON.parse(res);
            return data;
        }
    };
    xobj.send(null);
    return data;
}*/

function CreateTableFromJSON(tableJson) {
    let forums = [];
    let table;
//    tableJson.forEach((x, i, array) => array[i].class = className);
    forums = tableJson;

//    if (t) {
        table = document.createElement('table');
        table.setAttribute('id', 'table-classes');

        let col = [];
        // Setting up columns: map to object key, remove duplicates, add put them into a array
        [...new Set(flatten(forums.map(x => Object.keys(x))))].forEach((x) => col.push(x));

        let tr;
        forums.forEach((x, i) => {
            tr = table.insertRow();
            col.forEach((y, j) => {
                let tabCell = tr.insertCell();
                tabCell.innerHTML = forums[i][col[j]];
            });
        });

        let divContainer = document.getElementById('showData');
        divContainer.innerHTML = '';
        divContainer.appendChild(table);
  //  }

}

function loadClasses(selectedClasses, selectedCountry) {

    loadJSON(function (response) {
        let a = JSON.parse(response);
        CreateTableFromJSON(a.filter(x => selectedClasses.includes(x.class) && selectedCountry.includes(x.country)));
    });

/*        loadJSON().then(data => CreateTableFromJSON(data.filter(x => selectedClasses.includes(x.class) && selectedCountry.includes(x.country))));*/
}


