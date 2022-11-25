export class Plant {
  id: number | undefined; 
  name: string | undefined;
  genus: string | undefined;
  dateAdded: Date | undefined;
  dateWatered: Date | undefined;
  dateFertilized: Date | undefined;
  waterInterval: number | undefined;
  fertilizeInterval: number | undefined;
  waterState = 0;
  fertilizeState: number | undefined; 
}
