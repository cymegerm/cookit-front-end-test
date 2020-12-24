import * as React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'app/components/Link';
import { NavBar } from 'app/containers/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';

export function Confirmation() {
  return (
    <>
      <Helmet>
        <title></title>
        <meta name="description" content="" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <Title>
          <span>Congratulations!</span>
        </Title>
        <p>You are now subscribed to Cook It.</p>
        <Link to={process.env.PUBLIC_URL + '/'}>Return to Home Page</Link>
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

  p {
    margin-top: 0;
    margin-bottom: 4rem;
  }
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: green;
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;
