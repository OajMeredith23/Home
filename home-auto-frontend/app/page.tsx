import { CustomDeviceControlPanel } from "@/components/custom-device-control-panel"
import { WledDeviceControlPanel } from "@/components/wled-control-panel";
import { IDevice } from "@/constants/devices"

export const revalidate = 0;

export default async function Home() {
    

  try {
    let data = await fetch('https://api.panthabunny.co.uk/inital_state')
    let devices: {[key: string]: IDevice} = await data.json()
    
    const deviceNames = Object.keys(devices)

  return (
    <section className="space-y-xs-s py-l">
      
      <details>
        <summary>
        See state
        </summary>
          <pre>
            {devices && JSON.stringify(devices, null, 2)}
          </pre>
      </details>
     


      {deviceNames.map(name => {
        const device = devices[name]
        return device.type === 'custom' ? (
          <CustomDeviceControlPanel key={device.address} {...device}/>
        ) : <WledDeviceControlPanel {...device} device_name={name}/>
      })}
    </section>
  );

  } catch (error) {

    return <p>Didn't receive anything from the API :(</p>
  }


  
}

