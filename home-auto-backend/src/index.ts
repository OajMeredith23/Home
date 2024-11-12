// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


app.get("/status-request", async (req: Request, res: Response) => {

  console.log("req", req.body)
  //  const response = await fetch('http://192.168.1.12', )
    // console.log("hello, doing the status of the pico ok.")
    res.send({ success:true })
})

app.get("/control-pico", async (req: Request, res: Response) => {

  console.log("req", req.params)
  //  const response = await fetch('http://192.168.1.12', )
    console.log("hello, doing the thing to the pico ok.")
    res.send({success:true })
})