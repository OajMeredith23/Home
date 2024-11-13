// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import bodyParser from 'body-parser';
const fetch = (...args: [any, any]) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;



const allowedOrigins = ['http://localhost:3000', 'http://192.168.1.214:3000','https://home.panthabunny.co.uk'];

app.use(cors({
  origin: function(origin, callback){
  // allow requests with no origin 
  // (like mobile apps or curl requests)
  if(!origin) return callback(null, true);
  if(allowedOrigins.indexOf(origin) === -1){
  const msg = 'The CORS policy for this site does not ' +
  'allow access from the specified Origin.';
  return callback(new Error(msg), false);
  }
  return callback(null, true);
  }
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


app.post("/status-request", async (req: Request, res: Response) => {

  console.log("req", req.body)

  if(!req.body.address) res.send({ success: true})

    try {
      const pico_response = await fetch(`${req.body.address}/?status_request=truezz`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("header", [...pico_response.headers])
      // Check for a non-200 response status
      if (!pico_response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${pico_response.status} - ${pico_response.statusText}`);
      }
      const pico_json = await pico_response.json()
      console.log("Response", pico_json)
      res.json({ success: true, device_response: pico_json })
        
      } catch (error) {
        console.error("ERR",req.body.address, error)
        res.json({ success: false })
      
    }
    // res.sendStatus(200)
})

app.post("/control-pico", async (req: Request, res: Response) => {

  console.log("control pico req", req.body)

  if(!req.body.address) res.send({ success: true})

    const {address, toggle = undefined, scale = undefined} = req.body
    const url = `${address}/?toggle=${toggle}&scale=${scale}` 
    console.log("url", url)
    try {
      const pico_response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("header", [...pico_response.headers])
      // Check for a non-200 response status
      if (!pico_response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${pico_response.status} - ${pico_response.statusText}`);
      }
      const pico_json = await pico_response.json()
      console.log("Response", pico_json)
      res.json({ success: true, device_response: pico_json })
        
      } catch (error) {
        console.error("ERR",req.body.address, error)
        res.json({ success: false })
      
    }
})