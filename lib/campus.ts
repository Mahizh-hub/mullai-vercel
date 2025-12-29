export type CampusAddress = {
  doorNo: string;
  line1: string;
  line2: string;
  landmark?: string;
  city: string;
  state?: string;
  pinCode: string;
  country: string;
};

export type Campus = {
  id: string; // internal id
  slug: string; // URL-safe unique slug
  name: string;
  adminName: string;
  board: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  alternateEmail?: string;
  address: CampusAddress;
  logoUrl?: string;
  createdAt: string;
};
