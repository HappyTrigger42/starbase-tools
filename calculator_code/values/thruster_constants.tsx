export interface hardpoint_interface {
    voxel_volume: number,
    weight: number
}

export interface thruster_nozzle_interface {
    thrust: number,
    weight: number
    voxel_volume: number
}

export interface electricity_converter_interface {
    converter: number,
    weight: number
    voxel_volume: number
}

export interface propellant_converter_interface {
    converter: number,
    weight: number
    voxel_volume: number
}

export interface thruster_body_interface {
    thrust: number,
    electricity_consumption: number,
    propellant_consumption: number,
    weight: number
    voxel_volume: number
}

export interface combustion_chamber_interface {
    weight: number
    voxel_volume: number
}

export interface maneuver_thruster_interface {
    thrust: number
    electricity_consumption: number,
    propellant_consumption: number,
    weight: number
    voxel_volume: number
}

export interface plasma_thruster_body_interface {
    thrust: number,
    electricity_consumption: number,
    propellant_consumption: number,
    weight: number
    voxel_volume: number
}

export interface plasma_thruster_nozzle_interface {
    thrust: number,
    electricity_consumption: number,
    propellant_consumption: number,
    weight: number
    voxel_volume: number
}

export interface plasma_thruster_ring_interface {
    thrust: number,
    electricity_consumption: number,
    propellant_consumption: number,
    weight: number
    voxel_volume: number
}

export const stardard_hardpoint: hardpoint_interface = {
    voxel_volume: 57320,
    weight: 570.3
}

export const maneuver_thruster_tier_1: maneuver_thruster_interface = {
    thrust: 40000,
    electricity_consumption: 40,
    propellant_consumption: 18.2,
    weight: 553.35,
    voxel_volume: 46160
}

export const maneuver_thruster_tier_2: maneuver_thruster_interface = {
    thrust: 44000,
    electricity_consumption: 36,
    propellant_consumption: 16.5,
    weight: 549.4,
    voxel_volume: 46160
}

export const maneuver_thruster_tier_3: maneuver_thruster_interface = {
    thrust: 52000,
    electricity_consumption: 60,
    propellant_consumption: 22,
    weight: 587.98,
    voxel_volume: 46160
}

export const no_nozzle: thruster_nozzle_interface = {
    thrust: 0,
    weight: 0,
    voxel_volume: 0
}

export const box_thruster_tier_1_nozzle: thruster_nozzle_interface = {
    thrust: 100000,
    voxel_volume: 418590,
    weight: 5644.87
}

export const box_thruster_tier_2_nozzle: thruster_nozzle_interface = {
    thrust: 110000,
    voxel_volume: 418590,
    weight: 5497.66
}

export const box_thruster_tier_3_nozzle: thruster_nozzle_interface = {
    thrust: 130000,
    voxel_volume: 418590,
    weight: 5341.72
}

export const triangle_thruster_tier_1_nozzle: thruster_nozzle_interface = {
    thrust: 60000,
    voxel_volume: 163820,
    weight: 2167.89
}

export const triangle_thruster_tier_2_nozzle: thruster_nozzle_interface = {
    thrust: 66000,
    voxel_volume: 163820,
    weight: 2151.63
}

export const triangle_thruster_tier_3_nozzle: thruster_nozzle_interface = {
    thrust: 78000,
    voxel_volume: 163820,
    weight: 2090.59
}

export const no_electricity_converter: electricity_converter_interface = {
    converter: 0,
    voxel_volume: 0,
    weight: 0
}

export const tier_1_electricity_converter: electricity_converter_interface = {
    converter: 25,
    voxel_volume: 18240,
    weight: 171.22
}

export const tier_2_electricity_converter: electricity_converter_interface = {
    converter: 30,
    voxel_volume: 18240,
    weight: 162.12
}

export const tier_3_electricity_converter: electricity_converter_interface = {
    converter: 35,
    voxel_volume: 18240,
    weight: 160.23
}

export const no_propellant_converter: propellant_converter_interface = {
    converter: 0,
    voxel_volume: 0,
    weight: 0
}

export const tier_1_propellant_converter: propellant_converter_interface = {
    converter: 20,
    voxel_volume: 20360,
    weight: 191.20
}

export const tier_2_propellant_converter: propellant_converter_interface = {
    converter: 25,
    voxel_volume: 20360,
    weight: 191.95
}

export const tier_3_propellant_converter: propellant_converter_interface = {
    converter: 35,
    voxel_volume: 20360,
    weight: 189.19
}

export const box_thruster_tier_1_body: thruster_body_interface = {
    thrust: 400000,
    electricity_consumption: 240,
    propellant_consumption: 34.9,
    voxel_volume: 840030,
    weight: 10362.0
}

export const box_thruster_tier_2_body: thruster_body_interface = {
    thrust: 440000,
    electricity_consumption: 216,
    propellant_consumption: 31.4,
    voxel_volume: 840030,
    weight: 10117.81
}

