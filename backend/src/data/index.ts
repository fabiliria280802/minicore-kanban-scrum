import seedUsers from './users';
import seedSprints from './sprints';
import seedTasks from './tasks';
import seedSubtasks from './subtasks';

export const seedDatabase = async () => {
  try {
    await seedUsers();
    await seedSprints();
    await seedTasks();
    await seedSubtasks();
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};



