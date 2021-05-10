import { AbstractControl } from '@angular/forms';

export function rutValidator(control: AbstractControl) {

    const dni: string = control && control.value || '';
    const dniFormat: string = dni.replace(/\./g, '');
    const dniEmpresa: number = parseInt(dniFormat,10);
    if (dniEmpresa >= 50000000) { return { dniInvalid: true }; }

    if (dni === null || dni.trim() === '') { return null; }
    if (dni.length < 2) { return { dniLength: true }; }
    if (!dniFormat.match(/^[0-9]+[-|‐]{1}[0-9kK]{1}$/)) { return { dniFormat: true }; }

    const dniSplit = dniFormat.split('-');
    let dniSinDigito: number = dniSplit[0] as unknown as number;
    const dniDigito: string = dniSplit[1] && dniSplit[1].toUpperCase();

    // Se obtiene digito verificador
    let multiplo = 0;
    let digito = 1;
    for (; dniSinDigito; dniSinDigito = Math.floor(dniSinDigito / 10)) {
        digito = (digito + dniSinDigito % 10 * (9 - multiplo++ % 6)) % 11;
    }
    const dv: string = digito ? (digito - 1).toString() : 'K';

    if (dv !== dniDigito) { return { dniInvalid: true }; }

    return null;
}
