import { useMemo } from "react";

type PaginationPropType<T> = {
  count: number;
  data: Array<T>;
};

const usePagination = <T>({ count, data }: PaginationPropType<T>) => {
  const splitReducerFn = (
    prev: { pos: number; res: Array<Array<T>> },
    curr: T 
  ) => {
    const noItemsPerPage = count;
    const { pos, res } = prev;

    const appendToLastElement =
      <T>(res: Array<Array<T>>) =>
      (curr: T) =>
        [...res.slice(-1)[0], curr];

    const appenedToLastElementOfRes = appendToLastElement(res);
    const getArrayWithOutLastElement = <T>(arr: Array<T>) => arr.slice(0, -1);

    return {
      pos: pos + 1,
      res:
        pos % noItemsPerPage == 1
          ? [...res, [curr]]
          : [
              ...getArrayWithOutLastElement(res),
              appenedToLastElementOfRes(curr),
            ],
    };
  };
  const { res } = useMemo(
    () => data.reduce(splitReducerFn, { pos: 1, res: [] }),
    [count]
  );
  return res;
};

export default usePagination;
