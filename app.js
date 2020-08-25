const argv = require('./config/yargs').argv;
const colors = require('colors');

const porHacer = require('./to-do/to-do');

// Obtenemos el argv desde el Yargs
let comando = argv._[0];

switch (comando) {
    case 'create':
        let tarea = porHacer.createToDo(argv.description);
        console.log(`La tarea '${tarea}' se creó satisfactoriamente!`);
    break;

    case 'list':
        let listado = porHacer.getToDo();
        for ( let tarea of listado) {
            console.log('************* TO-DO ***************'.magenta);
            console.log('Título: '.blue, tarea.description);
            if (tarea.completed === "false") {
                console.log('Estado: '.blue,  'POR HACER'.red);
            } else {
                console.log('Estado: '.blue, 'REALIZADA'.yellow);
            }
            console.log('***********************************'.magenta);
        }
    break;
    
    case 'update':
        let actualizada = porHacer.updateToDo(argv.description, argv.completed);
        if (actualizada === false) {
            console.log('Problemas al actualizar la tarea.'.red);
        } else {
            console.log('Tarea actualizada correctamente.'.yellow);
        }
    break;

    case 'delete':
        let eliminada = porHacer.deleteToDo(argv.description);
        if (eliminada === false) {
            console.log('No se encontraron tareas para eliminar.'.red);
        } else {
            console.log('Tarea eliminada correctamente.'.yellow);
        }
    break;

    default:
        console.log('Comando inválido!');
    break;
}
