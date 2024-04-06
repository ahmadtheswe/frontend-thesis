export interface PaymentRequest {
  paymentType: string;
  email: string;
  packageType: string;
}

export interface PaymentResponse {
  orderId: string;
  token: string;
  redirectUrl: string;
}

export interface OnProgressPaymentResponse {
  id: string;
  userId: string;
  email: string;
  packageId: string;
  paymentStatus: string;
  redirectUrl: string;
  midtransToken: string;
  paymentDueDate: string;
}

export interface PaymentCheckResponse {
  id: string;
  userId: string;
  email: string;
  packageType: string;
  paymentType: string;
  paymentStatus: string;
  payDate: string;
  validDate: string;
  redirectUrl: string;
  midtransToken: string;
  paymentDueDate: string;
}

export interface ActivePackageResponse {
  activePackage: string;
  activeUntil: string;
}
