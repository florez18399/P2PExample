const express = require('express')
const app = express()
var dataNode = require('./dataNode')
const port = process.argv[2];
const axios = require('axios');
const hbs = require('express-handlebars')
const path = require('path')
var multer = require('multer')
const routerPages = require('./routes/routes')
setDataNode();
//-- MOTOR DE VISTAS
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//----
//----CONFIGURACION DE MULTER
app.use(express.urlencoded({ extended: true }))
var storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/images/' + dataNode.port ),
    filename: (req, file, cb) => {
        let nameImage = 'myImage' + path.extname(file.originalname)
        dataNode.imageName = nameImage;
        cb(null, nameImage)
    }
})
app.use(multer({storage }).single('image'))
//------------Directorio de archivos públicos
app.use('/images', express.static(__dirname + '/public/images'));
//---------------
function setDataNode() {
    dataNode.host = "http://localhost:" + port,
    dataNode.port = port
}
//--------------------------
/**
 * Solicita al tracker agregar el nuevo host
 */
dataNode.connect();
//-------------------------
app.use('/', routerPages)
app.post('/addImage', (req, res)=> {
    console.log(req.file.filename);
    res.redirect('/imagesList');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})