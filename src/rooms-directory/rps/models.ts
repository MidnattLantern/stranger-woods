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

type IElement = "fire" | "water" | "earth";

export interface ISlot {
  name: string;
  element: IElement;
  assetSource: string;
}