export interface UserBusiness {
  id: string;
  image_url: string;
  name: string;
  profile_url: string;
}

export interface CoordinateBusiness {
  latitude: number;
  longitude: number;
}

export interface Review {
  id: string;
  rating: number;
  text: string;
  user: UserBusiness;
}

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

export type View_Business_Search_Request = Omit<
  Business_Search_Request,
  "limit"
>;

export type Business_Detail = Business & {
  alias: string;
  photos: Array<string>;
  reviews: Array<Review>;
  coordinates: CoordinateBusiness;
};
