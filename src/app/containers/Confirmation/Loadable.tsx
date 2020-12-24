/**
 * Asynchronously loads the component for Confirmation
 */

import * as React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/LoadingIndicator';

export const Confirmation = lazyLoad(
  () => import('./index'),
  module => module.Confirmation,
  {
    fallback: <LoadingIndicator />,
  },
);
