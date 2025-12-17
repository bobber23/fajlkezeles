const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');
const { console } = require('inspector');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});


const readTextFile = async (filePath) => {
  try {
    const text = await fs.readFile(filePath, 'utf8');
    return text;
  } catch (error) {
    throw new Error(`Olvasási hiba (text): ${error.message}`);
  }
};

//? /api/readfile
router.get('/readfile', async (request, response) => {
    try {
      const content = await readTextFile(path.join(__dirname, '../files/adatok.txt'));
      response.status(200).json({ text: content });
    } catch (error) {
      console.log('GET /api/readfile error:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
});


//? /api/beolvasas
router.get('/beolvasas', async (request, response) => {
    try {
      const numbers = await readTextFile(path.join(__dirname, '../files/szamok.txt'));
      response.status(200).json({ numbers: numbers.split(',') });
    } catch (error) {
      console.log('GET /api/readfile error:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
});

//? /api/osszeg
router.get('/osszeg', async (request, response) => {
    try {
      const numbers = await readTextFile(path.join(__dirname, '../files/szamok.txt'));
      let szamok = numbers.split(',');
      let numbersSum = 0;
      for (let i = 0; i < szamok.length; i++) {
        numbersSum += parseInt(szamok[i]);
      }
      response.status(200).json({ osszeg: numbersSum });
    } catch (error) {
      console.log('GET /api/readfile error:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
});

//? /api/szorzat
router.get('/szorzat', async (request, response) => {
    try {
      const numbers = await readTextFile(path.join(__dirname, '../files/szamok.txt'));
      let szamok = numbers.split(',');
      let elsoszam = parseInt(szamok[0]);
      let utolsoszam = parseInt(szamok[szamok.length-1]);
      let szorzat = elsoszam*utolsoszam;
      response.status(200).json({ szorzat: szorzat });
    } catch (error) {
      console.log('GET /api/readfile error:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
});

//? /api/atlag
router.get('/atlag', async (request, response) => {
    try {
      const numbers = await readTextFile(path.join(__dirname, '../files/szamok.txt'));
      let szamok = numbers.split(',');

      let osszeg = 0;
      for (let i = 0; i < szamok.length; i++) {
        osszeg += parseInt(szamok[i]);
      }

      let atlag = osszeg/20;

      response.status(200).json({ atlag: atlag });
    } catch (error) {
      console.log('GET /api/readfile error:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
});

//? /api/min
router.get('/min', async (request, response) => {
    try {
      const numbers = await readTextFile(path.join(__dirname, '../files/szamok.txt'));
      let szamok = numbers.split(',');

      let minsz = parseInt(szamok[0]);
      for (let i = 0; i < szamok.length; i++) {
        if (parseInt(szamok[i])<minsz) {
            minsz = parseInt(szamok[i]);
        }
      }

      response.status(200).json({ min: minsz });
    } catch (error) {
      console.log('GET /api/readfile error:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
});

//? /api/max
router.get('/max', async (request, response) => {
    try {
      const numbers = await readTextFile(path.join(__dirname, '../files/szamok.txt'));
      let szamok = numbers.split(',');

      let maxsz = parseInt(szamok[0]);
      for (let i = 0; i < szamok.length; i++) {
        if (parseInt(szamok[i])>maxsz) {
            maxsz = parseInt(szamok[i]);
        }
      }

      response.status(200).json({ max: maxsz });
    } catch (error) {
      console.log('GET /api/readfile error:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
});

//? /api/rendezett
router.get('/rendezett', async (request, response) => {
    try {
      const numbers = await readTextFile(path.join(__dirname, '../files/szamok.txt'));
      let szamok = numbers.split(',').map(number => {
        return parseInt(number);
      });

      let n = szamok.length;
      for (let i = n-1 ; i > 0; i--) {
        for (let j = 0; j < i; j++) {
          if (szamok[j]>szamok[j+1]) {
            let tmp = szamok[j];
            szamok[j] = szamok[j+1];
            szamok[j+1] = tmp;
          }
        }
      }

      response.status(200).json({ rendezett: szamok });
    } catch (error) {
      console.log('GET /api/readfile error:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
});



//? /api/getallstat
const readJsonFile = async (filePath) => {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Olvasási hiba (json): ${error.message}`);
  }
};

router.get('/getallstat', async (request, response) => {
  try {
    const data = await readJsonFile(path.join(__dirname, '../files/statisztika.json'));
    response.status(200).json({ result: data });
  } catch (error) {
    console.log('GET /api/getallstat error:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


//? /api/getstat/:telepaz
router.get('/getstat/:telepaz', async (request, response) => {
  try {
    const azonosito = await request.params.telepaz;
    const data = await readJsonFile(path.join(__dirname, '../files/statisztika.json'));
    const result = data.telepules.find(t => t.telepaz === azonosito);

    if (result) {
      response.status(200).json({result});
    }
    else{
      response.status(404).json({
        errorMsg : "Nem található ilyen település azonosító!"
      })
    }
  } catch (error) {
    console.log('GET /api/getallstat error:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});





//? /barlangok

router.get('/barlangok', async (request, response) => {
  try {
    const data = await readJsonFile(path.join(__dirname, '../files/barlangok.json'));
    response.status(200).json({ result: data });
  } catch (error) {
    console.log('GET /api/getallstat error:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/barlang/:azon', async (request, response) => {
  try {
    const barlangazon = request.params.azon;
    const data2 = await readJsonFile(path.join(__dirname, '../files/barlangok.json'));
    const result2 = data2.findIndex(t => {
      return t.azon === barlangazon;
    });

    if (result2 !== -1) {
      response.status(200).json({
        result: data2[result2]
      });
    }
    else{
      response.status(404).json({
        errorMsg : "Nem található ilyen barlang azonosító!"
      })
    }
  } catch (error) {
    console.log('GET /api/getallstat error:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/stat', async (request, response) => {
  try {
    const data = await readJsonFile(path.join(__dirname, '../files/barlangok.json'));

    

    /*response.status(200).json({
      result : data[1].nev
    });*/
  } catch (error) {
    console.log('GET /api/getallstat error:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});





const JSON_PATH = path.join(__dirname, '../files/elemek.json');

// Segédfüggvény a fájl beolvasásához
const readData = () => {
    try {
        const data = fs.readFileSync(JSON_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return null;
    }
};


app.get('/api/getallelem', (req, res) => {
  const data = readData();
  if (data) {
      res.status(200).json(data); // Sikeres válasz [cite: 28]
  } else {
      res.status(500).json({ error: "Fájl hiba" }); // Hiba esetén [cite: 29]
  }
});

// Végpont: Ismeretlen felfedezési év (felfedezve: 0) [cite: 5, 6, 7]
app.get('/api/ismeretlen', (req, res) => {
  const data = readData();
  if (data) {
      const result = data.filter(e => e.felfedezve == 0);
      res.status(200).json(result);
  } else {
      res.status(500).json({ error: "Fájl hiba" });
  }
});

// Végpont: Keresés név alapján [cite: 8, 9]
app.get('/api/getelem/:elemneve', (req, res) => {
  const elemNeve = req.params.elemneve.toLowerCase();
  const data = readData();
  if (data) {
      const result = data.find(e => e.elemneve.toLowerCase() === elemNeve);
      res.status(200).json({ result: result || null });
  } else {
      res.status(500).json({ error: "Fájl hiba" });
  }
});
  

module.exports = router;
