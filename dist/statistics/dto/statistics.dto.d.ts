export interface MonthlySales {
    month: string;
    amount: number;
    orderCount: number;
}
export interface TopProduct {
    productId: string;
    productName: string;
    sales: number;
    productPrice: number;
}
export declare class StatisticsDto {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    lowStockItems: number;
    recentOrders: number;
    monthlySales: MonthlySales[];
    topProducts: TopProduct[];
}
