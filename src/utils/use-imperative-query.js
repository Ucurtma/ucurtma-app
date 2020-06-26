import { useQuery } from '@apollo/react-hooks';

const useImperativeQuery = (query, options = {}) => {
  const { refetch } = useQuery(query, { skip: true, ...options }); // <- will these options persist

  const imperativelyCallQuery = variables => {
    return refetch(variables); // <- when this call happens?
  };

  return imperativelyCallQuery;
};

export default useImperativeQuery;
