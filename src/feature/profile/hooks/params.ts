import { parseAsInteger, useQueryStates } from "nuqs";

export const useGetparams = () => {
  return useQueryStates({
    page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  });
};
