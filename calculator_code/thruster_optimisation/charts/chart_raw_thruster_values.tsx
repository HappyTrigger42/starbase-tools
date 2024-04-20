import {Chart_data_interface} from "./line_charts/chart_data_interface";
import {round} from "../../../../utilities/round";
import {chart_radio_rounding_factor} from "../const_values";
import {chart_raw_thruster_values} from "./chart_raw_thruster_values_interface";


export function get_chart_raw_thruster_values(chart_voxel_volume: Chart_data_interface[],
                                              chart_mass: Chart_data_interface[],
                                              chart_elec_usage: Chart_data_interface[],
                                              chart_prop_usage: Chart_data_interface[]): chart_raw_thruster_values[] {
    let ret: chart_raw_thruster_values[] = []
    if (chart_voxel_volume.length !== chart_mass.length ||
        chart_voxel_volume.length !== chart_elec_usage.length ||
        chart_voxel_volume.length !== chart_prop_usage.length) {
        throw new Error("All charts must have the same length")
    }
    for (let i = 0; i < chart_voxel_volume.length; i++) {
        const total_thrust = round(chart_voxel_volume[i].data[chart_voxel_volume[i].data.length - 1][1], chart_radio_rounding_factor)
        const total_mass_tons = round(chart_mass[i].data[chart_voxel_volume[i].data.length - 1][0], chart_radio_rounding_factor)
        const total_elec = round(chart_elec_usage[i].data[chart_voxel_volume[i].data.length - 1][0], chart_radio_rounding_factor)
        const total_prop = round(chart_prop_usage[i].data[chart_voxel_volume[i].data.length - 1][0], chart_radio_rounding_factor)
        const total_kilo_voxel_volume = round(chart_voxel_volume[i].data[chart_voxel_volume[i].data.length - 1][0], chart_radio_rounding_factor)
        const buffer: chart_raw_thruster_values = {
            name: chart_voxel_volume[i].name,
            total_thrust: total_thrust,
            total_mass_tons: total_mass_tons / 1000,
            total_elec: total_elec,
            total_prop: total_prop,
            total_kilo_voxel_volume: total_kilo_voxel_volume / 1000,
        }
        ret.push(buffer)
    }
    return ret
}