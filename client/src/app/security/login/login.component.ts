import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "app/security/shared/authentication.service";
import {ProfileService} from "../shared/profile.service";
import {UmsProfile} from "../shared/ums-profile.model";
import {UtilityService} from "app/shared/utility.service";
import {CustomTranslateService} from "../../core/custom-translate.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'c2s-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFrom: FormGroup;
  public passwordInputType: string = "password";
  public showBadCredentialError: boolean = false;
  public showAccountLockedError: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private profileService: ProfileService,
              private utilityService: UtilityService,
              private customTranslateService: CustomTranslateService,
              private formBuilder: FormBuilder,
              private translate: TranslateService) {
    // Set default language for login page
    const DEFAULT_LANGUAGE = "en";
    translate.setDefaultLang(DEFAULT_LANGUAGE);
  }

  ngOnInit() {
    this.loginFrom = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public login(): void {
    const formModel = this.loginFrom.value;
    const username: string = formModel.username;
    const password: string = formModel.password;
    this.authenticationService.login(username, password)
      .subscribe(
        (res) => {
          this.showBadCredentialError = false;
          this.showAccountLockedError = false;
          this.authenticationService.onLoggedIn(res);
          this.getUMSProfileAndSetDefaultLanguage();
        },
        (error) => {
          let message: string = error.json()['message'];
          if (this.authenticationService.isAccountLocked(message)) {
            this.showAccountLockedError = true;
            this.showBadCredentialError = false;
            console.log(message);
          } else if (this.authenticationService.isBadCredentials(message)) {
            this.showBadCredentialError = true;
            this.showAccountLockedError = false;
            console.log(message);
          }
        }
      );
  }

  public getUMSProfileAndSetDefaultLanguage(): void {
    this.profileService.getUMSProfile().subscribe(
      (profile: UmsProfile) => {
        let localesCode: string[] = this.utilityService.getSupportedLocaleCode(profile.supportedLocales);
        this.customTranslateService.addSupportedLanguages(localesCode);
        this.customTranslateService.setDefaultLanguage(profile.userLocale);
        this.profileService.setProfileInSessionStorage(profile);
        this.authenticationService.onGetUserProfileSuccess();
      },
      () => this.authenticationService.onGetUserProfileFailure()
    )
  }

  public getInputType(inputType: string): void {
    this.passwordInputType = inputType;
  }
}
