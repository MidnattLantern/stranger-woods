export type IButtonEvent = {
    label?: string;
    buttonMarker?: string;
    conditionalMarker?: string;
};

export type IScriptEvent = {
    textEvent?: string;
    eventMarker?: string;
    buttonEvents?: IButtonEvent[];
};