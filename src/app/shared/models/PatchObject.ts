export class PatchObject{
    op: string | undefined;
    path: string | undefined; 
    value: any  
}

export class PatchArray{
    patchList: PatchObject[]
}