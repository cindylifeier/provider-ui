import {RegistrationConfig} from "./registration-config.model";
export class ProviderPermissions {
  consentSignEnabled: boolean;
  consentRevokeEnabled: boolean;
  userActivationEnabled: boolean;
  segmentationEnabled: boolean;
  registration: RegistrationConfig;
}