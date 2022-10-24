const CACHE_KEY = "bukutamu_hisotry";

function checkForStorage() {
    return typeof (Storage) != "undefined";
}

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if (historyData.lenght > 10) {
            historyData.pop(); //clear last index value
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY));
    } else {
        return [];
    }
}

function renderHisotry() {
    const historyData = showHistory();
    let historyList = document.querySelector('#historyBukuTamu');
    historyList.innerHTML = "";

    // if (historyData != null) {
    for (let history of historyData) {
        let row = document.createElement('tr');

        row.innerHTML = "<td>" + history.nama + "</td>";
        row.innerHTML += "<td>" + history.email + "</td>";
        row.innerHTML += "<td>" + history.pesan + "</td>";

        historyList.appendChild(row);
    }
    // }
}

renderHisotry();

function performGuestBook() {

    let txtname = document.getElementById('nama').value;
    let txtemail = document.getElementById('email').value;
    let txtpesan = document.getElementById('pesan').value;

    debugger

    if (txtname == "" || txtemail == "" || txtpesan == "") {
        alert("Semua isian harus terisi!!!");
        return;
    } 
    else {
        const history = {
            nama: txtname,
            email: txtemail,
            pesan: txtpesan
        }

        putHistory(history);
    }

    renderHisotry();
}

// const history = {
//     nama: "",
//     email: "",
//     pesan: ""
// }