import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root',
})

export class LocalStorageService {
    storeKeys(keyArr: [string, any][]){
        if(keyArr.length){
            keyArr.forEach(key => {
                localStorage.setItem(key[0], key[1]); 
            })
        }
    }; 

    retrieveKey(key: string){
        return localStorage.getItem(key); 
    }; 

    deleteKeys(keyArr: string[]){
        if (keyArr.length) {
            keyArr.forEach(key => {
                localStorage.removeItem(key);
            })
        }
    }

}