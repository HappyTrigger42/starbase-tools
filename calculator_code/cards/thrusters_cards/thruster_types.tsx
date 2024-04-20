
export interface Plasma {
    type: 'plasma';
    quantity: number;
    rings: number;
    used_as_maneuver: boolean;
}

export interface Maneuver {
    type: 'maneuver';
    quantity: number;
    tier: 1 | 2 | 3;
    used_as_maneuver: boolean;
}

export interface Box {
    type: 'box';
    quantity: number;
    tier: 1 | 2 | 3;
    nozzle: 0 | 1 | 2 | 3;
    electricity_converter: 0 | 1 | 2 | 3;
    propellant_converter: 0 | 1 | 2 | 3;
    used_as_maneuver: boolean;
}

export interface Triangle {
    type: 'triangle';
    quantity: number;
    tier: 1 | 2 | 3;
    nozzle: 0 | 1 | 2 | 3;
    electricity_converter: 0 | 1 | 2 | 3;
    propellant_converter: 0 | 1 | 2 | 3;
    used_as_maneuver: boolean;
}

export type ThrusterChangeableFields = 'quantity' | 'rings' | 'tier' | 'nozzle' | 'electricity_converter' | 'propellant_converter' | 'used_as_maneuver';
export type ThrusterType = 'plasma' | 'maneuver' | 'box' | 'triangle';
export type Thruster = Plasma | Maneuver | Box | Triangle;
