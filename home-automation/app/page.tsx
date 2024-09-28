'use client'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useState, useEffect} from 'react'
import { devices } from "@/constants/devices"
import { DeviceControlPanel } from "@/components/device-control-panel"
import {socket} from "@/utils/socket"

export default function Home() {
  
  const [hostname, setHostname] = useState('')
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [messages, setMessages] = useState<string[]>([])
  
  useEffect(() => {
    if (socket.connected) {
      onConnect();
      {socket.io.opts.hostname && setHostname(socket.io.opts.hostname)}
    }
    console.log("messages", messages)

    console.log({socket})

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      
      // Listen for incoming messages
      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }
    

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on('message', (message) => {
      console.log("received", message)
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);



  const formSubmit = (formData: FormData) => {
    const message = formData.get('message')
    console.log("Sent", {message})
    socket.emit('message', message)
    // e.preventDefault()
    // console.log(e)
    // // const formData = new FormData(e.currentTarget)
    // // const formValues = {}

    // Object.entries()



  }

  return (
    <section className="space-y-xs-s py-l">

      <p>IP: { hostname || 'Not found' }</p>
      <p>Status: { isConnected ? "connected" : "disconnected" }</p>
      <p>Transport: { transport }</p>
      <form className="space-y-4" action={formSubmit}>
        <Input name="message"/>
        <Button type="submit">
          Submit
        </Button>
      </form>

      {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}

      {devices.map(device => {
        return (
          <DeviceControlPanel key={device.address} {...device}/>
        )
      })}
    </section>
  );
}
