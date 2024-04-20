import {ratio_ratios_chart_data_interface} from "./ratio_chart_data_interface";
import {chart_raw_thruster_values} from "../chart_raw_thruster_values_interface";
import {round} from "../../../../../utilities/round";


export function get_ratio_chart_ratios(
        values: chart_raw_thruster_values[],
        displayTons: boolean,
        displayElec: boolean,
        displayProp: boolean,
        displayVoxels: boolean
    ) : ratio_ratios_chart_data_interface[] {
    let ret: ratio_ratios_chart_data_interface[] = []
    for (let i = 0; i < values.length; i++) {
        const thrust_to_mass_kilo_ton = round(values[i].total_thrust / values[i].total_mass_tons, 100)
        const thrust_to_elec_usage = round(values[i].total_thrust / values[i].total_elec, 100)
        const thrust_to_prop_usage = round(values[i].total_thrust / values[i].total_prop, 100)
        const thrust_to_kilo_voxel_volume = round(values[i].total_thrust / values[i].total_kilo_voxel_volume, 100)
        const buffer: ratio_ratios_chart_data_interface = {
            name: values[i].name,
            data: [],
            thrust_to_mass_kilo_ton: thrust_to_mass_kilo_ton,
            thrust_to_elec_usage: thrust_to_elec_usage,
            thrust_to_prop_usage: thrust_to_prop_usage,
            thrust_to_kilo_voxel_volume: thrust_to_kilo_voxel_volume
        }
        if (displayTons) {
            buffer.data.push(thrust_to_mass_kilo_ton)
        }
        if (displayElec) {
            buffer.data.push(thrust_to_elec_usage)
        }
        if (displayProp) {
            buffer.data.push(thrust_to_prop_usage)
        }
        if (displayVoxels) {
            buffer.data.push(thrust_to_kilo_voxel_volume)
        }
        ret.push(buffer)
    }
    return ret
}
