export interface StudentDetails {
  id: string;
  name: string;
  totalMarks: number;
  age: number;
  grade: string;
  email: string;
}

export interface Filters {
  page: string;
  limit: string;
  name: string;
  age: string;
}
