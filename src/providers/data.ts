import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
import { mockSubjects } from "@/constants/mock-data.ts";

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>( {resource}:
    GetListParams): Promise<GetListResponse<TData>> => {       //It returns a list of records for a specific(the one we choose) resource.
      if (resource !== 'subjects') return {          //If Refine asks for anything other than "subjects
         // Return empty data
        data: [] as TData[],
        total: 0
      };

      return {
        data: mockSubjects as unknown as TData[],
        total: mockSubjects.length
      }
    },

    getOne: async () => {throw new Error("Method not implemented.")},
    create: async () => {throw new Error("Method not implemented.")},
    update: async () => {throw new Error("Method not implemented.")},
    deleteOne: async () => {throw new Error("Method not implemented.")},

    getApiUrl: () => '',
}
