import {Thruster} from "../../../cards/thrusters_cards/thruster_types";
import {Chart_data_interface, chart_mode} from "./chart_data_interface";
import {
    box_thruster_combustion_chamber,
    get_box_body_from_tier,
    get_box_nozzle_from_tier, get_electricity_converter_from_tier,
    get_maneuver_thruster_from_tier,
    get_propellant_converter_from_tier,
    get_triangle_body_from_tier,
    get_triangle_nozzle_from_tier,
    plasma_thruster_body,
    plasma_thruster_nozzle,
    plasma_thruster_ring, stardard_hardpoint
} from "../../../values/thruster_constants";
import {remove_percentage} from "../../../../../utilities/remove_percentage";


function get_thruster_values_voxel_volume(thruster: Thruster) : [number, number][] {
    let ret: [number, number][] = []
    let buff_voxel_volume: number = 0
    let buff_thrust: number = 0
    let elec_converter = null
    let prop_converter = null
    switch (thruster.type) {
        case 'plasma':
            buff_voxel_volume = plasma_thruster_body.voxel_volume + plasma_thruster_nozzle.voxel_volume + stardard_hardpoint.voxel_volume
            buff_thrust = plasma_thruster_body.thrust + plasma_thruster_nozzle.thrust
            while (ret.length < thruster.quantity) {
                buff_voxel_volume += plasma_thruster_ring.voxel_volume
                buff_thrust += plasma_thruster_ring.thrust
                ret.push([buff_voxel_volume, buff_thrust])
            }
            return ret
        case 'maneuver':
            buff_voxel_volume = 0
            buff_thrust = 0
            const maneuver_thruster = get_maneuver_thruster_from_tier(thruster.tier)
            while (ret.length < thruster.quantity) {
                buff_voxel_volume += maneuver_thruster.voxel_volume + stardard_hardpoint.voxel_volume
                buff_thrust += maneuver_thruster.thrust
                ret.push([buff_voxel_volume, buff_thrust])
            }
            return ret;
        case 'box':
            buff_voxel_volume = 0
            buff_thrust = 0
            const box_thruster = get_box_body_from_tier(thruster.tier)
            const box_nozzle = get_box_nozzle_from_tier(thruster.nozzle)
            elec_converter = get_electricity_converter_from_tier(thruster.electricity_converter)
            prop_converter = get_propellant_converter_from_tier(thruster.propellant_converter)
            while (ret.length < thruster.quantity) {
                buff_voxel_volume += box_thruster.voxel_volume
                    + box_nozzle.voxel_volume
                    + elec_converter.voxel_volume
                    + prop_converter.voxel_volume
                    + box_thruster_combustion_chamber.voxel_volume
                    + stardard_hardpoint.voxel_volume
                buff_thrust += box_thruster.thrust + box_nozzle.thrust
                ret.push([buff_voxel_volume, buff_thrust])
            }
            return ret
        case 'triangle':
            buff_voxel_volume = 0
            buff_thrust = 0
            const triangle_thruster = get_triangle_body_from_tier(thruster.tier)
            const triangle_nozzle = get_triangle_nozzle_from_tier(thruster.nozzle)
            elec_converter = get_electricity_converter_from_tier(thruster.electricity_converter)
            prop_converter = get_propellant_converter_from_tier(thruster.propellant_converter)
            buff_voxel_volume += stardard_hardpoint.voxel_volume
            while (ret.length < thruster.quantity) {
                buff_voxel_volume += triangle_thruster.voxel_volume
                    + triangle_nozzle.voxel_volume
                    + elec_converter.voxel_volume
                    + prop_converter.voxel_volume
                    + box_thruster_combustion_chamber.voxel_volume
                buff_thrust += triangle_thruster.thrust + triangle_nozzle.thrust
                ret.push([buff_voxel_volume, buff_thrust])
            }
            return ret
        default:
            throw new Error("Unknown thruster type");
    }
}

