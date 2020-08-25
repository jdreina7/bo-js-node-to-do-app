const fs = require('fs');

let tasksToDo = [];

// Función que me almacena las tareas en la BD (data.json)
const saveDB = () => {
    let data = JSON.stringify(tasksToDo);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar el archivo ', err);
    });
}

// Función que me carga la data en la variable tasksToDo para percistir la información
const loadDB = () => {
    try {
        tasksToDo = require('../db/data.json'); 
    } catch (error) {
        tasksToDo = [];
    }
}

// Función que me permite crear una nueva tarea
const createToDo = (description) => {

    loadDB();
    let task = {
        description,
        completed: false
    };

    tasksToDo.push( task );
    saveDB();
    return task.description;
}

// Función que me permite ver un listado total de las tareas almacenadas
const getToDo = () => {
    loadDB();
    return tasksToDo;
}

// Función que me permite actualizar el estado de una tarea
const updateToDo = (desc, estado = true) => {
    
    loadDB();

    let index = tasksToDo.findIndex(tarea => tarea.description === desc);

    if (index >= 0) {
        tasksToDo[index].completed = estado;
        saveDB();
        return true;
    } else { // -1
        return false;
    }
}

// Función que me permite eliminar una tarea
const deleteToDo = (descripcion) => {
    
    loadDB();

    let newTaskToDo = tasksToDo.filter( tarea => {
        return tarea.description !== descripcion
    });

    if ( newTaskToDo.length === tasksToDo.length ) {
        return false;
    } else {
        tasksToDo = newTaskToDo;
        saveDB();
        return true;
    }

}

module.exports = {
    createToDo,
    getToDo,
    updateToDo,
    deleteToDo
}
