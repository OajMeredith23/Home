'use client'
import {Button} from "@/components/button"
import Link from "next/link"
import { useEffect, useState } from "react"

const PICO_ADDRESS = 'http://192.168.1.18'


interface IHandlePico {
  state: 'on' | 'off'
}
const handlePico =  async ({
  state
}: IHandlePico): { success: boolean; message: string} => {
  console.log("going...", state)
  try {
    const req = await fetch(`${PICO_ADDRESS}/?light=${state}`, { signal: AbortSignal.timeout(5000) })
    const res = await req.json()
    return {
      success: true,
      state,
      message: 'Request made'
    }
  } catch (error) {
    return {
      success: false,
      state,
      message:error.message
    }
  }
}
export default function Home() {

  const [picoState, setPicoState] = useState<IHandlePico["state"] | 'error'>()

  console.log({picoState});
  

  return (
    <div className={`flex items-center gap-2 p-2 ${picoState === 'error' ? 'bg-red-400' : ''}`}>
    <Button 
    className={`${picoState === 'on' ? 'bg-green-400' : ''} ${picoState === 'error' ? 'bg-slate-500 text-gray-300' : ''}`} 
    onClick={async () => {
      const picoResult = await handlePico({state: 'on'})
      console.log("On result", picoResult)
      setPicoState(picoResult.success ? picoResult.state : 'error' )
    }}>
      On
    </Button>
    <Button 
      className={`${picoState === 'off' ? 'bg-green-400' : ''} ${picoState === 'error' ? 'bg-slate-500 text-gray-300' : ''}`} 
      onClick={async () => {
        const picoResult = await handlePico({state: 'off'})
        console.log("Off result", picoResult)
        setPicoState(picoResult.success ? picoResult.state : 'error' )
      }}>
      Off
    </Button>
    </div>
  );
}
