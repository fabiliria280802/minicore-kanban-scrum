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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSprint = exports.putSprint = exports.postSprint = exports.getSprints = exports.getSprint = void 0;
var sprint_1 = __importDefault(require("../models/sprint"));
var prediction_1 = __importDefault(require("../models/prediction"));
var getSprint = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, sprint, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, sprint_1.default.findByPk(id)];
            case 1:
                sprint = _a.sent();
                if (!sprint) {
                    return [2 /*return*/, res.status(404).json({ msg: "Sprint not found", id: id })];
                }
                res.json(sprint);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    res.status(500).json({ error: error_1.message });
                }
                else {
                    res.status(500).json({ error: "An unexpected error occurred" });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSprint = getSprint;
var getSprints = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sprints, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sprint_1.default.findAll()];
            case 1:
                sprints = _a.sent();
                res.json(sprints);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    res.status(500).json({ error: error_2.message });
                }
                else {
                    res.status(500).json({ error: "An unexpected error occurred" });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSprints = getSprints;
var postSprint = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, title, initialDate, finalDate, startDate, endDate, timeDiff, dayDiff, newSprint, completedSprints, fulfilledPointsArray, mean_1, stdDev, predictedPointsLower, predictedPointsUpper, confidenceInterval, prediction, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, title = _a.title, initialDate = _a.initialDate, finalDate = _a.finalDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                startDate = new Date(initialDate);
                endDate = new Date(finalDate);
                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ error: "Las fechas proporcionadas no son válidas." })];
                }
                if (endDate <= startDate) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({
                            error: "La fecha final no puede ser anterior o igual a la fecha inicial.",
                        })];
                }
                timeDiff = endDate.getTime() - startDate.getTime();
                dayDiff = timeDiff / (1000 * 3600 * 24);
                if (dayDiff > 15) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({
                            error: "La diferencia entre la fecha inicial y final no puede ser mayor a 15 días.",
                        })];
                }
                return [4 /*yield*/, sprint_1.default.create(req.body)];
            case 2:
                newSprint = _b.sent();
                return [4 /*yield*/, sprint_1.default.findAll({
                        where: { sprintstatus: 'completado' }
                    })];
            case 3:
                completedSprints = _b.sent();
                if (!(completedSprints.length >= 5)) return [3 /*break*/, 5];
                fulfilledPointsArray = completedSprints.map(function (sprint) { return sprint.get('fulfilledPoints'); });
                mean_1 = fulfilledPointsArray.reduce(function (acc, val) { return acc + val; }, 0) / fulfilledPointsArray.length;
                stdDev = Math.sqrt(fulfilledPointsArray.map(function (val) { return Math.pow(val - mean_1, 2); }).reduce(function (acc, val) { return acc + val; }, 0) / fulfilledPointsArray.length);
                predictedPointsLower = Math.max(0, mean_1 - stdDev);
                predictedPointsUpper = Math.max(predictedPointsLower, mean_1 + stdDev);
                confidenceInterval = "".concat({ predictedPointsLower: predictedPointsLower }, " - ").concat({ predictedPointsUpper: predictedPointsUpper });
                return [4 /*yield*/, prediction_1.default.create({
                        predictedPointsLower: predictedPointsLower,
                        predictedPointsUpper: predictedPointsUpper,
                        confidenceInterval: confidenceInterval
                    })];
            case 4:
                prediction = _b.sent();
                _b.label = 5;
            case 5:
                res.status(201).json(newSprint);
                return [3 /*break*/, 7];
            case 6:
                error_3 = _b.sent();
                if (error_3 instanceof Error) {
                    res.status(500).json({ error: error_3.message });
                }
                else {
                    res.status(500).json({ error: "Error al insertar sprint" });
                }
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.postSprint = postSprint;
//TODO: NUEVA VALIDACION
var putSprint = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, sprint, completedSprints, fulfilledPointsArray, mean_2, stdDev, predictedPointsLower, predictedPointsUpper, confidenceInterval, idPrediction, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                id = req.params.id;
                console.log("Update Sprint ID:", id);
                console.log("Data to Update:", req.body);
                return [4 /*yield*/, sprint_1.default.findByPk(id)];
            case 1:
                sprint = _a.sent();
                if (!sprint) {
                    return [2 /*return*/, res.status(404).json({ msg: "Sprint not found", id: id })];
                }
                return [4 /*yield*/, sprint.update(req.body)];
            case 2:
                _a.sent();
                console.log("Updated Sprint:", sprint);
                return [4 /*yield*/, sprint_1.default.findAll({
                        where: { sprintstatus: 'completado' }
                    })];
            case 3:
                completedSprints = _a.sent();
                if (!(completedSprints.length >= 5)) return [3 /*break*/, 5];
                fulfilledPointsArray = completedSprints.map(function (s) { return s.get('fulfilledPoints'); });
                mean_2 = fulfilledPointsArray.reduce(function (acc, val) { return acc + val; }, 0) / fulfilledPointsArray.length;
                stdDev = Math.sqrt(fulfilledPointsArray.map(function (val) { return Math.pow(val - mean_2, 2); }).reduce(function (acc, val) { return acc + val; }, 0) / fulfilledPointsArray.length);
                predictedPointsLower = Math.max(0, mean_2 - stdDev);
                predictedPointsUpper = Math.max(predictedPointsLower, mean_2 + stdDev);
                confidenceInterval = "".concat({ predictedPointsLower: predictedPointsLower }, " - ").concat({ predictedPointsUpper: predictedPointsUpper });
                idPrediction = sprint.get('idprediction');
                if (!idPrediction) return [3 /*break*/, 5];
                return [4 /*yield*/, prediction_1.default.update({
                        predictedPointsLower: predictedPointsLower,
                        predictedPointsUpper: predictedPointsUpper,
                        confidenceInterval: confidenceInterval
                    }, {
                        where: { id: idPrediction }
                    })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                res.json({ msg: "Sprint updated", sprint: sprint });
                return [3 /*break*/, 7];
            case 6:
                error_4 = _a.sent();
                console.error("Update Error:", error_4);
                res.status(500).json({ error: "Error al actualizar sprint" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.putSprint = putSprint;
var deleteSprint = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, sprint, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, sprint_1.default.findByPk(id)];
            case 1:
                sprint = _a.sent();
                if (!sprint) {
                    return [2 /*return*/, res.status(404).json({ msg: "Sprint not found", id: id })];
                }
                return [4 /*yield*/, sprint.destroy()];
            case 2:
                _a.sent();
                res.json({ msg: "Sprint deleted" });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                if (error_5 instanceof Error) {
                    res.status(500).json({ error: error_5.message });
                }
                else {
                    res.status(500).json({ error: "Error al eliminar sprint" });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteSprint = deleteSprint;
