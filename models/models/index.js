/**
 * Created by J.Rodero.Diaz on 01/03/18
 */

// sequelize es el framework de node.js para soluciones como MySQL

// se ha usado un modelo donde se usa una base de datos sqlite

const Sequelize = require('sequelize'); // cargar sequelize


//se instancia sequelize
// genera una instancia de Sequelize llamada sequelize
const sequelize = new Sequelize("sqlite:quizzes.sqlite", {logging: false}); // loggin false elimina las trazas
//y accede a la base de datos localizada en el fichero indicado en verde (sqlite:quizzes.sqlite)


// DEFINICION DE MODELO DE DATOS DE LA BASE DE DATOS EXISTENTE EN EL ARCHIVO ESPECIFICADO EN VERDE
sequelize.define('quiz', { // se elige y define el concepto que se va a guardar en la bbase de datos
    // en ese caso quiz con question y answer
    question:{ // se define el concepto de question
        type: Sequelize.STRING, // su tipo
        unique: {msg: "Ya existe esta pregunta"}, // se define como unico y define un
        //mensaje en caso de que haya repeticiones
        validate: {notEmpty: {msg: "La pregunta no puede estar vacÃƒÂ­a"}} // y se configura para que
        //no pueda ser nulo
    },
    answer: { // lo mismo con answer. es un string que no puede estar empty. no tiene
        //por que ser unico 
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "La respuesta no puede estar vacÃƒÂ­a"}}
    }
});

sequelize.sync() // PROMESA // esto permite que se cree la tabla en la base de datos en caso de que no exista
    .then(() => sequelize.models.quiz.count()) //Funcion con la que se construye otra promesa // cuenta cuantos quizzes hay
// esta ultima linea es una promesa (sequelize), que accede l array de models, y en models, accede al
//modelo quiz y cuenta cuantos hay
.then(count => {
    if (!count) { // y si cuenta cero quizzes en la tabla
    return sequelize.models.quiz.bulkCreate([ //PROMESA // crea esta tabla por defecto
        //bulkCreate sirve para crear varios quizzes.
        // para crearlos, se accede desde sequelize a la propiedad de modelos, se escoge la de quizzes y de ahi se crea con bulk
        {question: "Capital de Italia", answer: "Roma"},
        {question: "Capital de España", answer: "Madrid"},
        {question: "Capital de Francia", answer: "París"},
        {question: "Capital de Portugal", answer: "Lisboa"}
    ]);
}
})
.catch(error => {
    console.log(error);
});

module.exports = sequelize; // Exportar sequelize