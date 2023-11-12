export interface Business {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  rating: number;
  display_address: Array<string>;
  phone: string;
  display_phone: string;
  transaction: string;
  review_count: number;
}

export type Business_list = Array<Business>;
