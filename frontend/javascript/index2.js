document.addEventListener('DOMContentLoaded', ()=>{
    fetchData();
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


const fetchData = async () => {
    try {
        const data = await getMethodFetch ("http://127.0.0.1:3000/api/readfile");
        const eredmeny = document.getElementById("eredmeny");
        eredmeny.textContent = `Eredmény: ${data.text}`;
    } catch (error) {
        console.error('Hiba történt: ', error);
    }
};
