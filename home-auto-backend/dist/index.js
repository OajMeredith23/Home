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
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const initial_state_1 = require("./constants/initial-state");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const allowedOrigins = ['http://localhost:3000', 'http://192.168.1.214:3000', 'http://pi5.local:3000', 'https://home.panthabunny.co.uk'];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.locals.devices = initial_state_1.devices;
app.get("/", (req, res) => {
    res.send("Home Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
app.get('/inital_state', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(app.locals.devices);
}));
app.post("/status-request", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req", req.body);
    if (!req.body.address)
        res.send({ success: true });
    try {
        const pico_response = yield fetch(`${req.body.address}/?status_request=true`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("header", [...pico_response.headers]);
        // Check for a non-200 response status
        if (!pico_response.ok) {
            // Handle HTTP errors
            throw new Error(`HTTP error! Status: ${pico_response.status} - ${pico_response.statusText}`);
        }
        const pico_json = yield pico_response.json();
        if (pico_json && typeof pico_json === 'object' && pico_json.hasOwnProperty('state')) {
            console.log("STATE", pico_json.state);
            res.json({ success: true, device_response: pico_json.state });
        }
    }
    catch (error) {
        console.error("ERR", req.body.address, error);
        res.json({ success: false });
    }
    // res.sendStatus(200)
}));
app.post("/control-pico", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.address)
        res.send({ success: true });
    const { address, toggle = undefined, scale = undefined } = req.body;
    const url = `${address}/?toggle=${toggle}&scale=${scale}`;
    console.log("url", url);
    try {
        const pico_response = yield fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("header", [...pico_response.headers]);
        // Check for a non-200 response status
        if (!pico_response.ok) {
            // Handle HTTP errors
            throw new Error(`HTTP error! Status: ${pico_response.status} - ${pico_response.statusText}`);
        }
        const pico_json = yield pico_response.json();
        console.log("Response", pico_json);
        console.log("Response", pico_json);
        console.log("IS", pico_json && typeof pico_json === 'object' && pico_json.hasOwnProperty('state'));
        if (pico_json && typeof pico_json === 'object' && pico_json.hasOwnProperty('state')) {
            const deviceName = pico_json.device;
            app.locals.devices[deviceName].state = pico_json.state;
            console.log("NAME", deviceName, app.locals.devices);
            res.json({ success: true, device_response: pico_json.state, full: app.locals.devices });
        }
    }
    catch (error) {
        console.error("ERR", req.body.address, error);
        res.json({ success: false });
    }
}));
