// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import bodyParser from 'body-parser';

import { devices } from "./constants/initial-state";

const fetch = (...args: [any, any]) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

const allowedOrigins = ['http://localhost:3000', 'http://192.168.1.214:3000', 'http://localhost:5173', 'http://pi5.local:3000', 'https://home.panthabunny.co.uk'];

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

app.locals.devices = devices

app.get("/", (req: Request, res: Response) => {
  res.send("Home Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('/inital_state', async (req: Request, res: Response) => {
  res.json(app.locals.devices)
})


app.post("/status-request", async (req: Request, res: Response) => {

    if(!req.body.address) res.send({ success: true })

    try {
      const pico_response = await fetch(`${req.body.address}/?status_request=true`, {
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
      res.json({success: true})
      // const pico_json = await pico_response.json()
      // if(pico_json && typeof pico_json === 'object' && pico_json.hasOwnProperty('state')){
      // if(pico_json && typeof pico_json === 'object' && pico_json.hasOwnProperty('state')){
      //   console.log("STATE", (pico_json as any).state)
      //   res.json({ success: true, device_response: (pico_json as any).state })

      // }
        
      } catch (error) {
        console.error("ERR",req.body.address, error)
        res.json({ success: false })
      
    }
    // res.sendStatus(200)
})

app.post("/control-pico", async (req: Request, res: Response) => {

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
      if(pico_json && typeof pico_json === 'object' && pico_json.hasOwnProperty('state')){
        const deviceName = (pico_json as any).device
        app.locals.devices[deviceName].state = (pico_json as any).state

        console.log("NAME", deviceName, app.locals.devices)
        res.json({ success: true, device_response: (pico_json as any).state, full: app.locals.devices })
      }
        
      } catch (error) {
        console.error("ERR",req.body.address, error)
        res.json({ success: false })
      
    }
})


/** WLED devices */
app.post('/wled-status', async (req: Request, res: Response) => {
  const address = req.body.address 

  if(!address) res.send({success: false})

  console.log("Address", req.body)

  try {
    const wled_res = await fetch(`${address}/json`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })

    if(!wled_res.ok) throw new Error (`${address} is not connected`)
    if(wled_res.ok){
      res.send({success: true})
    }
  } catch (error) {
    res.send({success: false})
  }
})  


app.post('/control-wled', async (req: Request, res: Response) => {
  const {address, toggle, device_name} = req.body 

  console.log("Controlling", address)

  try {
    const url = `${address}/json/state`
    console.log("url", url, toggle)
    const wled_res = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "on": toggle
      })
    })

    const json = await wled_res.json()
    if(!wled_res.ok) throw new Error (`${address} is not connected`)
    if((json as any).success){
      // console.log("Local", device_name, app.locals.devices)
      app.locals.devices[device_name].state = {toggle: toggle ? 'on' : 'off'}
      res.json({success: true, device_response: {toggle: toggle ? 'on' : 'off'}, full: app.locals.devices})
    }
  } catch (error) {
    console.log({error})
    res.json({success: false})
  }
})
