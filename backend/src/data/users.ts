import User, {UserType, UserPosition} from '../models/user';
import bcrypt from 'bcrypt';

const users = [
  {
    fullname: 'Charles Xavier',
    username: 'professorx',
    email: 'charles.xavier@example.com',
    password: 'SecurePass123!',
    type: UserType.Admin,
    position: UserPosition.ScrumMaster,
  },
  {
    fullname: 'Scott Summers',
    username: 'cyclops',
    email: 'scott.summers@example.com',
    password: 'SecurePass123!',
    type: UserType.Admin,
    position: UserPosition.ProductOwner,
  },
  {
    fullname: 'Jean Grey',
    username: 'phoenix',
    email: 'jean.grey@example.com',
    password: 'SecurePass123!',
    type: UserType.Dev,
    position: UserPosition.DeveloperFullStack,
  },
  {
    fullname: 'Ororo Munroe',
    username: 'storm',
    email: 'ororo.munroe@example.com',
    password: 'SecurePass123!',
    type: UserType.Dev,
    position: UserPosition.DeveloperFrontend,
  },
  {
    fullname: 'Logan',
    username: 'wolverine',
    email: 'logan@example.com',
    password: 'SecurePass123!',
    type:  UserType.Dev,
    position: UserPosition.DeveloperBackend,
  },
  {
    fullname: 'Anna Marie',
    username: 'rogue',
    email: 'rogue@example.com',
    password: 'SecurePass123!',
    type:  UserType.Dev,
    position: UserPosition.QualityAssurance,
  },
  {
    fullname: 'Hank McCoy',
    username: 'beast',
    email: 'hank.mccoy@example.com',
    password: 'SecurePass123!',
    type:  UserType.Dev,
    position: UserPosition.Architect,
  },
  {
    fullname: 'Bobby Drake',
    username: 'iceman',
    email: 'bobby.drake@example.com',
    password: 'SecurePass123!',
    type:  UserType.Dev,
    position: UserPosition.UXDesigner,
  },
  {
    fullname: 'Kurt Wagner',
    username: 'nightcrawler',
    email: 'kurt.wagner@example.com',
    password: 'SecurePass123!',
    type: UserType.Dev,
    position: UserPosition.UXWriter,
  },
  {
    fullname: 'Wade Wilson',
    username: 'deadpool',
    email: 'Ilove.wolverine@example.com',
    password: 'SecurePass123!',
    type: UserType.Viewer,
    position: UserPosition.Intern,
  },
  {
    fullname: 'Fabs',
    username: 'fabiliria',
    email: 'fabs@example.com',
    password: 'SecurePass123!',
    type: UserType.Viewer,
    position: UserPosition.Intern,
  },
];

const seedUsers = async () => {
    try {
      const existingUsers = await User.findAll();
      if (existingUsers.length > 0) {
        console.log('Users already exist. Skipping seeding.');
        return;
      }

      for (const userData of users) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await User.create({
          ...userData,
          password: hashedPassword,
        });
      }
      console.log('Users seeded successfully');
    } catch (error) {
      console.error('Error seeding users:', error);
    }
  };

export default seedUsers;


