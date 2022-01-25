const {Router} = require('express');
const router = Router();

const Exportacion = require('../models/exportacion');

/*
Get de las exportaciones
URL: localhost:3000/api/cacao
opcional: ?anio    --Si no se especifica el año trae por defecto 2017
*/
router.get('/', async(req, res) => { //Para poner parámetros obligatorios, se ponen en la ruta
    //ejemplo: /:pais/:anio
    //const {pais, anio} = req.params;

    //Para seleccionar los parametros opcionales
    //es decir los que vienen en la ruta ?p1=1&p2=3
    const {anio=2017} = req.query;

    const exportaciones = await Exportacion.find({anio:anio});
    res.json({
        ok: true,
        msg: 'get - API',
        exportaciones: exportaciones
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
router.post('/', async(req, res) => {
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