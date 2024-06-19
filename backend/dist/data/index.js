"use strict";
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
exports.seedDatabase = void 0;
const users_1 = __importDefault(require("./users"));
const sprints_1 = __importDefault(require("./sprints"));
const tasks_1 = __importDefault(require("./tasks"));
const subtasks_1 = __importDefault(require("./subtasks"));
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, users_1.default)();
        yield (0, sprints_1.default)();
        yield (0, tasks_1.default)();
        yield (0, subtasks_1.default)();
        console.log("Database seeded successfully");
    }
    catch (error) {
        console.error("Error seeding database:", error);
    }
});
exports.seedDatabase = seedDatabase;
