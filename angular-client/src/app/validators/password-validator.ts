import { FormGroup } from "@angular/forms";

export class PasswordValidator {

  static passwordsMatch(formGroup: FormGroup) {
    let confirmPasswordInput = formGroup.controls['confirmPassword'];
    if (formGroup.controls['password'].value !== confirmPasswordInput.value) {
      return confirmPasswordInput.setErrors({notEquivalent: true});
    } else {
      return confirmPasswordInput.setErrors(null);
    }
  }
}