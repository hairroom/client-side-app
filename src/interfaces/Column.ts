export interface Column {
    id:
      | "createdAt"
      | "name"
      | "lastName"
      | "typeIdentification"
      | "numberIdentification"
      | "phone"
      | "email"
      | "address"
      // | "service"
      // | "product"
      // | "price"
      // | "paymentMethod";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}