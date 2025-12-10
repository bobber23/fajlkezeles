document.addEventListener('DOMContentLoaded', ()=>{
    fetchBeolvasas();
    fetchOsszeg();
    fetchSzorzat();
    fetchAtlag();
    fetchMin();
    fetchMax();
    fetchRendezett();
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


const fetchBeolvasas = async () => {
    try {
        const data = await getMethodFetch ("http://127.0.0.1:3000/api/beolvasas");
        const beolvasas = document.getElementById("beolvasas");
        beolvasas.textContent = data.numbers;
    } catch (error) {
        console.error('Hiba történt: ', error);
    }
};

const fetchOsszeg = async () => {
    try {
        const data = await getMethodFetch ("http://127.0.0.1:3000/api/osszeg");
        const osszeg = document.getElementById("osszeg");
        osszeg.textContent = `Összegük: ${data.osszeg}`;
    } catch (error) {
        console.error('Hiba történt: ', error);
    }
};

const fetchSzorzat = async () => {
    try {
        const data = await getMethodFetch ("http://127.0.0.1:3000/api/szorzat");
        const szorzat = document.getElementById("szorzat");
        szorzat.textContent = `Első és utolsó szám szorzata: ${data.szorzat}`;
    } catch (error) {
        console.error('Hiba történt: ', error);
    }
};

const fetchAtlag = async () => {
    try {
        const data = await getMethodFetch ("http://127.0.0.1:3000/api/atlag");
        const atlag = document.getElementById("atlag");
        atlag.textContent = `Átlaguk: ${data.atlag}`;
    } catch (error) {
        console.error('Hiba történt: ', error);
    }
};

const fetchMin = async () => {
    try {
        const data = await getMethodFetch ("http://127.0.0.1:3000/api/min");
        const min = document.getElementById("min");
        min.textContent = `Legkisebb: ${data.min}`;
    } catch (error) {
        console.error('Hiba történt: ', error);
    }
};

const fetchMax = async () => {
    try {
        const data = await getMethodFetch ("http://127.0.0.1:3000/api/max");
        const max = document.getElementById("max");
        max.textContent = `Legnagyobb: ${data.max}`;
    } catch (error) {
        console.error('Hiba történt: ', error);
    }
};

const fetchRendezett = async () => {
    try {
        const data = await getMethodFetch ("http://127.0.0.1:3000/api/rendezett");
        const rendezett = document.getElementById("rendezett");
        rendezett.textContent = data.rendezett;
    } catch (error) {
        console.error('Hiba történt: ', error);
    }
};
