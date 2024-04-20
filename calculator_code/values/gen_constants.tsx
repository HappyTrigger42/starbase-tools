interface generatorInterface {
    power: number,
    heat: number,
}

interface fuelChamberInterface {
    fuel: number,
    heat: number,
}

interface enhancerInterface {
    electricity_tokens: number,
    heat_tokens: number,
}

export const tier1_generator: generatorInterface = {
    power: 1000,
    heat: 100,
}

export const tier2_generator: generatorInterface = {
    power: 1000,
    heat: 90,
}

export const tier3_generator: generatorInterface = {
    power: 1250,
    heat: 80,
}

export const big_generator: generatorInterface = {
    power: 70000,
    heat: 2560,
}

export const no_enhancer: enhancerInterface = {
    electricity_tokens: 0,
    heat_tokens: 0,
}

export const tier1_enhancer: enhancerInterface = {
    electricity_tokens: 1,
    heat_tokens: 3,
}

export const tier2_enhancer: enhancerInterface = {
    electricity_tokens: 2,
    heat_tokens: 4,
}

export const tier3_enhancer: enhancerInterface = {
    electricity_tokens: 3,
    heat_tokens: 5,
}

export const fuel_chamber_tier_1: fuelChamberInterface = {
    fuel: 300000,
    heat: 95,
}

export const fuel_chamber_tier_2: fuelChamberInterface = {
    fuel: 300000,
    heat: 95,
}

export const fuel_chamber_tier_3: fuelChamberInterface = {
    fuel: 300000,
    heat: 80,
}

export const heat_tokens = {
    0: 0,
    1: 25,
    2: 55,
    3: 95,
    4: 145,
    5: 205,
    6: 275,
    7: 355,
    8: 445,
    9: 545,
    10: 655,
    11: 775,
    12: 905,
    13: 1045,
    14: 1195,
    15: 1355,
    16: 1525,
    17: 1705,
    18: 1895,
    19: 2095,
    20: 2305,
    21: 2525,
    22: 2755,
    23: 2995,
    24: 3245,
    25: 3505,
}

export const electricity_tokens = {
    0: 0,
    1: 500,
    2: 750,
    3: 1000,
}

export function get_electricity_from_tokens(tokens: number): number {
    if (tokens > 3) {
        return electricity_tokens[3];
    }
    // @ts-ignore
    return electricity_tokens[tokens];
}

export function get_heat_from_tokens(tokens: number): number {
    if (tokens > 25) {
        return heat_tokens[25];
    }
    // @ts-ignore
    return heat_tokens[tokens];
}

export function get_enhancer_from_tier(tier: number): enhancerInterface {
    if (tier === 1) {
        return tier1_enhancer;
    } else if (tier === 2) {
        return tier2_enhancer;
    } else if (tier === 3) {
        return tier3_enhancer;
    }
    return no_enhancer;
}

export function get_generator_from_tier(tier: number): generatorInterface {
    if (tier === 1) {
        return tier1_generator;
    } else if (tier === 2) {
        return tier2_generator;
    } else if (tier === 3) {
        return tier3_generator;
    }
    return tier1_generator;
}

export function get_fuel_chamber_from_tier(tier: number): fuelChamberInterface {
    if (tier === 1) {
        return fuel_chamber_tier_1;
    } else if (tier === 2) {
        return fuel_chamber_tier_2;
    } else if (tier === 3) {
        return fuel_chamber_tier_3;
    }
    return fuel_chamber_tier_1;
}

export function get_estimated_fuel_chamber_count(generator_count: number): number {
    let ret = Math.floor(generator_count / 3);
    const rest = generator_count % 3;
    if (rest !== 0) {
        ret += 1;
    }
    return ret
}
