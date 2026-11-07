import { baseApi } from "../../../shared/api";
import { mockCatalog } from "../model/mock-catalog";
import type { CatalogGrade } from "../model/types";

const catalogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCatalog: builder.query<CatalogGrade[], void>({
            queryFn: () => {return { data: mockCatalog }},
        }),
    }),
});

export const { useGetCatalogQuery } = catalogApi