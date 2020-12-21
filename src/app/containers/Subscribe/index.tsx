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
import { isValidEmail, isValidPostalCode } from 'utils/validation';
import { isDeliverable } from './isDeliverable';

export function Subscribe() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    isFormValid: false,
    isEmailValid: false,
    isPostalCodeValid: false,
    isPostalCodeDeliverable: false,
    email: '',
    postalCode: '',
  });

  const handleEmailChange = event => {
    const { value } = event.target;

    formData.isEmailValid = isValidEmail(value);

    setFormData({ ...formData, email: value });
  };

  const handlePostalCodeChange = event => {
    const value = event.target.value.toUpperCase();

    formData.isPostalCodeValid = false;

    if (value.length === 6) {
      formData.isPostalCodeValid = isValidPostalCode(value);
    }

    setFormData({ ...formData, postalCode: value });

    if (event.type === 'blur' && formData.isPostalCodeValid) {
      isDeliverable(formData.postalCode).then(response => {
        console.log(response);
        /*return response.is_deliverable ? formData.isPostalCodeDeliverable = true : null;*/
        formData.isPostalCodeDeliverable = true;
        formData.isFormValid = true;

        /*formData.isEmailValid && formData.isPostalCodeValid ? formData.isFormValid = true : null;*/

        return console.log(formData);
      });
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
          </FormLabel>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
          />
          <FormLabel htmlFor="postalCode">
            {t(translations.subscribe.form.postalCode)}
          </FormLabel>
          <Input
            type="text"
            name="postalCode"
            maxLength={6}
            value={formData.postalCode}
            onChange={handlePostalCodeChange}
            onBlur={handlePostalCodeChange}
          />
          <Button /*disabled={true}*/>
            {t(translations.subscribe.form.submit)}
          </Button>
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
