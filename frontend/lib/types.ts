export type Gender = "MALE" | "FEMALE" | "OTHER";

export type Category =
  | "CS"
  | "CIVIL"
  | "MECHANICAL"
  | "ELECTRICAL"
  | "IT";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  address: string;
  institute: string;
  category: Category;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}


export type StudentPatchRequest = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  address: string;
  institute: string;
  category: Category;
  profileImageUrl: string;
}>;


export interface CountDto {
  label: string;
  count: number;
}

export interface MonthlyTrend {
  month: number;
  count: number;
}