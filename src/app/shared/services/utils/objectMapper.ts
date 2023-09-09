import { UserForAuthentication } from "../../models/UserForAuthentication";
import { PatchListObject, PatchObject } from "../../models/PatchObject";
import { PlantNoteCreation } from "../../models/PlantNoteCreation";
import { PlantNoteDelete } from "../../models/PlantNoteDelete";
import { PlantNoteLoad } from "../../models/PlantNoteLoad";
import { UserLoad } from "../../models/UserLoad";
import { AuthResponseBody } from "../../models/IAuthResponse";
import { UserCreate, UserCreateLoad } from "../../models/UserCreate";


export class ObjectMapper{

    static mapUserForAuthentication(login: any){
        var user: UserForAuthentication = {
            username: login.username,
            password: login.password
        }
        return user;
    }
    static mapUserLoad(login: any, route: string): UserLoad {
        var user = this.mapUserForAuthentication(login); 

        var userLoad: UserLoad = {
            user: user, 
            route: route
        }
        return userLoad;
    }

    static mapPlantNoteToDelete(Id: string | null | undefined, plantId: string | null | undefined, userId: string | null | undefined): PlantNoteDelete{
        var plantToDelete: PlantNoteDelete = {
            Id: Id,
            plantId: plantId,
            userId: userId
        }
        return plantToDelete; 
    }
    static mapPlantNoteCreation(description: string | null | undefined, plantId: string | null | undefined, userId: string | null | undefined): PlantNoteCreation{
        var plantToSave: PlantNoteCreation = {
            description: description,
            plantId: plantId,
            userId: userId
        }
        return plantToSave; 
    }
    static mapPatchObject(operation: string | null | undefined, path: string | null | undefined, value: any): PatchObject{
        var plantToEdit: PatchObject = {
            op: operation,
            path: path,
            value: value
        }
        return plantToEdit; 
    }

    static mapPatchListObject(patchArray: PatchObject[], noteId: string | null | undefined, plantId: string | null | undefined, userId: string | null | undefined): PatchListObject{
        var patchListObject: PatchListObject = {
            patchArray: patchArray,
            userId: userId,
            plantId: plantId,
            noteId: noteId
        }
        return patchListObject; 
    }
    static mapPlantNoteLoad(plantId: string | null | undefined, userId: string | null | undefined): PlantNoteLoad {
        var noteToLoad: PlantNoteLoad = {
            plantId: plantId,
            userId: userId
        }
        return noteToLoad;
    }
    static mapUserToLocalStorageObject(authResponse: AuthResponseBody){
        return Object.entries(authResponse); 
    }

    static mapUserCreateToUserCreateLoad(login: any){
        var userCreate: UserCreate ={
            name: login.name, 
            lname: login.lname, 
            userName: login.userName,
            email: login.email,
            password: login.password,
            repeatPassword: login.repeatPassword
        }
        var userCreateLoad: UserCreateLoad = {
            user: userCreate, 
        }
        return userCreateLoad; 
    }
}