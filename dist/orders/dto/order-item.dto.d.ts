export declare class OrderItemDto {
    productId: string;
    quantity: number;
    price: number;
}
export declare class CreateOrderItemDto extends OrderItemDto {
}
export declare class UpdateOrderItemDto extends OrderItemDto {
    id: string;
}
