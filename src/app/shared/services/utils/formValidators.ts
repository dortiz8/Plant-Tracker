import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class FormValidators{
    createDateValidator(): ValidatorFn{
        return (control:AbstractControl) : ValidationErrors | null =>{
            const value = control.value; 

            if(!value) return null; 
            if(Number.isNaN(value)) return null; 
            return value > 0 ? {numberOverZero:true} : null; 
        }
    }
}