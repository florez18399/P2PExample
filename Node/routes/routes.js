var router = require('express').Router();
const fs = require('fs')
const path = require('path')
const dataNode = require('../dataNode')
const axios = require('axios');

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/imagesList', (req, res) => {
    var host = req.query.host;
    console.log(host);
    getListFiles((files) => {
        res.render('imagesList', { files: files, host: `${dataNode.host}/images/${dataNode.port}/` })
    });
})

router.get('/listFiles', (req, res) => {
    getListFiles((files) => {
        res.json({ listFiles: files })
    })
})

router.get('/getImage', (req, res) => {
    let pathImage = path.join(__dirname, `../public/images/${dataNode.port}/${dataNode.imageName}`)
    console.log(pathImage);
    res.sendFile(pathImage)
})

router.get('/connectedList', (req, res) => {
    axios.get('http://localhost:3000/hostLists')
        .then((response) => {
            console.log(response.data);
            console.log(dataNode.status);
            res.render('connectedList', { hostsList: response.data.listHosts, status: dataNode.status})
        }).catch((err) => {
            res.render('connectedList', {status: dataNode.status})
        })
})

router.get('/ping', (req, res) => {
    res.status(200).json({message: 'OK'})
})

router.get('/connect', (req, res) => {
    console.log('Hola mundo');
    if(dataNode.status == 'Disconnected'){
        console.log('Conectando....')
        dataNode.connect();
        res.status(200).json({message: 'Conectado'})
    }else {
        console.log('Ya está conectado')
        res.status(200).json({message: 'El Cliente ya está conectado'})
    }
})

function getListFiles(cb) {
    fs.readdir(path.join(__dirname, '/../public/images/' + dataNode.port), function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        cb(files);
    });
}

module.exports = router;