function get_thruster_values_mass(thruster: Thruster) : [number, number][] {
    let ret: [number, number][] = []
    let buff_mass: number = 0
    let buff_thrust: number = 0
    let elec_converter = null
    let prop_converter = null
    switch (thruster.type) {
        case 'plasma':
            buff_mass = plasma_thruster_body.weight + plasma_thruster_nozzle.weight + stardard_hardpoint.weight
            buff_thrust = plasma_thruster_body.thrust + plasma_thruster_nozzle.thrust
            while (ret.length < thruster.quantity) {
                buff_mass += plasma_thruster_ring.weight
                buff_thrust += plasma_thruster_ring.thrust
                ret.push([buff_mass, buff_thrust])
            }
            return ret
        case 'maneuver':
            buff_mass = 0
            buff_thrust = 0
            const maneuver_thruster = get_maneuver_thruster_from_tier(thruster.tier)
            while (ret.length < thruster.quantity) {
                buff_mass += maneuver_thruster.weight + stardard_hardpoint.weight
                buff_thrust += maneuver_thruster.thrust
                ret.push([buff_mass, buff_thrust])
            }
            return ret;
        case 'box':
            buff_mass = 0
            buff_thrust = 0
            const box_thruster = get_box_body_from_tier(thruster.tier)
            const box_nozzle = get_box_nozzle_from_tier(thruster.nozzle)
            elec_converter = get_electricity_converter_from_tier(thruster.electricity_converter)
            prop_converter = get_propellant_converter_from_tier(thruster.propellant_converter)
            while (ret.length < thruster.quantity) {
                buff_mass += box_thruster.weight
                    + box_nozzle.weight
                    + elec_converter.weight
                    + prop_converter.weight
                    + box_thruster_combustion_chamber.weight
                    + stardard_hardpoint.weight
                buff_thrust += box_thruster.thrust + box_nozzle.thrust
                ret.push([buff_mass, buff_thrust])
            }
            return ret
        case 'triangle':
            buff_mass = 0
            buff_thrust = 0
            const triangle_thruster = get_triangle_body_from_tier(thruster.tier)
            const triangle_nozzle = get_triangle_nozzle_from_tier(thruster.nozzle)
            elec_converter = get_electricity_converter_from_tier(thruster.electricity_converter)
            prop_converter = get_propellant_converter_from_tier(thruster.propellant_converter)
            buff_mass += stardard_hardpoint.weight
            while (ret.length < thruster.quantity) {
                buff_mass += triangle_thruster.weight
                    + triangle_nozzle.weight
                    + elec_converter.weight
                    + prop_converter.weight
                    + box_thruster_combustion_chamber.weight
                buff_thrust += triangle_thruster.thrust + triangle_nozzle.thrust
                ret.push([buff_mass, buff_thrust])
            }
            return ret
        default:
            throw new Error("Unknown thruster type");
    }
}

function get_thruster_values_elec_usage(thruster: Thruster) : [number, number][] {
    let ret: [number, number][] = []
    let buff_elec: number = 0
    let buff_thrust: number = 0
    let elec_converter = null
    switch (thruster.type) {
        case 'plasma':
            buff_elec = plasma_thruster_body.electricity_consumption + plasma_thruster_nozzle.electricity_consumption
            buff_thrust = plasma_thruster_body.thrust + plasma_thruster_nozzle.thrust
            while (ret.length < thruster.quantity) {
                buff_elec += plasma_thruster_ring.electricity_consumption
                buff_thrust += plasma_thruster_ring.thrust
                ret.push([buff_elec, buff_thrust])
            }
            return ret
        case 'maneuver':
            buff_elec = 0
            buff_thrust = 0
            const maneuver_thruster = get_maneuver_thruster_from_tier(thruster.tier)
            while (ret.length < thruster.quantity) {
                buff_elec += maneuver_thruster.electricity_consumption
                buff_thrust += maneuver_thruster.thrust
                ret.push([buff_elec, buff_thrust])
            }
            return ret;
        case 'box':
            buff_elec = 0
            buff_thrust = 0
            const box_thruster = get_box_body_from_tier(thruster.tier)
            const box_nozzle = get_box_nozzle_from_tier(thruster.nozzle)
            elec_converter = get_electricity_converter_from_tier(thruster.electricity_converter)
            while (ret.length < thruster.quantity) {
                buff_elec += remove_percentage(box_thruster.electricity_consumption, elec_converter.converter)
                buff_thrust += box_thruster.thrust + box_nozzle.thrust
                ret.push([buff_elec, buff_thrust])
            }
            return ret
        case 'triangle':
            buff_elec = 0
            buff_thrust = 0
            const triangle_thruster = get_triangle_body_from_tier(thruster.tier)
            const triangle_nozzle = get_triangle_nozzle_from_tier(thruster.nozzle)
            elec_converter = get_propellant_converter_from_tier(thruster.electricity_converter)
            while (ret.length < thruster.quantity) {
                buff_elec += remove_percentage(triangle_thruster.electricity_consumption, elec_converter.converter)
                buff_thrust += triangle_thruster.thrust + triangle_nozzle.thrust
                ret.push([buff_elec, buff_thrust])
            }
            return ret
        default:
            throw new Error("Unknown thruster type");
    }
}

