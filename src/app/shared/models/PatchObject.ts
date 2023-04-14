export class PatchObject{
    op: string | null | undefined;
    path: string | null | undefined; 
    value: any  
}

export class PatchListObject{
    patchArray: PatchObject[]; 
    userId: string | null | undefined; 
    plantId: string | null | undefined;
    noteId: string | null | undefined; 
} 