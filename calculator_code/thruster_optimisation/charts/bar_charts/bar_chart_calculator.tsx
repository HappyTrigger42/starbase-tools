import {bar_chart_data_interface, bar_chart_mode_interface} from "./bar_chart_data_interface";
import {chart_raw_thruster_values} from "../chart_raw_thruster_values_interface";


export function get_bar_chart_values(values: chart_raw_thruster_values[], mode: bar_chart_mode_interface): bar_chart_data_interface {
    let data: number[] = []
    for (let i = 0; i < values.length; i++) {
        switch (mode) {
            case "voxel":
                data.push(values[i].total_kilo_voxel_volume)
                break
            case "mass":
                data.push(values[i].total_mass_tons)
                break
            case "elec":
                data.push(values[i].total_elec)
                break
            case "prop":
                data.push(values[i].total_prop)
                break
            case "thrust":
                data.push(values[i].total_thrust)
                break
        }
    }
    return {data: data}
}
