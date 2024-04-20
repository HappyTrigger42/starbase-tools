
export interface SmallGenerator {
    type: 'generator';
    quantity: number;
    tier: 1 | 2 | 3;
    enhancer: 0 | 1 | 2 | 3;
}

export interface BigGenerator {
    type: 'big_generator';
    quantity: number;
}

export type GeneratorChangeableFields = 'type' | 'quantity' | 'tier' | 'enhancer';
export type GeneratorTypes = 'generator' | 'big_generator';
export type Generator = SmallGenerator | BigGenerator;
