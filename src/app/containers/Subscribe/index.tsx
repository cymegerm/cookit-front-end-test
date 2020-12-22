import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components/macro';
import { NavBar } from 'app/containers/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { FormLabel } from 'app/components/FormLabel';
import { Input } from 'app/components/Input';
import { Button } from 'app/components/Button';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { SubscribeForm } from './subscribe-form.model';
import { isValidEmail, isValidPostalCode } from 'utils/validation';
import { isDeliverable } from './deliverability-validation';
import { PostalCodeValidation } from './postal-code-validation.model';

export function Subscribe() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<SubscribeForm>({
    isFormValid: false,
    isEmailValid: false,
    isPostalCodeValid: false,
    isPostalCodeDeliverable: false,
    invalidEmailMessage: '',
    invalidPostalCodeMessage: '',
    undeliverablePostalCodeMessage: '',
    email: '',
    postalCode: '',
    isLoading: false,
    hasApiError: false,
    apiErrorMessage: '',
  });

  const handleEmailChange = event => {
    const email = event.target.value;

    formData.isFormValid = false;
    formData.invalidEmailMessage = '';
    formData.isEmailValid = isValidEmail(email);

    if (!formData.isEmailValid) {
      formData.invalidEmailMessage =
        'Please provide a correctly formatted email address.';
    }

    if (formData.isEmailValid && formData.isPostalCodeValid) {
      formData.isFormValid = true;
    }

    setFormData({ ...formData, email: email.toLowerCase() });
  };

  const handlePostalCodeChange = event => {
    const postalCode = event.target.value.toUpperCase();

    formData.isFormValid = false;
    formData.isPostalCodeValid = false;
    formData.isPostalCodeDeliverable = false;
    formData.invalidPostalCodeMessage = '';
    formData.undeliverablePostalCodeMessage = '';
    setFormData({ ...formData });

    if (postalCode.length === 6) {
      formData.isPostalCodeValid = isValidPostalCode(postalCode);
      setFormData({ ...formData });
    }

    if (!formData.isPostalCodeValid) {
      formData.invalidPostalCodeMessage =
        'Please provide a correctly formatted postal code.';
    }

    setFormData({ ...formData, postalCode });

    if (event.type === 'blur' && formData.isPostalCodeValid) {
      setFormData({ ...formData, isLoading: true });

      isDeliverable(formData.postalCode).then(
        (response: PostalCodeValidation) => {
          if (response.is_deliverable) {
            formData.isPostalCodeDeliverable = true;
            setFormData({ ...formData, isLoading: false });
          } else {
            formData.undeliverablePostalCodeMessage =
              "Oops. We don't currently deliver to this area.";
            return setFormData({ ...formData });
          }

          if (formData.isEmailValid && formData.isPostalCodeValid) {
            formData.isFormValid = true;
          }

          return setFormData({ ...formData });
          /*console.log('formData: ' + JSON.stringify(formData));*/
        },
      );
    }
  };

  return (
    <>
      <Helmet>
        <title></title>
        <meta name="description" content="" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <h1>{t(translations.subscribe.title)}</h1>
        <Form>
          <FormLabel htmlFor="email">
            {t(translations.subscribe.form.email)}
            {formData.isEmailValid ? <Check>&#10003;</Check> : null}
          </FormLabel>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
          />
          {formData.invalidEmailMessage ? (
            <Message>{formData.invalidEmailMessage}</Message>
          ) : null}
          <FormLabel htmlFor="postalCode">
            {t(translations.subscribe.form.postalCode)}
            {formData.isPostalCodeDeliverable ? <Check>&#10003;</Check> : null}
          </FormLabel>
          <Input
            type="text"
            name="postalCode"
            maxLength={6}
            value={formData.postalCode}
            onChange={handlePostalCodeChange}
            onBlur={handlePostalCodeChange}
          />
          {formData.invalidPostalCodeMessage ? (
            <Message>{formData.invalidPostalCodeMessage}</Message>
          ) : null}
          {formData.undeliverablePostalCodeMessage ? (
            <Message className="undeliverable">
              {formData.undeliverablePostalCodeMessage}
            </Message>
          ) : null}
          <SubmitButton disabled={!formData.isFormValid}>
            {!formData.isLoading ? t(translations.subscribe.form.submit) : null}
            {formData.isLoading ? <LoadingIndicator /> : null}
          </SubmitButton>
        </Form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Form = styled.div`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Check = styled.div`
  display: inline-block;
  margin-left: 0.5rem;
  color: green;
`;

const Message = styled.p`
  margin-top: -1rem;
  font-size: 0.8rem;
  color: red;

  &.undeliverable {
    color: #d48806;
  }
`;

const SubmitButton = styled(Button)`
  width: 4.2rem;
`;
