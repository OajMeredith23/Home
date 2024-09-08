'use client'
import { devices } from "@/constants/devices"
import { DeviceControlPanel } from "@/components/button/device-control-panel"


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
