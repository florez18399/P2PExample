const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = 3000
const axios = require('axios')
//--------------------------
app.use(bodyParser.json())
//-------------
let listHosts = [];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hostLists', (req, res) => {
    res.json({listHosts: listHosts});
})

app.post('/addHost', (req, res) => { 
    if (!listHosts.includes(req.body.host)) {
        console.log('Agregando host a lista..');
        listHosts.push(req.body.host);
        res.status(200).json({message: `Host agregado a lista`})
    } else {
        res.status(200).json({message: `El host ya está agregado`})
    }
})

/**
 * Recorre la lista para eliminar nodos desconectados
 * 
 */
function checkConnectionNodes() {
    //TO-DO
}
checkConnectionNodes();

app.listen(port, () => {
  console.log(`Tracker listening at http://localhost:${port}`)
})