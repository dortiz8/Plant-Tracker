import { Plant } from "./Plant";
import { PlantImage } from "./PlantImage";

export class PlantInfo extends Plant{
    genusName: string | undefined; 
    image: PlantImage | undefined; 
}