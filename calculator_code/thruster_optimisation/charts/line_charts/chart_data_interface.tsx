

export interface Chart_data_interface {
    name: string;
    data: [number, number][];
}

export type chart_mode = 'voxel volume' | 'mass' | 'elec_usage' | 'prop_usage';
