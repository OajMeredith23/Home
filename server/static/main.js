const PICO_ADDRESS = 'http://192.168.1.18'

const onBtn = document.querySelector('#on')

onBtn.addEventListener('click', () => {
    console.log(onBtn)
    fetch(`${PICO_ADDRESS}/?light=on`)
})

const offBtn = document.querySelector('#off')

offBtn.addEventListener('click', () => {
    console.log(offBtn)
    fetch(`${PICO_ADDRESS}/?light=off`)
})