import { PlantImage } from "../../models/PlantImage";


export class FileHandler {
    private static toBase64(file: any): any{
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }; 

    public static async setFileSelection(selectedFile: any, userId: string | undefined, plantId: number | undefined): Promise<PlantImage>{
        
        var plantImageObj: PlantImage = {
            id: undefined,
            userId: userId,
            plantId: plantId,
            name: selectedFile.name,
            type: selectedFile.type,
            size: selectedFile.size,
            base64: await this.toBase64(selectedFile),
            url: undefined
        } 
    
        return plantImageObj; 
    }

    public static readFile(inputFile: any) {
       
    }
}

