import { Component, inject, Input, } from "@angular/core";
import { AbstractControl, ControlContainer, FormGroup } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "validator",
    imports: [MatIconModule],
    templateUrl: "./validator.component.html",
    styleUrls: ["./validator.component.scss"]
})
export class ValidatorComponent {
    @Input() controlName: string;
    @Input() minLength: number | string
    @Input() maxLength: number | string;
    @Input() public patternMessage: number;
    controlContainer = inject(ControlContainer);

    get form(): FormGroup {
        return this.controlContainer.control as FormGroup;
    }

    get control(): AbstractControl {
        return this.form.get(this.controlName) as AbstractControl;
    }
}