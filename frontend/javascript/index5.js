const API_URL = "http://localhost:3000/api";

// Betöltéskor lefutó lekérdezések
window.onload = () => {
    getAllElem();
    getIsmeretlen();
};

// Minden elem lekérése konzolra
async function getAllElem() {
    try {
        const res = await fetch(`${API_URL}/getallelem`);
        const data = await res.json();
        console.log("Összes elem:", data);
    } catch (err) {
        console.error("Hiba a lekérdezés során:", err);
    }
}

// Ismeretlen elemek táblázata
async function getIsmeretlen() {
    try {
        const res = await fetch(`${API_URL}/ismeretlen`);
        const data = await res.json();
        renderTable(data, 'ismeretlenTableContainer');
    } catch (err) {
        alert("Hiba történt az ismeretlen elemek betöltésekor.");
    }
}

// Keresés funkció
async function kereses() {
    const nev = document.getElementById('elemInput').value;
    if (!nev) return;

    try {
        const res = await fetch(`${API_URL}/getelem/${nev}`);
        const data = await res.json();
        if (data.result) {
            renderTable([data.result], 'keresesEredmeny');
        } else {
            document.getElementById('keresesEredmeny').innerHTML = "Nincs találat.";
        }
    } catch (err) {
        alert("Hiba a keresés során.");
    }
}

// Táblázat generáló segédfüggvény
function renderTable(data, containerId) {
    let html = `<table class="table table-bordered text-center table-striped align-middle shadow-sm mt-3 w-50 mx-auto">
        <thead>
            <tr>
                <th>rendszám</th><th>vegyjel</th><th>elemneve</th><th>felfedezve</th><th>gaz</th>
            </tr>
        </thead>
        <tbody>`;
    
    data.forEach(e => {
        html += `<tr>
            <td>${e.rendszam}</td>
            <td>${e.vegyjel}</td>
            <td>${e.elemneve}</td>
            <td>${e.felfedezve}</td>
            <td>${e.gaz}</td>
        </tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById(containerId).innerHTML = html;
}