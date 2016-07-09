
export enum RAIN_TYPE {
    NO_DATA,
    NO_RAIN,
    LIGHT_RAIN,
    MODERATE_RAIN,
    HEAVY_RAIN,
}

interface Res {
    raw: any;
    idLieu: string;
    lastUpdate: Date;
    validity: Date;
    raining: boolean;
    willRain: boolean;
    windows: number[];
    confidence: number;
}

export const NO_DATA: RAIN_TYPE;
export const NO_RAIN: RAIN_TYPE;
export const LIGHT_RAIN: RAIN_TYPE;
export const MODERATE_RAIN: RAIN_TYPE;
export const HEAVY_RAIN: RAIN_TYPE;

export const get: (id: string) => Promise<Res>;

