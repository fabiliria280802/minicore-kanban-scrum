import Subtask, {SubtaskStatus} from '../models/subtask';

const subtasks = [
  // Subtasks for Task #1
  {
    idtask: 1,
    iduser: 1,
    title: 'Create project repository',
    subtaskdescription: 'Set up a new repository for the project on GitHub',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 1,
    iduser: 1,
    title: 'Initialize project',
    subtaskdescription: 'Initialize the project with basic structure',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #2
  {
    idtask: 2,
    iduser: 2,
    title: 'Design login UI',
    subtaskdescription: 'Create the login user interface using Figma',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 2,
    iduser: 2,
    title: 'Implement authentication',
    subtaskdescription: 'Develop the authentication logic',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #3
  {
    idtask: 3,
    iduser: 3,
    title: 'Install MySQL',
    subtaskdescription: 'Install MySQL server and client',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 3,
    iduser: 3,
    title: 'Create database schema',
    subtaskdescription: 'Design and create the initial database schema',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #4
  {
    idtask: 4,
    iduser: 4,
    title: 'Set up React environment',
    subtaskdescription: 'Install and configure React',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 4,
    iduser: 4,
    title: 'Develop initial components',
    subtaskdescription: 'Create initial React components',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #5
  {
    idtask: 5,
    iduser: 1,
    title: 'Define user roles',
    subtaskdescription: 'List all possible user roles and permissions',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 5,
    iduser: 1,
    title: 'Implement role management',
    subtaskdescription: 'Create role management module',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #6
  {
    idtask: 6,
    iduser: 2,
    title: 'Design dashboard layout',
    subtaskdescription: 'Create dashboard layout using Figma',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 6,
    iduser: 2,
    title: 'Implement dashboard features',
    subtaskdescription: 'Develop core features of the dashboard',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #7
  {
    idtask: 7,
    iduser: 5,
    title: 'Set up CI server',
    subtaskdescription: 'Configure CI server for automated builds',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 7,
    iduser: 5,
    title: 'Write build scripts',
    subtaskdescription: 'Create scripts for automated builds',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #8
  {
    idtask: 8,
    iduser: 6,
    title: 'Design notification schema',
    subtaskdescription: 'Design database schema for notifications',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 8,
    iduser: 6,
    title: 'Implement notification service',
    subtaskdescription: 'Develop backend service for notifications',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #9
  {
    idtask: 9,
    iduser: 1,
    title: 'API integration design',
    subtaskdescription: 'Design integration points for third-party API',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 9,
    iduser: 1,
    title: 'Implement API client',
    subtaskdescription: 'Develop client to consume third-party API',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #10
  {
    idtask: 10,
    iduser: 2,
    title: 'Identify slow queries',
    subtaskdescription: 'Identify and log slow database queries',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 10,
    iduser: 2,
    title: 'Optimize queries',
    subtaskdescription: 'Optimize identified slow queries',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #11
  {
    idtask: 11,
    iduser: 3,
    title: 'Set up testing framework',
    subtaskdescription: 'Set up Jest for unit testing',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 11,
    iduser: 3,
    title: 'Write unit tests',
    subtaskdescription: 'Write unit tests for critical components',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #12
  {
    idtask: 12,
    iduser: 4,
    title: 'Conduct UI/UX review',
    subtaskdescription: 'Review current UI/UX design',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 12,
    iduser: 4,
    title: 'Implement improvements',
    subtaskdescription: 'Implement agreed upon UI/UX improvements',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #13
  {
    idtask: 13,
    iduser: 1,
    title: 'Refactor code modules',
    subtaskdescription: 'Refactor critical code modules for clarity',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 13,
    iduser: 1,
    title: 'Update documentation',
    subtaskdescription: 'Update code documentation',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #14
  {
    idtask: 14,
    iduser: 2,
    title: 'Implement caching strategy',
    subtaskdescription: 'Decide and implement caching strategy',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 14,
    iduser: 2,
    title: 'Test cache performance',
    subtaskdescription: 'Test the performance of the implemented cache',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #15
  {
    idtask: 15,
    iduser: 3,
    title: 'Research security protocols',
    subtaskdescription: 'Research latest security protocols',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 15,
    iduser: 3,
    title: 'Update security settings',
    subtaskdescription: 'Update security settings to new protocols',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #16
  {
    idtask: 16,
    iduser: 5,
    title: 'Design admin panel',
    subtaskdescription: 'Design the layout for admin panel',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 16,
    iduser: 5,
    title: 'Implement admin panel',
    subtaskdescription: 'Develop the admin panel',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #17
  {
    idtask: 17,
    iduser: 1,
    title: 'Prepare test plan',
    subtaskdescription: 'Prepare a comprehensive test plan',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 17,
    iduser: 1,
    title: 'Conduct tests',
    subtaskdescription: 'Conduct user testing according to plan',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #18
  {
    idtask: 18,
    iduser: 2,
    title: 'Analyze feedback',
    subtaskdescription: 'Analyze feedback received from users',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 18,
    iduser: 2,
    title: 'Implement changes',
    subtaskdescription: 'Implement changes based on feedback',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #19
  {
    idtask: 19,
    iduser: 4,
    title: 'Enhance logging system',
    subtaskdescription: 'Improve the logging system for better tracking',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 19,
    iduser: 4,
    title: 'Test new logging system',
    subtaskdescription: 'Test the enhanced logging system',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #20
  {
    idtask: 20,
    iduser: 6,
    title: 'Analyze front-end performance',
    subtaskdescription: 'Identify bottlenecks in front-end performance',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 20,
    iduser: 6,
    title: 'Optimize code',
    subtaskdescription: 'Optimize front-end code for performance',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #21
  {
    idtask: 21,
    iduser: 1,
    title: 'Document API endpoints',
    subtaskdescription: 'Document all API endpoints',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 21,
    iduser: 1,
    title: 'Review documentation',
    subtaskdescription: 'Review and finalize documentation',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #22
  {
    idtask: 22,
    iduser: 2,
    title: 'Prepare release notes',
    subtaskdescription: 'Prepare release notes for version 1.0',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 22,
    iduser: 2,
    title: 'Coordinate release',
    subtaskdescription: 'Coordinate the release process',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #23
  {
    idtask: 23,
    iduser: 5,
    title: 'Set up monitoring tools',
    subtaskdescription: 'Set up tools for monitoring post-release',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 23,
    iduser: 5,
    title: 'Monitor system',
    subtaskdescription: 'Monitor system performance after release',
    subtaskstatus: SubtaskStatus.done,
  },
  // Subtasks for Task #24
  {
    idtask: 24,
    iduser: 6,
    title: 'Define next phase goals',
    subtaskdescription: 'Define goals for the next phase of the project',
    subtaskstatus: SubtaskStatus.done,
  },
  {
    idtask: 24,
    iduser: 6,
    title: 'Create next phase plan',
    subtaskdescription: 'Create a detailed plan for the next phase',
    subtaskstatus: SubtaskStatus.done,
  },
];

const seedSubtasks = async () => {
    try {
      const existingSubtasks = await Subtask.findAll();
      if (existingSubtasks.length > 0) {
        console.log('Subtasks already exist. Skipping seeding.');
        return;
      }

      for (const subtaskData of subtasks) {
        await Subtask.create(subtaskData);
      }
      console.log('Subtasks seeded successfully');
    } catch (error) {
      console.error('Error seeding subtasks:', error);
    }
  };

export default seedSubtasks;
