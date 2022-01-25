const {Schema, model}= require('mongoose');

const ExportacionSchema = Schema({
    pais:{
        type: String,
        require: [true,'El nombre del pais es obligatorio'],
    },
    anio:{
        type: Number,
    },
    num_export:{
        type: Number,
    }
});

module.exports = model('Exportacione',ExportacionSchema);