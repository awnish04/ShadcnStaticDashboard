// utils/paymentMethods.ts
export type PaymentIconType =
  | "Alipay"
  | "Amex"
  | "Code"
  | "CodeFront"
  | "Diners"
  | "Discover"
  | "Elo"
  | "Generic"
  | "Hiper"
  | "Hipercard"
  | "Jcb"
  | "Maestro"
  | "Mastercard"
  | "Mir"
  | "Paypal"
  | "Unionpay"
  | "Visa";

export function getPaymentIconType(paymentMethod: string): PaymentIconType {
  const methodMap: Record<string, PaymentIconType> = {
    visa: "Visa",
    mastercard: "Mastercard",
    "master card": "Mastercard",
    amex: "Amex",
    "american express": "Amex",
    paypal: "Paypal",
    discover: "Discover",
    diners: "Diners",
    "diners club": "Diners",
    jcb: "Jcb",
    unionpay: "Unionpay",
    "union pay": "Unionpay",
    maestro: "Maestro",
    "credit card": "Generic",
    "debit card": "Generic",
    upi: "Generic",
    cod: "Generic",
  };

  return methodMap[paymentMethod.toLowerCase()] || "Generic";
}

export function isValidPaymentMethod(
  method: string
): method is PaymentIconType {
  const validMethods: PaymentIconType[] = [
    "Alipay",
    "Amex",
    "Code",
    "CodeFront",
    "Diners",
    "Discover",
    "Elo",
    "Generic",
    "Hiper",
    "Hipercard",
    "Jcb",
    "Maestro",
    "Mastercard",
    "Mir",
    "Paypal",
    "Unionpay",
    "Visa",
  ];
  return validMethods.includes(method as PaymentIconType);
}
