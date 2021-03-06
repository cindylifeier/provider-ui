import {Injectable} from "@angular/core";
import {ValidationRules} from "app/shared/validation-rules.model";
import {TranslateService} from "@ngx-translate/core";
import {FormGroup} from "@angular/forms";

@Injectable()
export class ValidationService {
  private minLengthMessage: string;
  private static XML_FILE_TYPE:string = "text/xml";

  constructor(private translateService: TranslateService) {
  }

  public getValidatorErrorMessage(validatorKey: string, validatorValue?: any, customMessage?: string): string {
    switch (validatorKey) {
      case ValidationRules.REQUIRED_KEY:
        return ValidationRules.REQUIRED_MESSAGE;
      case ValidationRules.REQUIRED_TRUE_KEY:
        return ValidationRules.REQUIRED_TRUE_MESSAGE;
      case ValidationRules.EMAIL_KEY:
        return ValidationRules.EMAIL_MESSAGE;
      case ValidationRules.MIN_LENGTH_KEY:
        this.getLimitedLengthErrorMessage("SHARED.VALIDATION_RULES.MIN_LENGTH_ERROR_MESSAGE", validatorValue.requiredLength);
        return this.minLengthMessage;
      case ValidationRules.MAX_LENGTH_KEY:
        this.getLimitedLengthErrorMessage("SHARED.VALIDATION_RULES.MAX_LENGTH_ERROR_MESSAGE", validatorValue.requiredLength);
        return this.minLengthMessage;
      case ValidationRules.PATTERN_KEY:
        return customMessage;
      case ValidationRules.INVALID_PAST_DATE_KEY:
        return ValidationRules.INVALID_PAST_DATE_MESSAGE;
      case ValidationRules.ONE_EMAIL_REQUIRED_KEY:
        return ValidationRules.ONE_EMAIL_REQUIRED_MESSAGE;
      case ValidationRules.INVALID_NUMBER_KEY:
        return ValidationRules.NUMBER_MESSAGE;
      case ValidationRules.INVALID_NUMBER_KEY:
        return ValidationRules.NUMBER_MESSAGE;
      case ValidationRules.NPIS_MATCH_KEY:
        return ValidationRules.NPIS_MATCH_MESSAGE;
    }
  }

  static pastDateValidator(control):any  {
    const today = new Date();
    if (control.value < today) {
      return null;
    } else {
      return {'invalidPastDate': true};
    }
  }

  private getLimitedLengthErrorMessage(errorMessage: string, requiredLength: any) {
    this.translateService.get(errorMessage, {length: requiredLength})
      .subscribe(
        (res: string) => {
          this.minLengthMessage = res;
        }
      );
  }

  static oneEmailRequired(homeEmailKey: string, registrationPurposeEmailKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let homeEmailControl = group.controls[homeEmailKey];
      let registrationPurposeEmailControl = group.controls[registrationPurposeEmailKey];

      if (homeEmailControl && homeEmailControl.value === '') homeEmailControl.setValue(null);
      if (registrationPurposeEmailControl.value === '') registrationPurposeEmailControl.setValue(null);

      if((homeEmailControl && homeEmailControl.value && homeEmailControl.valid)|| (registrationPurposeEmailControl && registrationPurposeEmailControl.value && registrationPurposeEmailControl.valid)){
        return null;
      } else {
        return {oneEmailRequired: true}
      }

    }
  }


  static isANumberValidator(control):any {
    if (Number(control.value)) {
      return null;
    } else {
      return {'invalidNumber': true};
    }
  }


  static isXmlFile(file:any):boolean{
    let fileName = file.name;
    let fileType = file.type;

    if(fileName && fileType && fileType === this.XML_FILE_TYPE ){
      return true;
    }
    return false;
  }

  static atLeastOneFieldValidator(group: FormGroup): {[key: string]: any} {
    let isAtLeastOne = false;
    if (group && group.controls) {
      for (const control in group.controls) {
        if (group.controls.hasOwnProperty(control) && group.controls[control].valid && group.controls[control].value) {
          isAtLeastOne = true;
          break;
        }
      }
    }
    return isAtLeastOne ? null : { 'required': true };
  }

}
