export interface IDevice {
    type: 'custom' | 'wled',
    name: string;
    address: string;
    description?: string;
    state: {
        toggle?: 'on' | 'off';
        scale?: string
    }
}