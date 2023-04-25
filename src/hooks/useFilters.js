import { useMemo } from 'react';

export const useFilters = (array, config) => {
  const { search, sort } = config;
  const sortedArr = useMemo(() => {
    if (sort === 'nameAsc') {
      return [
        ...array
          .filter((item) => item.name)
          .sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          }),
        ...array.filter((item) => !item.name),
      ];
    } else if (sort === 'nameDesc') {
      return [
        ...array
          .filter((item) => item.name)
          .sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            } else if (a.name > b.name) {
              return -1;
            } else {
              return 0;
            }
          }),
        ...array.filter((item) => !item.name),
      ];
    } else if (sort === 'stereotype') {
      return [
        ...array
          .filter((node) => node?.fullName.includes(':'))
          .sort((a, b) => {
            if (a.fullName.split(':')[0] < b.fullName.split(':')[0]) {
              return -1;
            } else if (a.fullName.split(':')[0] > b.fullName.split(':')[0]) {
              return 1;
            } else {
              return 0;
            }
          }),
        ...array.filter((node) => !node?.fullName.includes(':')),
      ];
    } else {
      return array;
    }
  }, [array, sort]);

  return useMemo(() => {
    if (!search) {
      return sortedArr;
    }
    return sortedArr.length > 0
      ? sortedArr.filter(
          ({ name }) =>
            typeof name === 'string' &&
            typeof search === 'string' &&
            name.trim().toLowerCase().includes(search.trim().toLowerCase())
        )
      : [];
  }, [sortedArr, search]);
};
