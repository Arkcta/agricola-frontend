import { AbstractControl } from '@angular/forms';

export function serieValidator(control: AbstractControl) {

    const serie: string = control && control.value || '';
    const serieFormat: string = serie.replace(/\./g, '');

    if (serie === null || serie.trim() === '') { return null; }

    if (serie.match(/^[aA]+[0-9]{3,12}$/)) {
        if (serie.length !== 10) { return { serieLength: true }; }
     }

    if (serie.match(/^[0-9]{6,11}$/)) {
        if (serie.length < 9 ) { return { serieLength: true }; }
     }
    return null;
}
