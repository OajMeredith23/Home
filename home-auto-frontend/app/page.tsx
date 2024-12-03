import { devices } from "@/constants/devices"
import { DeviceControlPanel } from "@/components/device-control-panel"
import { IDeviceJSON } from "@/constants/devices"

export const revalidate = 0;

export default async function Home() {
    

  try {
    let data = await fetch('https://api.panthabunny.co.uk/inital_state')
    let devicesz: IDeviceJSON = await data.json()
    
    const deviceNames = Object.keys(devicesz)

  return (
    <section className="space-y-xs-s py-l">
      
      <details>
        <summary>
        See state
        </summary>
          <pre>
            {devicesz && JSON.stringify(devicesz, null, 2)}
          </pre>
      </details>
     


      {deviceNames.map(name => {
        const device = devicesz[name]
        return (
          <DeviceControlPanel key={device.address} {...device}/>
        )
      })}
    </section>
  );

  } catch (error) {

    return <p>Didn't receive anything from the API :(</p>
  }


  
}

