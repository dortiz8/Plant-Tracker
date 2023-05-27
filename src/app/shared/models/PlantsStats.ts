export class PlantsStats{
    totalPlants: number | undefined; 
    totalPlantsThatNeedWatering: number | undefined; 
    totalPlantsThatNeedFertilizing: number | undefined; 
    genusList: GenusList[]; 
}

export class GenusList{
    genusId: number | undefined; 
    genusName: string | undefined; 
    total: number | undefined; 
}