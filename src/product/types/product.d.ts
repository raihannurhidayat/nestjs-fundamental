export interface RequestCreateProduct {
  name: string;
  description: string;
  price: number;
}

export interface ResponseCreatedProduct {
  data: {
    name: string;
    description: string;
    price: number;
    createdAt: number;
    updatedAt: number;
  };
}
