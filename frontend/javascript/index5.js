document.addEventListener('DOMContentLoaded', ()=>{
    fetchElemek();
    tablazatGeneralas();
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
        const sor2 = document.createElement('tr');

        console.log(Object.values(data.result[0]));

        // for (let i = 0; i < Object.keys(data.result.length); i++) {
        //     console.log(Object.keys(data.result[i]));
        // }

        for (let i = 0; i < Object.keys(data.result).length; i++) {
            console.log(Object.keys(data.result[i]));
            // const th = document.createElement('th');
            // th.innerHTML = Object.keys(data.result)[0];
            // sor1.appendChild(th);
        }

        // for (let i = 0; i < Object.values(data.result).length; i++) {
        //     const td = document.createElement('td');
        //     td.innerHTML = Object.values(data.result)[i];
        //     sor2.appendChild(td);
        // }

        table.replaceChildren(sor1, sor2);
        
        table.setAttribute("class", "table table-bordered text-center table-striped align-middle shadow-sm mt-3 w-50 mx-auto");

        tableSpan.replaceChildren(table);

    } catch (error) {
        console.error('Hiba történt: ', error);
    }
}
