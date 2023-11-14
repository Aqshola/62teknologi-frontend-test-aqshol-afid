import {
  API_KEY,
  BASE_URL,
  QUERY_LATITUDE,
  QUERY_LIMIT,
  QUERY_LOCATION,
  QUERY_LONGITUDE,
  QUERY_OFFSET,
  QUERY_OPEN_NOW,
  QUERY_TERM,
  SEARCH_URL,
} from "@/constant";
import {
  Business_Detail,
  Business_List,
  Business_Search_Request,
  Business_Search_Response,
  Review,
} from "@/types/business";
import axios, { AxiosError } from "axios";
import { create } from "zustand";

interface BusinessStoreState {
  list: Business_List;
  detail: Business_Detail | null;
  totalPage: number;
  loading: boolean;

  searchData: (param: Business_Search_Request) => Promise<void>;
  detailData: (id: string) => Promise<void>;
  reviewsPage: (id: string, limit: number, offset: number) => Promise<void>;
}

const useBusinessStore = create<BusinessStoreState>()((set) => ({
  list: [],
  detail: null,
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
      dataUrl.searchParams.set(QUERY_TERM, param.term);
    }

    try {
      const resultData = await axios.get(dataUrl.href, {
        headers: {
          Authorization: API_KEY,
        },
      });
      const data = resultData.data as Business_Search_Response;

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

  async detailData(id: string) {
    set({ loading: true });
    try {
      const urlDetail = `${BASE_URL}/${id}`;
      const urlDetailReview = `${urlDetail}/reviews`;
      const getDetail = axios.get(urlDetail, {
        headers: {
          Authorization: API_KEY,
        },
      });
      const getReview = axios.get(urlDetailReview, {
        headers: {
          Authorization: API_KEY,
        },
      });

      const [detail, review] = await Promise.all([getDetail, getReview]);
      const parsed_detail = detail.data as Business_Detail;
      const parsed_review = review.data.reviews as Array<Review>;

      Object.assign(parsed_detail, {
        reviews: parsed_review,
      });

      set({ detail: parsed_detail });
    } catch (error) {
      console.error(error, "[ERROR GET DETAIl]");
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

  async reviewsPage(id: string, limit: number, offset: number) {
    try {
      const urlDetail = `${BASE_URL}/${id}`;
      const urlDetailReview = `${urlDetail}/reviews`;
      const dataUrl = new URL(urlDetailReview);

      if (limit) {
        dataUrl.searchParams.set(QUERY_LIMIT, limit.toString());
      }

      if (offset) {
        dataUrl.searchParams.set(QUERY_OFFSET, offset.toString());
      }
      const getReview = await axios.get(dataUrl.href, {
        headers: {
          Authorization: API_KEY,
        },
      });
      const listReview = getReview.data.reviews as Array<Review>;

      set((state) => ({
        detail: Object.assign(state.detail as Business_Detail, {
          reviews: listReview,
        }),
      }));
    } catch (error) {
      console.error(error, "[ERROR GET DETAIl]");
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
