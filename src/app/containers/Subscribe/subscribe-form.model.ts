export interface SubscribeForm {
  isFormValid: boolean;
  isEmailValid: boolean;
  isPostalCodeValid: boolean;
  isPostalCodeDeliverable: boolean;
  invalidEmailMessage: string;
  invalidPostalCodeMessage: string;
  undeliverablePostalCodeMessage: string;
  email: string;
  postalCode: string;
  isLoading: boolean;
  hasApiError: boolean;
  apiErrorMessage: string;
}
