const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];

function addTask(indicador, descripcion) {
  tasks.push({ indicador, descripcion, completada: false });
}

function deleteTask(indicador) {
  const index = tasks.findIndex((task) => task.indicador === indicador);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

function completeTask(indicador) {
  const task = tasks.find((task) => task.indicador === indicador);
  if (task) {
    task.completada = true;
  }
}

function printTasks() {
  console.log("\nLista de tareas:");
  tasks.forEach((task) => {
    console.log(
      `${task.indicador}: ${task.descripcion} - ${
        task.completada ? "Completada" : "Pendiente"
      }`
    );
  });
  console.log();
}

function promptUser() {
  rl.question(
    "\nElige una acción:\n1. Añadir tarea\n2. Eliminar tarea\n3. Completar tarea\n4. Salir\n",
    (answer) => {
      switch (answer) {
        case "1":
          rl.question("Introduce el indicador de la tarea: ", (indicador) => {
            rl.question(
              "Introduce la descripción de la tarea: ",
              (descripcion) => {
                addTask(indicador, descripcion);
                printTasks();
                promptUser();
              }
            );
          });
          break;
        case "2":
          rl.question(
            "Introduce el indicador de la tarea a eliminar: ",
            (indicador) => {
              deleteTask(indicador);
              printTasks();
              promptUser();
            }
          );
          break;
        case "3":
          rl.question(
            "Introduce el indicador de la tarea a completar: ",
            (indicador) => {
              completeTask(indicador);
              printTasks();
              promptUser();
            }
          );
          break;
        case "4":
          rl.close();
          break;
        default:
          console.log("Opción no válida. Inténtalo de nuevo.");
          promptUser();
          break;
      }
    }
  );
}

promptUser();
