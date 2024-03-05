import { PlantImage } from "./PlantImage";

export class PlantCreation {
    id: number | undefined
    userId: string | undefined; 
    name: string | undefined;
    genusId: number | undefined;
    dateAdded: Date | undefined;
    dateWatered: Date | undefined;
    dateFertilized: Date | undefined;
    waterInterval: number | undefined;
    fertilizeInterval: number | undefined;
    image: any; 
}