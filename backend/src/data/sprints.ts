import Sprint, { SprintStatus } from '../models/sprint';

const sprints = [
  {
    title: 'Sprint #1',
    initialDate: new Date('2023-01-01'),
    finalDate: new Date('2023-01-14'),
    sprintstatus: SprintStatus.completed,
  },
  {
    title: 'Sprint #2',
    initialDate: new Date('2023-01-15'),
    finalDate: new Date('2023-01-28'),
    sprintstatus: SprintStatus.completed,
  },
  {
    title: 'Sprint #3',
    initialDate: new Date('2023-01-29'),
    finalDate: new Date('2023-02-11'),
    sprintstatus: SprintStatus.completed,
  },
  {
    title: 'Sprint #4',
    initialDate: new Date('2023-02-12'),
    finalDate: new Date('2023-02-25'),
    sprintstatus: SprintStatus.completed,
  },
  {
    title: 'Sprint #5',
    initialDate: new Date('2023-02-26'),
    finalDate: new Date('2023-03-11'),
    sprintstatus: SprintStatus.completed,
  },
  {
    title: 'Sprint #6',
    initialDate: new Date('2023-03-12'),
    finalDate: new Date('2023-03-25'),
    sprintstatus: SprintStatus.toStart,
  },
];

const seedSprints = async () => {
    try {
      const existingSprints = await Sprint.findAll();
      if (existingSprints.length > 0) {
        console.log('Sprints already exist. Skipping seeding.');
        return;
      }

      for (const sprintData of sprints) {
        await Sprint.create(sprintData);
      }
      console.log('Sprints seeded successfully');
    } catch (error) {
      console.error('Error seeding sprints:', error);
    }
  };

export default seedSprints;

