const { Router } = require('express');
const router = Router();

const Exportacion = require('../models/exportacion');

/*
Get de las exportaciones
URL: localhost:3000/api/cacao
opcional: ?anio    --Si no se especifica el año trae por defecto 2017
*/
router.get('/', async (req, res) => { //Para poner parámetros obligatorios, se ponen en la ruta
    //ejemplo: /:pais/:anio
    //const {pais, anio} = req.params;

    //Para seleccionar los parametros opcionales
    //es decir los que vienen en la ruta ?p1=1&p2=3
    const { anio = 2017 } = req.query;

    const exportaciones = await Exportacion.find({ anio: anio });
    let arreglo_exportaciones = [["Element", "Num. exportaciones", { role: 'style' }]];
    const colores = [
        "D67D3E",
        "DD4A48",
        "041562",
        "1572A1",
        "FF6464",
        "91C483",
        "FFAD60",
        "4FBDBA",
        "541212",
        "086E7D",
        "D77FA1",
        "676FA3",
        "3FA796",
        "ECB365"
    ];
    exportaciones.forEach(exportac => {
        let pos_rand = Math.floor(Math.random() * colores.length);
        var color = colores[pos_rand];
        arreglo_exportaciones.push([exportac.pais, exportac.num_export, color])
    });

    res.json({
        ok: true,
        msg: 'get - API',
        exportaciones: arreglo_exportaciones
    });
});

/*
Post de las exportaciones
URL: localhost:3000/api/cacao
body: {
    anio,
    pais,
    num_export
}
*/
router.post('/', async (req, res) => {
    const body = req.body;

    const exportacion = new Exportacion(body);
    await exportacion.save();

    res.json({
        ok: true,
        exportacion
    });
});

// router.put('/', (req, res) => {
//     res.json({
//         ok: true,
//         msg: 'get - API'
//     });
//   });

// router.delete('/', (req, res) => {
//     res.json({
//         ok: true,
//         msg: 'get - API'
//     });
//   });

module.exports = router;