function get_thruster_values_prop_usage(thruster: Thruster) : [number, number][] {
    let ret: [number, number][] = []
    let buff_prop: number = 0
    let buff_thrust: number = 0
    let prop_converter = null
    switch (thruster.type) {
        case 'plasma':
            buff_prop = plasma_thruster_body.propellant_consumption + plasma_thruster_nozzle.propellant_consumption
            buff_thrust = plasma_thruster_body.thrust + plasma_thruster_nozzle.thrust
            while (ret.length < thruster.quantity) {
                buff_prop += plasma_thruster_ring.propellant_consumption
                buff_thrust += plasma_thruster_ring.thrust
                ret.push([buff_prop, buff_thrust])
            }
            return ret
        case 'maneuver':
            buff_prop = 0
            buff_thrust = 0
            const maneuver_thruster = get_maneuver_thruster_from_tier(thruster.tier)
            while (ret.length < thruster.quantity) {
                buff_prop += maneuver_thruster.propellant_consumption
                buff_thrust += maneuver_thruster.thrust
                ret.push([buff_prop, buff_thrust])
            }
            return ret;
        case 'box':
            buff_prop = 0
            buff_thrust = 0
            const box_thruster = get_box_body_from_tier(thruster.tier)
            const box_nozzle = get_box_nozzle_from_tier(thruster.nozzle)
            prop_converter = get_propellant_converter_from_tier(thruster.propellant_converter)
            while (ret.length < thruster.quantity) {
                buff_prop += remove_percentage(box_thruster.propellant_consumption, prop_converter.converter)
                buff_thrust += box_thruster.thrust + box_nozzle.thrust
                ret.push([buff_prop, buff_thrust])
            }
            return ret
        case 'triangle':
            buff_prop = 0
            buff_thrust = 0
            const triangle_thruster = get_triangle_body_from_tier(thruster.tier)
            const triangle_nozzle = get_triangle_nozzle_from_tier(thruster.nozzle)
            prop_converter = get_propellant_converter_from_tier(thruster.propellant_converter)
            while (ret.length < thruster.quantity) {
                buff_prop += remove_percentage(triangle_thruster.propellant_consumption, prop_converter.converter)
                buff_thrust += triangle_thruster.thrust + triangle_nozzle.thrust
                ret.push([buff_prop, buff_thrust])
            }
            return ret
        default:
            throw new Error("Unknown thruster type");
    }
}

function chart_calculator(thrusters: Thruster[], mode: chart_mode) : Chart_data_interface[] {
    let ret: Chart_data_interface[] = []
    thrusters.forEach((thruster) => {
        let arr: [number, number][] = []
        switch (mode) {
            case 'voxel volume':
                arr = get_thruster_values_voxel_volume(thruster)
                break;
            case 'mass':
                arr = get_thruster_values_mass(thruster)
                break;
            case 'elec_usage':
                arr = get_thruster_values_elec_usage(thruster)
                break;
            case 'prop_usage':
                arr = get_thruster_values_prop_usage(thruster)
                break;
        }
        let data: Chart_data_interface = {
            name: thruster.type,
            data: arr
        }
        ret.push(data)
    })
    return ret
}

export default chart_calculator;
