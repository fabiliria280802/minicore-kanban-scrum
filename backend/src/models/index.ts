import Task from './task';
import Subtask from './subtask';
import Sprint from './sprint';
import User from './user';
import Prediction from './prediction';

// Configuración de relaciones
Task.belongsTo(User, { foreignKey: 'iduser' });
Task.belongsTo(Sprint, { foreignKey: 'idsprint' });
Subtask.belongsTo(Task, { foreignKey: 'idtask' });
Subtask.belongsTo(User, { foreignKey: 'iduser' });
Prediction.belongsTo(Sprint, {foreignKey: 'idsprint'});

export { Task, Subtask, Sprint, User, Prediction };