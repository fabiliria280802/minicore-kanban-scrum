"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importStar(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users = [
    {
        fullname: 'Charles Xavier',
        username: 'professorx',
        email: 'charles.xavier@example.com',
        password: 'SecurePass123!',
        type: user_1.UserType.Admin,
        position: user_1.UserPosition.ScrumMaster,
    },
    {
        fullname: 'Scott Summers',
        username: 'cyclops',
        email: 'scott.summers@example.com',
        password: 'SecurePass123!',
        type: user_1.UserType.Admin,
        position: user_1.UserPosition.ProductOwner,
    },
    {
        fullname: 'Jean Grey',
        username: 'phoenix',
        email: 'jean.grey@example.com',
        password: 'SecurePass123!',
        type: user_1.UserType.Dev,
        position: user_1.UserPosition.DeveloperFullStack,
    },
    {
        fullname: 'Ororo Munroe',
        username: 'storm',
        email: 'ororo.munroe@example.com',
        password: 'SecurePass123!',
        type: user_1.UserType.Dev,
        position: user_1.UserPosition.DeveloperFrontend,
    },
    {
        fullname: 'Logan',
        username: 'wolverine',
        email: 'logan@example.com',
        password: 'SecurePass123!',
        type: user_1.UserType.Dev,
        position: user_1.UserPosition.DeveloperBackend,
    },
    {
        fullname: 'Anna Marie',
        username: 'rogue',
        email: 'rogue@example.com',
        password: 'SecurePass123!',
        type: user_1.UserType.Dev,
        position: user_1.UserPosition.QualityAssurance,
    },
    {
        fullname: 'Hank McCoy',
        username: 'beast',
        email: 'hank.mccoy@example.com',
        password: 'SecurePass123!',
        type: user_1.UserType.Dev,
        position: user_1.UserPosition.Architect,
    },
    {
        fullname: 'Bobby Drake',
        username: 'iceman',
        email: 'bobby.drake@example.com',
        password: 'SecurePass123!',
        type: user_1.UserType.Dev,
        position: user_1.UserPosition.UXDesigner,
    },
    {
        fullname: 'Kurt Wagner',
        username: 'nightcrawler',
        email: 'kurt.wagner@example.com',
        password: 'SecurePass123!',
        type: user_1.UserType.Dev,
        position: user_1.UserPosition.UXWriter,
    },
    {
        fullname: 'Wade Wilson',
        username: 'deadpool',
        email: 'Ilove.wolverine@example.com',
        password: 'SecurePass123!',
        type: user_1.UserType.Viewer,
        position: user_1.UserPosition.Intern,
    },
    {
        fullname: 'Fabs',
        username: 'fabiliria',
        email: 'fabs@example.com',
        password: 'SecurePass123!',
        type: user_1.UserType.Viewer,
        position: user_1.UserPosition.Intern,
    },
];
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUsers = yield user_1.default.findAll();
        if (existingUsers.length > 0) {
            console.log('Users already exist. Skipping seeding.');
            return;
        }
        for (const userData of users) {
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
            yield user_1.default.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        }
        console.log('Users seeded successfully');
    }
    catch (error) {
        console.error('Error seeding users:', error);
    }
});
exports.default = seedUsers;
