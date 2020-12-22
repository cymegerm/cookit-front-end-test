export interface SubscribeForm {
  isFormValid: boolean;
  isEmailValid: boolean;
  isPostalCodeValid: boolean;
  isPostalCodeDeliverable: boolean;
  email: string;
  postalCode: string;
  isLoading: boolean;
  hasApiError: boolean;
  apiErrorMessage: string;
}
