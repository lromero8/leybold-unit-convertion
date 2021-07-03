import { SystemOfUnitsConfig, area, frequency, length, mass, pressure, temperature, time, volume } from 'ng-units';


export function systemOfUnitsInitializer(): SystemOfUnitsConfig {
    return {
        quantities: [area, frequency, length, mass, pressure, temperature, time, volume]
    };
}