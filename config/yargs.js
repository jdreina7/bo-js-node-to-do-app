const description = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};

const completed = {
    default: true,
    alias: 'c',
    desc: 'Marca una tarea como realizada'
}

const argv = require('yargs')
            .command('create', 'Crea una nueva tarea', { description })
            .command('update','Actualiza el estado de una tarea', { description, completed })
            .command('delete', 'Elimina una tarea', { description } )
            .help()
            .argv

module.exports = {
    argv
}