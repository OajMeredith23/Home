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
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
app.post("/status-request", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req", req.body);
    if (!req.body.address)
        res.send({ success: true });
    try {
        const pico_response = yield fetch(`${req.body.address}/?status_request=truezz`, {
            method: 'GET',
            headers: {
                "Content-Type": "text/html",
            },
        });
        console.log("header", [...pico_response.headers]);
        // Check for a non-200 response status
        if (!pico_response.ok) {
            // Handle HTTP errors
            throw new Error(`HTTP error! Status: ${pico_response.status} - ${pico_response.statusText}`);
        }
        const pico_json = yield pico_response.text();
        res.json({ success: true, device_response: "" });
    }
    catch (error) {
        console.error("ERR", req.body.address, error);
        res.json({ success: false });
    }
    // res.sendStatus(200)
}));
app.get("/control-pico", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req", req.params);
    //  const response = await fetch('http://192.168.1.12', )
    console.log("hello, doing the thing to the pico ok.");
    res.send({ success: true });
}));
