type Product = {
  id: string;
  object: "product";
  active: boolean;
  attributes: any[];
  created: number;
  default_price: string;
  description: string;
  features: any[];
  images: any[];
  livemode: boolean;
  metadata: Record<string, never>;
  name: string;
  package_dimensions: null;
  shippable: null;
  statement_descriptor: null;
  tax_code: null;
  type: "service";
  unit_label: null;
  updated: number;
  url: null;
};

export type Price = {
  id: string;
  object: "price";
  active: boolean;
  billing_scheme: "per_unit";
  created: number;
  currency: string;
  custom_unit_amount: null;
  livemode: boolean;
  lookup_key: null;
  metadata: Record<string, never>;
  nickname: null;
  product: Product;
  recurring: null;
  tax_behavior: "unspecified";
  tiers_mode: null;
  transform_quantity: null;
  type: "one_time";
  unit_amount: number;
  unit_amount_decimal: string;
};
