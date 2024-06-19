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
Object.defineProperty(exports, "__esModule", { value: true });
const sprint_1 = __importStar(require("../models/sprint"));
const sprints = [
    {
        title: 'Sprint #1',
        initialDate: new Date('2023-01-01'),
        finalDate: new Date('2023-01-14'),
        sprintstatus: sprint_1.SprintStatus.completed,
    },
    {
        title: 'Sprint #2',
        initialDate: new Date('2023-01-15'),
        finalDate: new Date('2023-01-28'),
        sprintstatus: sprint_1.SprintStatus.completed,
    },
    {
        title: 'Sprint #3',
        initialDate: new Date('2023-01-29'),
        finalDate: new Date('2023-02-11'),
        sprintstatus: sprint_1.SprintStatus.completed,
    },
    {
        title: 'Sprint #4',
        initialDate: new Date('2023-02-12'),
        finalDate: new Date('2023-02-25'),
        sprintstatus: sprint_1.SprintStatus.completed,
    },
    {
        title: 'Sprint #5',
        initialDate: new Date('2023-02-26'),
        finalDate: new Date('2023-03-11'),
        sprintstatus: sprint_1.SprintStatus.completed,
    },
    {
        title: 'Sprint #6',
        initialDate: new Date('2023-03-12'),
        finalDate: new Date('2023-03-25'),
        sprintstatus: sprint_1.SprintStatus.toStart,
    },
];
const seedSprints = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingSprints = yield sprint_1.default.findAll();
        if (existingSprints.length > 0) {
            console.log('Sprints already exist. Skipping seeding.');
            return;
        }
        for (const sprintData of sprints) {
            yield sprint_1.default.create(sprintData);
        }
        console.log('Sprints seeded successfully');
    }
    catch (error) {
        console.error('Error seeding sprints:', error);
    }
});
exports.default = seedSprints;
