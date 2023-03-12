import Pet from "./Pet";

export default interface ApiMeResponse {
  id: number;
  lifetime_tips: number;
  lifetime_product_sales: number;
  lifetime_service_sales: number;
  dogs: Array<Pet>;
  created_at: String;
  updated_at: String;
  name: String;
  uid: String;
  email: String;
  phone: String;
  address: String;
  role: number;
  user: number;
}
