import getNewResourceProp from "../../values/ressources";

export function get_thruster_module_frame() {
    let prop = getNewResourceProp()
    prop.Alium = 31182.01
    prop.Aegissium = 25114.56
    prop.Charodium = 23987.44
    prop.Arkanium = 23934.41
    prop.Vokarium = 18612.30
    prop.Ymrium = 17105.38
    prop.Corazium = 2064.80
    prop.Ajatite = 1662.53
    prop.Baltium = 1330.02
    return prop
}

export function get_thruster_module_nozzle() {
    let prop = getNewResourceProp()
    prop.Ymrium = 5261.79
    prop.Alium =  5261.79
    prop.Aegissium = 4510.11
    return prop
}

export function get_thruster_module_nozzle_ring() {
    let prop = getNewResourceProp()
    prop.Arkanium = 9661.83
    prop.Lukium = 7729.46
    prop.Ymrium = 6956.52
    prop.Charodium = 4637.68
    prop.Alium = 3864.76
    prop.Vokarium = 3864.73
    prop.Corazium = 1932.36
    return prop
}

export function get_thruster_module_nozzle_support() {
    let prop = getNewResourceProp()
    prop.Alium = 9813.77
    prop.Ajatite = 1662.53
    prop.Baltium = 1330.02
    return prop
}
