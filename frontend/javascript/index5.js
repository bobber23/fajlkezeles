document.addEventListener('DOMContentLoaded', ()=>{
    fetchElemek();
    tablazatGeneralas();
    document.getElementById('lekerdezesBtn').addEventListener('click', elemTablazat);
});

const getMethodFetch = (url) => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Hiba: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            throw new Error(`Hiba történt: ${error.message}`);
        });
};


const fetchElemek = async () => {
    try {
        const data = await getMethodFetch ("http://127.0.0.1:3000/api/getallelem");
        console.log(data.result.felfedez)
    } catch (error) {
        console.error('Hiba történt: ', error);
    }
};

const tablazatGeneralas = async () => {
    try {
        const data = await getMethodFetch (`http://127.0.0.1:3000/api/ismeretlen`);
        const tableSpan = document.getElementById("tableSpan");
        const table = document.createElement('table');
        const sor1 = document.createElement('tr');


        Object.keys(data.result[0]).forEach(element => {
            const th = document.createElement('th');
            th.innerHTML = element;
            sor1.appendChild(th);
        });

        table.appendChild(sor1);

        for (let i = 0; i < Object.keys(data.result).length; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < Object.values(data.result[i]).length; j++) {
                const td = document.createElement('td');
                td.innerHTML = Object.values(data.result[i])[j];
                tr.appendChild(td)
            }
            table.appendChild(tr);
        }
        
        table.setAttribute("class", "table table-bordered text-center table-striped align-middle shadow-sm mt-3 w-50 mx-auto");

        tableSpan.replaceChildren(table);

    } catch (error) {
        console.error('Hiba történt: ', error);
    }
}

const elemTablazat = async () => {
    try {
        const input = document.getElementById("elemTextbox");
        const data = await getMethodFetch (`http://127.0.0.1:3000/api/getelem/${input.value}`);
        const tableSpan = document.getElementById("elemTable");
        const table = document.createElement('table');
        const sor1 = document.createElement('tr');
        const sor2 = document.createElement('tr');

        Object.keys(data.result).forEach(element => {
            const th = document.createElement('th');
            th.innerHTML = element;
            sor1.appendChild(th);
        });

        for (let i = 0; i < Object.values(data.result).length; i++) {
            const td = document.createElement('td');
            td.innerHTML = Object.values(data.result)[i];
            sor2.appendChild(td);
        }

        table.replaceChildren(sor1, sor2);
        
        table.setAttribute("class", "table table-bordered text-center table-striped align-middle shadow-sm mt-3 w-50 mx-auto");

        tableSpan.replaceChildren(table);

    } catch (error) {
        console.error('Hiba történt: ', error);
    }
}
