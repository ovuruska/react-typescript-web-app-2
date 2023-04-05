export interface EmployeeEntity {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  role: number;

}

export interface EmployeeFilter {
  role?: string;
}
