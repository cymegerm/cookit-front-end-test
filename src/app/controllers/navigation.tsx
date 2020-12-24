import { useHistory } from 'react-router-dom';

export const useNavigation = (baseRoute: String = '') => {
  const history = useHistory();

  const navigateTo = (route: String) => {
    history.push(`${baseRoute}/${route}`);
  };

  return {
    navigateTo,
  };
};
