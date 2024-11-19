'use client'
import {useState, useEffect} from 'react'
import { devices } from "@/constants/devices"
import { DeviceControlPanel } from "@/components/device-control-panel"
import {socket} from "@/utils/socket"

export default function Home() {
    


  return (
    <section className="space-y-xs-s py-l">

      {devices.map(device => {
        return (
          <DeviceControlPanel key={device.address} {...device}/>
        )
      })}
    </section>
  );
}
