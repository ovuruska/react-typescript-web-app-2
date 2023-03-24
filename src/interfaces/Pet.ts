export default interface Pet {
  id: number;
  created_at: String;
  updated_at: String;
  name: String;
  breed: String;
  age: number;
  weight: number;
  description: String;
  rabies_vaccination: String;
  employee_notes: String;
  customer_notes: String;
  special_handling: Boolean;
  coat_type: String;
  owner: number;
}
