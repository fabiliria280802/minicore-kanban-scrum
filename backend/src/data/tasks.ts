import Task, {TaskStatus, TaskPoints,  TaskPriority} from '../models/task';

const tasks = [
  // Tasks for Sprint #1
  {
    idsprint: 1,
    iduser: 1,
    title: 'Setup project structure',
    taskdescription: 'Create initial project structure and setup environment',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.high,
    expectedTime: 10,
    doneTime: 8,
    assignedFullName: 'Charles Xavier',
  },
  {
    idsprint: 1,
    iduser: 2,
    title: 'Develop login module',
    taskdescription: 'Create login module with authentication',
    status: TaskStatus.done,
    points: TaskPoints.thirteen,
    priority: TaskPriority.high,
    expectedTime: 15,
    doneTime: 14,
    assignedFullName: 'Scott Summers',
  },
  {
    idsprint: 1,
    iduser: 3,
    title: 'Setup database',
    taskdescription: 'Setup MySQL database and create initial schema',
    status: TaskStatus.done,
    points: TaskPoints.five,
    priority: TaskPriority.medium,
    expectedTime: 8,
    doneTime: 6,
    assignedFullName: 'Jean Grey',
  },
  {
    idsprint: 1,
    iduser: 4,
    title: 'Create user interface',
    taskdescription: 'Develop initial user interface using React',
    status: TaskStatus.done,
    points: TaskPoints.five,
    priority: TaskPriority.medium,
    expectedTime: 10,
    doneTime: 9,
    assignedFullName: 'Ororo Munroe',
  },
  // Tasks for Sprint #2
  {
    idsprint: 2,
    iduser: 1,
    title: 'Implement user roles',
    taskdescription: 'Create and manage user roles in the system',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.high,
    expectedTime: 12,
    doneTime: 10,
    assignedFullName: 'Charles Xavier',
  },
  {
    idsprint: 2,
    iduser: 2,
    title: 'Develop dashboard module',
    taskdescription: 'Create dashboard module for user analytics',
    status: TaskStatus.done,
    points: TaskPoints.thirteen,
    priority: TaskPriority.high,
    expectedTime: 14,
    doneTime: 12,
    assignedFullName: 'Scott Summers',
  },
  {
    idsprint: 2,
    iduser: 5,
    title: 'Setup CI/CD pipeline',
    taskdescription: 'Configure continuous integration and deployment',
    status: TaskStatus.done,
    points: TaskPoints.five,
    priority: TaskPriority.medium,
    expectedTime: 8,
    doneTime: null,
    assignedFullName: 'Logan',
  },
  {
    idsprint: 2,
    iduser: 6,
    title: 'Develop notification system',
    taskdescription: 'Implement notification system for user alerts',
    status: TaskStatus.done,
    points: TaskPoints.five,
    priority: TaskPriority.medium,
    expectedTime: 10,
    doneTime: 6,
    assignedFullName: 'Anna Marie',
  },
  // Tasks for Sprint #3
  {
    idsprint: 3,
    iduser: 1,
    title: 'Integrate third-party API',
    taskdescription: 'Integrate third-party API for data fetching',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.high,
    expectedTime: 10,
    doneTime: 9,
    assignedFullName: 'Charles Xavier',
  },
  {
    idsprint: 3,
    iduser: 2,
    title: 'Optimize database queries',
    taskdescription: 'Optimize slow database queries for performance',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.high,
    expectedTime: 10,
    doneTime: 10,
    assignedFullName: 'Scott Summers',
  },
  {
    idsprint: 3,
    iduser: 3,
    title: 'Create testing framework',
    taskdescription: 'Develop testing framework for unit tests',
    status: TaskStatus.done,
    points: TaskPoints.thirteen,
    priority: TaskPriority.high,
    expectedTime: 14,
    doneTime: 13,
    assignedFullName: 'Jean Grey',
  },
  {
    idsprint: 3,
    iduser: 4,
    title: 'Improve UI/UX design',
    taskdescription: 'Enhance UI/UX design for better user experience',
    status: TaskStatus.done,
    points: TaskPoints.thirteen,
    priority: TaskPriority.medium,
    expectedTime: 12,
    doneTime: 11,
    assignedFullName: 'Ororo Munroe',
  },
  // Tasks for Sprint #4
  {
    idsprint: 4,
    iduser: 1,
    title: 'Refactor codebase',
    taskdescription: 'Refactor codebase for maintainability',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.high,
    expectedTime: 10,
    doneTime: 8,
    assignedFullName: 'Charles Xavier',
  },
  {
    idsprint: 4,
    iduser: 2,
    title: 'Implement caching',
    taskdescription: 'Implement caching for improved performance',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.high,
    expectedTime: 12,
    doneTime: 11,
    assignedFullName: 'Scott Summers',
  },
  {
    idsprint: 4,
    iduser: 3,
    title: 'Update security protocols',
    taskdescription: 'Update security protocols to latest standards',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.high,
    expectedTime: 10,
    doneTime: 9,
    assignedFullName: 'Jean Grey',
  },
  {
    idsprint: 4,
    iduser: 5,
    title: 'Develop admin panel',
    taskdescription: 'Create admin panel for system management',
    status: TaskStatus.done,
    points: TaskPoints.thirteen,
    priority: TaskPriority.medium,
    expectedTime: 15,
    doneTime: 14,
    assignedFullName: 'Logan',
  },
  // Tasks for Sprint #5
  {
    idsprint: 5,
    iduser: 1,
    title: 'Conduct user testing',
    taskdescription: 'Conduct user testing for feedback',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.high,
    expectedTime: 10,
    doneTime: 8,
    assignedFullName: 'Charles Xavier',
  },
  {
    idsprint: 5,
    iduser: 2,
    title: 'Implement feedback',
    taskdescription: 'Implement user feedback into the system',
    status: TaskStatus.done,
    points: TaskPoints.thirteen,
    priority: TaskPriority.high,
    expectedTime: 14,
    doneTime: 13,
    assignedFullName: 'Scott Summers',
  },
  {
    idsprint: 5,
    iduser: 4,
    title: 'Enhance logging',
    taskdescription: 'Enhance logging for better error tracking',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.medium,
    expectedTime: 10,
    doneTime: 9,
    assignedFullName: 'Ororo Munroe',
  },
  {
    idsprint: 5,
    iduser: 6,
    title: 'Optimize front-end performance',
    taskdescription: 'Optimize front-end performance for faster load times',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.medium,
    expectedTime: 12,
    doneTime: 11,
    assignedFullName: 'Anna Marie',
  },
  // Tasks for Sprint #6
  {
    idsprint: 6,
    iduser: 1,
    title: 'Finalize documentation',
    taskdescription: 'Finalize project documentation',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.medium,
    expectedTime: 8,
    doneTime: 7,
    assignedFullName: 'Charles Xavier',
  },
  {
    idsprint: 6,
    iduser: 2,
    title: 'Release version 1.0',
    taskdescription: 'Prepare and release version 1.0 of the product',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.medium,
    expectedTime: 15,
    doneTime: 13,
    assignedFullName: 'Scott Summers',
  },
  {
    idsprint: 6,
    iduser: 5,
    title: 'Post-release monitoring',
    taskdescription: 'Monitor system performance post-release',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.medium,
    expectedTime: 10,
    doneTime: 9,
    assignedFullName: 'Logan',
  },
  {
    idsprint: 6,
    iduser: 6,
    title: 'Plan next phase',
    taskdescription: 'Plan next phase of the project development',
    status: TaskStatus.done,
    points: TaskPoints.eight,
    priority: TaskPriority.medium,
    expectedTime: 12,
    doneTime: 12,
    assignedFullName: 'Anna Marie',
  },
];

const seedTasks = async () => {
    try {
      const existingTasks = await Task.findAll();
      if (existingTasks.length > 0) {
        console.log('Tasks already exist. Skipping seeding.');
        return;
      }

      for (const taskData of tasks) {
        await Task.create(taskData);
      }
      console.log('Tasks seeded successfully');
    } catch (error) {
      console.error('Error seeding tasks:', error);
    }
  };

export default seedTasks;