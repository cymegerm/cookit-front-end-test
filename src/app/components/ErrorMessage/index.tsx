import React from 'react';
import styled from 'styled-components/macro';

export const ErrorMessage = (message: string) => {
  return (
    <Wrapper>
      <Message>{message}</Message>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Message = styled.p``;
