import { Pipe, PipeTransform } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Pipe({
    name: 'aprobado',
})
export class AprobadoPipe implements PipeTransform {
transform(control: FormGroup): any {
    return (((control.get("nota_final") as FormControl).value >= 7) || ((control.get("crec") as FormControl).value >= 4));
}
}