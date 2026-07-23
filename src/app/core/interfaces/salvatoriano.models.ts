export interface SalvatorianoResponse {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  photoUrl: string | null;
  parishId: string | null;
  parishName: string | null;
  cargoId: number | null;
  cargoName: string | null;
  missionCity: string | null;
  birthDate: string | null; // yyyy-MM-dd
  age: number | null;
  ordinationDate: string | null; // yyyy-MM-dd
  perpetualVowsDate: string | null; // yyyy-MM-dd
  eligibleForProvincial: boolean;
  enabledToVote: boolean;
  createdAt: string;
  updatedAt: string;
}

// Debe calzar exactamente con SalvatorianoRequest.java (mismos nombres de campo).
export interface SalvatorianoRequest {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  photoUrl: string | null;
  parishId: string | null;
  cargoId: number | null;
  missionCity: string | null;
  birthDate: string | null; // yyyy-MM-dd
  ordinationDate: string | null; // yyyy-MM-dd
  perpetualVowsDate: string | null; // yyyy-MM-dd
  eligibleForProvincial: boolean;
  enabledToVote: boolean;
}

export interface PageResponse<T> {
  content: T[];
  page: number; // 0-based, igual que Spring Pageable
  size: number;
  totalElements: number;
  totalPages: number;
}
