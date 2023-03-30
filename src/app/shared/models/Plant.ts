import { Genus } from "./Genus";

export class Plant {
  id: number | undefined; 
  userId: string | undefined; 
  name: string | undefined;
  genusId: number | undefined;
  dateAdded: Date | undefined;
  dateWatered: Date | undefined;
  dateFertilized: Date | undefined;
  waterInterval: number | undefined;
  fertilizeInterval: number | undefined;
  waterState = 0;
  fertilizeState = 0;  
}