export const box_thruster_tier_3_body: thruster_body_interface = {
    thrust: 520000,
    electricity_consumption: 360,
    propellant_consumption: 48.9,
    voxel_volume: 840030,
    weight: 8812.58
}

export const triangle_thruster_tier_1_body: thruster_body_interface = {
    thrust: 240000,
    electricity_consumption: 110,
    propellant_consumption: 31.3,
    voxel_volume: 569980,
    weight: 7030.81
}

export const triangle_thruster_tier_2_body: thruster_body_interface = {
    thrust: 264000,
    electricity_consumption: 99,
    propellant_consumption: 28.3,
    voxel_volume: 569980,
    weight: 6435.96
}

export const triangle_thruster_tier_3_body: thruster_body_interface = {
    thrust: 312000,
    electricity_consumption: 165,
    propellant_consumption: 44,
    voxel_volume: 569980,
    weight: 5979.52
}

export const box_thruster_combustion_chamber: combustion_chamber_interface = {
    weight: 5972,
    voxel_volume: 600.2
}

export const triangle_thruster_combustion_chamber: combustion_chamber_interface = {
    weight: 5769,
    voxel_volume: 384.60
}

export const plasma_thruster_body: plasma_thruster_body_interface = {
    thrust: 4000000,
    electricity_consumption: 913.3,
    propellant_consumption: 248,
    weight: 486863.1,
    voxel_volume: 52007728
}

export const plasma_thruster_nozzle: plasma_thruster_nozzle_interface = {
    thrust: 1000000,
    electricity_consumption: 0,
    propellant_consumption: 0,
    weight: 52289.4,
    voxel_volume: 5580252
}


export const plasma_thruster_ring: plasma_thruster_ring_interface = {
    thrust: 7000000,
    electricity_consumption: 880,
    propellant_consumption: 386,
    weight: 139146.4,
    voxel_volume: 14849536
}

export function get_box_body_from_tier(tier: number) {
    switch (tier) {
        case 1:
            return box_thruster_tier_1_body;
        case 2:
            return box_thruster_tier_2_body;
        case 3:
            return box_thruster_tier_3_body;
        default:
            console.log("Unknown thruster tier " + tier + " for box thruster, defaulting on tier 1");
            return box_thruster_tier_1_body;
    }
}

export function get_triangle_body_from_tier(tier: number) {
    switch (tier) {
        case 1:
            return triangle_thruster_tier_1_body;
        case 2:
            return triangle_thruster_tier_2_body;
        case 3:
            return triangle_thruster_tier_3_body;
        default:
            console.log("Unknown thruster tier " + tier + " for triangle thruster, defaulting on tier 1");
            return triangle_thruster_tier_1_body;
    }
}

export function get_box_nozzle_from_tier(tier: number) {
    switch (tier) {
        case 0:
            return no_nozzle;
        case 1:
            return box_thruster_tier_1_nozzle;
        case 2:
            return box_thruster_tier_2_nozzle;
        case 3:
            return box_thruster_tier_3_nozzle;
        default:
            console.log("Unknown thruster tier " + tier + " for box thruster, defaulting on tier 1");
            return box_thruster_tier_1_nozzle;
    }
}

export function get_triangle_nozzle_from_tier(tier: number) {
    switch (tier) {
        case 0:
            return no_nozzle;
        case 1:
            return triangle_thruster_tier_1_nozzle;
        case 2:
            return triangle_thruster_tier_2_nozzle;
        case 3:
            return triangle_thruster_tier_3_nozzle;
        default:
            console.log("Unknown thruster tier " + tier + " for triangle thruster, defaulting on tier 1");
            return triangle_thruster_tier_1_nozzle;
    }
}

export function get_electricity_converter_from_tier(tier: number) {
    switch (tier) {
        case 0:
            return no_electricity_converter;
        case 1:
            return tier_1_electricity_converter;
        case 2:
            return tier_2_electricity_converter;
        case 3:
            return tier_3_electricity_converter;
        default:
            console.log("Unknown thruster tier " + tier + " for electricity converter, defaulting on tier 1");
            return tier_1_electricity_converter;
    }
}

export function get_propellant_converter_from_tier(tier: number) {
    switch (tier) {
        case 0:
            return no_propellant_converter;
        case 1:
            return tier_1_propellant_converter;
        case 2:
            return tier_2_propellant_converter;
        case 3:
            return tier_3_propellant_converter;
        default:
            console.log("Unknown thruster tier " + tier + " for propellant converter, defaulting on tier 1");
            return tier_1_propellant_converter;
    }
}

export function get_maneuver_thruster_from_tier(tier: number) {
    switch (tier) {
        case 1:
            return maneuver_thruster_tier_1;
        case 2:
            return maneuver_thruster_tier_2;
        case 3:
            return maneuver_thruster_tier_3;
        default:
            console.log("Unknown thruster tier " + tier + " for maneuver thruster, defaulting on tier 1");
            return maneuver_thruster_tier_1;
    }
}
