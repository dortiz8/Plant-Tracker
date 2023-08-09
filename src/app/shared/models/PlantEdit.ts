
import { PlantImageEdit } from "./PlantImageEdit";

export class PlantEdit {
    name: string | undefined;
    genusId: number | undefined;
    dateWatered: Date | undefined;
    dateFertilized: Date | undefined;
    fertilizeInterval: number | undefined;
    waterInterval: number | undefined;
    image: PlantImageEdit
}