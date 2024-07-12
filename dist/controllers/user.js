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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //validacion si el usuario existe
    const user = yield user_1.User.findOne({
        where: {
            userName: username
        }
    });
    if (user) {
        return res.status(400).json({
            msg: "Usuario ya existente"
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield user_1.User.create({
            userName: username,
            password: hashedPassword
        });
        res.json({
            msg: `Usuario ${username} Creado Correctamente`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error",
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //validamos si usuario existe
    const user = yield user_1.User.findOne({
        where: {
            userName: username
        }
    });
    if (!user) {
        return res.status(400).json({
            msg: `Usuario ${username} no existe en la base de datos`
        });
    }
    //validamos password
    const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).json({
            msg: `Contraseña Incorrecta`
        });
    }
    //generamos el token
    const token = jsonwebtoken_1.default.sign({
        userName: username
    }, process.env.SECRET_KEY || 'prueba123');
    res.json({
        token
    });
});
exports.loginUser = loginUser;
