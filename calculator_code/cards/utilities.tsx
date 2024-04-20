import {Thruster, ThrusterChangeableFields, ThrusterType} from "./thrusters_cards/thruster_types";
import {clamp} from "../../../utilities/clamp";
import React from "react";

export const getDefaultThruster = (type: ThrusterType): Thruster => {
    switch (type) {
        case 'plasma':
            return { type: 'plasma', quantity: 1, rings: 1, used_as_maneuver: false };
        case 'maneuver':
            return { type: 'maneuver', quantity: 1, tier: 1, used_as_maneuver: false };
        case 'box':
            return { type: 'box', quantity: 1, tier: 1, nozzle: 1, electricity_converter: 1, propellant_converter: 1, used_as_maneuver: false };
        case 'triangle':
            return { type: 'triangle', quantity: 1, tier: 1, nozzle: 1, electricity_converter: 1, propellant_converter: 1, used_as_maneuver: false };
        default:
            throw new Error("Unknown thruster type");
    }
}

export const addCard = (type: ThrusterType,
                        thrusterCards: Thruster[],
                        setThrusterCards: React.Dispatch<React.SetStateAction<Thruster[]>>) => {
    const newThruster = getDefaultThruster(type);
    setThrusterCards([...thrusterCards, newThruster]);
};

export const removeCard = (index: number,
                           thrusterCards: Thruster[],
                           setThrusterCards: React.Dispatch<React.SetStateAction<Thruster[]>>) => {
    const newCards = [...thrusterCards];
    newCards.splice(index, 1);
    setThrusterCards(newCards);
};

export const handleChange = (index: number,
                             field: ThrusterChangeableFields,
                             value: number,
                             thrusterCards: Thruster[],
                             setThrusterCards: React.Dispatch<React.SetStateAction<Thruster[]>>,
                             thruster_quantity: number) => {
    const updatedCards = [...thrusterCards];
    const thruster = updatedCards[index];
    if (field === 'quantity') {
        updatedCards[index][field] = clamp(value, 0, thruster_quantity);
    }
    if (thruster.type === 'plasma') {
        if (field === 'rings') {
            thruster.rings = clamp(value, 0, thruster_quantity);
        }
    } else if (thruster.type === 'maneuver') {
        if (field === 'tier') {
            thruster[field] = clamp(value, 1, 3) as 1 | 2 | 3;
        }
    } else if (thruster.type === 'box' || thruster.type === 'triangle') {
        if (field === 'tier') {
            thruster[field] = clamp(value, 1, 3) as 1 | 2 | 3;
        } else if (field === 'nozzle' || field === 'electricity_converter' || field === 'propellant_converter') {
            thruster[field] = clamp(value, 0, 3) as 0 | 1 | 2 | 3;
        }
    }
    setThrusterCards(updatedCards);
};
