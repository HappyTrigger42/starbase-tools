

export interface resourcesProps {
    Aegissium: number,
    Ajatite: number,
    Alium: number,
    Arkanium: number,
    Baltium: number,
    Bastium: number,
    Bastonium: number,
    Charodium: number,
    Corazium: number,
    Corium: number,
    Daltium: number,
    Exorium: number,
    Exutium: number,
    Glass: number,
    Haderite: number,
    Ice: number,
    Ilmatrium: number,
    Karnite: number,
    Kutonium: number,
    Lukium: number,
    Merkerium: number,
    Naflite: number,
    Nhurgite: number,
    Oninum: number,
    Surtrite: number,
    Valkite: number,
    Talkite: number,
    Tallium: number,
    Targium: number,
    Tengium: number,
    Ukonium: number,
    Vokarium: number,
    Xhalium: number,
    Ymrium: number,
}

export default function getNewResourceProp() {
    const ret: resourcesProps = {
        Aegissium: 0,
        Ajatite: 0,
        Alium: 0,
        Arkanium: 0,
        Baltium: 0,
        Bastium: 0,
        Bastonium: 0,
        Charodium: 0,
        Corazium: 0,
        Corium: 0,
        Daltium: 0,
        Exorium: 0,
        Exutium: 0,
        Glass: 0,
        Haderite: 0,
        Ice: 0,
        Ilmatrium: 0,
        Karnite: 0,
        Kutonium: 0,
        Lukium: 0,
        Merkerium: 0,
        Naflite: 0,
        Nhurgite: 0,
        Oninum: 0,
        Surtrite: 0,
        Valkite: 0,
        Talkite: 0,
        Tallium: 0,
        Targium: 0,
        Tengium: 0,
        Ukonium: 0,
        Vokarium: 0,
        Xhalium: 0,
        Ymrium: 0
    }
    return ret;
}

export function add_props(a: resourcesProps, b: resourcesProps, multiplier: number = 1) {
    let prop = getNewResourceProp()
    prop.Aegissium = a.Aegissium + b.Aegissium * multiplier
    prop.Ajatite = a.Ajatite + b.Ajatite * multiplier
    prop.Alium = a.Alium + b.Alium * multiplier
    prop.Arkanium = a.Arkanium + b.Arkanium * multiplier
    prop.Baltium = a.Baltium + b.Baltium * multiplier
    prop.Bastium = a.Bastium + b.Bastium * multiplier
    prop.Bastonium = a.Bastonium + b.Bastonium * multiplier
    prop.Charodium = a.Charodium + b.Charodium * multiplier
    prop.Corazium = a.Corazium + b.Corazium * multiplier
    prop.Corium = a.Corium + b.Corium * multiplier
    prop.Daltium = a.Daltium + b.Daltium * multiplier
    prop.Exorium = a.Exorium + b.Exorium * multiplier
    prop.Exutium = a.Exutium + b.Exutium * multiplier
    prop.Glass = a.Glass + b.Glass * multiplier
    prop.Haderite = a.Haderite + b.Haderite * multiplier
    prop.Ice = a.Ice + b.Ice * multiplier
    prop.Ilmatrium = a.Ilmatrium + b.Ilmatrium * multiplier
    prop.Karnite = a.Karnite + b.Karnite * multiplier
    prop.Kutonium = a.Kutonium + b.Kutonium * multiplier
    prop.Lukium = a.Lukium + b.Lukium * multiplier
    prop.Merkerium = a.Merkerium + b.Merkerium * multiplier
    prop.Naflite = a.Naflite + b.Naflite * multiplier
    prop.Nhurgite = a.Nhurgite + b.Nhurgite * multiplier
    prop.Oninum = a.Oninum + b.Oninum * multiplier
    prop.Surtrite = a.Surtrite + b.Surtrite * multiplier
    prop.Valkite = a.Valkite + b.Valkite * multiplier
    prop.Talkite = a.Talkite + b.Talkite * multiplier
    prop.Tallium = a.Tallium + b.Tallium * multiplier
    prop.Targium = a.Targium + b.Targium * multiplier
    prop.Tengium = a.Tengium + b.Tengium * multiplier
    prop.Ukonium = a.Ukonium + b.Ukonium * multiplier
    prop.Vokarium = a.Vokarium + b.Vokarium * multiplier
    prop.Xhalium = a.Xhalium + b.Xhalium * multiplier
    prop.Ymrium = a.Ymrium + b.Ymrium * multiplier
    return prop
}
