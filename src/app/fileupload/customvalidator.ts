import { FormControl } from '@angular/forms';

export function requiredFileType(type: string) {
    return function (control: FormControl) {        
        let types: string[];
        if (type) {
            types = type.split('|').map(v => v.toLowerCase());
        }
        const file = control.value;
        if (file) {
            const extension = file.name.split('.')[1].toLowerCase();
            if (types.indexOf(extension.toLowerCase()) == -1) {
                return {
                    requiredFileType: true
                };
            }

            return null;
        }

        return null;
    };
}

export function toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
        const value = formValue[key];
        formData.append(key, value);
    }

    return formData;
}
