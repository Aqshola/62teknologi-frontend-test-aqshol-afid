import {
  API_KEY,
  QUERY_LATITUDE,
  QUERY_LIMIT,
  QUERY_LOCATION,
  QUERY_LONGITUDE,
  QUERY_OFFSET,
  QUERY_OPEN_NOW,
  SEARCH_URL,
} from "@/constant";
import {
  Business_List,
  Business_Search_Request,
  Business_Search_Response,
} from "@/types/business";
import axios, { AxiosError } from "axios";
import { create } from "zustand";

interface BusinessStoreState {
  list: Business_List;
  totalPage: number;
  loading: boolean;

  searchData: (param: Business_Search_Request) => Promise<void>;
}

const useBusinessStore = create<BusinessStoreState>()((set) => ({
  list: [],
  totalPage: 0,
  loading: false,

  async searchData(param) {
    set({ loading: true, list: [] });
    const dataUrl = new URL(SEARCH_URL);

    if (param.location) {
      dataUrl.searchParams.set(QUERY_LOCATION, param.location);
    }

    if (param.latitude) {
      dataUrl.searchParams.set(QUERY_LATITUDE, param.latitude.toString());
    }

    if (param.longitude) {
      dataUrl.searchParams.set(QUERY_LONGITUDE, param.longitude.toString());
    }

    if (param.open_now) {
      dataUrl.searchParams.set(QUERY_OPEN_NOW, param.open_now.toString());
    }

    if (param.limit) {
      dataUrl.searchParams.set(QUERY_LIMIT, param.limit.toString());
    }

    if (param.offset) {
      dataUrl.searchParams.set(QUERY_OFFSET, param.offset.toString());
    }

    if (param.term) {
      dataUrl.searchParams.set(QUERY_OFFSET, param.term);
    }

    try {
      const resultData = await axios.get(dataUrl.href, {
        headers: {
          Authorization: API_KEY,
        },
      });
      const data = resultData.data as Business_Search_Response;
      console.log(resultData);

      set({
        list: data.businesses,
        totalPage: data.total,
      });
    } catch (error) {
      console.error(error, "[ERROR GET SEARCH]");
      let message = "";

      const err = error as AxiosError;

      if (err.response) {
        message = (err.response.data as any).error.description;
      } else {
        message = err.message;
      }
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useBusinessStore;
