import { FormControl, ValidationErrors } from "@angular/forms";

export class NewComicValidators {

    // white space validation
    static notOnlyWhitespace(control: FormControl) : ValidationErrors | null{
        
        // check if only whitespace
        if ((control.value != null) && (control.value.trim().length ===0)) {

            // invalid -- return error object

            return { 'notOnlyWhitespace': true};
        }
        else {
            return null;
        }
    }
}
