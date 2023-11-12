export interface Business {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  rating: number;
  location: {
    display_address: Array<string>;
  };
  phone: string;
  display_phone: string;
  transactions: Array<string>;
  review_count: number;
}

export type Business_List = Array<Business>;

export type Business_Search_Request = {
  location: string;
  latitude: number;
  longitude: number;
  open_now: boolean;
  limit: number;
  offset: number;
  term: string;
};

export type Business_Search_Response = {
  businesses: Business_List;
  total: number;
};
