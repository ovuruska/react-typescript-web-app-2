export interface CreatePetRequest {
  name: string;
  breed: string;
  weight: number;
  age?: number;
  gender: string;
  birthDate: string;
  specialHandling?: string;
}
