export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName?: string;
  name?: string;
  age?: number;
  gender?: string;
  city?: string;
  phoneNumber?: string;
  [key: string]: string | number | boolean | null | undefined; // For other properties that might be returned from the API
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
