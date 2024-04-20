
export interface weapon {
    fire_rate_minute: number,
    electricity_per_shot: number,
    heat_per_shot: number,
    heat_dissipation: number,
    idle_electricity_consumption: number,
}


export const rail_cannon: weapon = {
    fire_rate_minute: 33,
    electricity_per_shot: 35000,
    heat_per_shot: 600,
    heat_dissipation: 10,
    idle_electricity_consumption: 1500,
}

export const plasma_cannon: weapon = {
    fire_rate_minute: 70,
    electricity_per_shot: 2205,
    heat_per_shot: 800,
    heat_dissipation: 10,
    idle_electricity_consumption: 250,
}

export const laser_cannon: weapon = {
    fire_rate_minute: 375,
    electricity_per_shot: 470,
    heat_per_shot: 80,
    heat_dissipation: 10,
    idle_electricity_consumption: 250,
}

export const auto_cannon: weapon = {
    fire_rate_minute: 400,
    electricity_per_shot: 130,
    heat_per_shot: 125,
    heat_dissipation: 10,
    idle_electricity_consumption: 250,
}
