export interface SubscribeForm {
  isFormValid: boolean;
  isEmailValid: boolean;
  isPostalCodeValid: boolean;
  isPostalCodeDeliverable: boolean;
  email: string;
  postalCode: string;
  hasApiError: boolean;
  apiErrorMessage: string;
}
