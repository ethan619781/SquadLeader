/**
 * 订单相关接口示例
 * 对接时把 mock 数据改为这里调 api，页面里用 useState/useEffect 或 React Query 消费
 */

import { api, ApiResponse } from './request'

// 类型定义：与后端约定一致，便于后续对接
export interface OrderItem {
  id: string
  status: '待付款' | '待发货' | '待收货' | '已完成' | '已取消'
  productImage: string
  productName: string
  unitPrice: number
  quantity: number
  totalAmount: number
  isPaid: boolean
  createdAt: string
  cancelledAt?: string
  cancelReason?: string
}

export interface OrderListResult {
  list: OrderItem[]
  total: number
  page: number
  pageSize: number
}

/** 获取订单列表（示例：对接后替换组件内 mock） */
export function getOrderList(params: {
  tab?: string
  page?: number
  pageSize?: number
}): Promise<ApiResponse<OrderListResult>> {
  return api.get<OrderListResult>('/api/orders', {
    tab: params.tab || '全部',
    page: String(params.page ?? 1),
    pageSize: String(params.pageSize ?? 10),
  })
}

/** 获取订单详情（示例） */
export function getOrderDetail(orderId: string): Promise<ApiResponse<OrderItem>> {
  return api.get<OrderItem>(`/api/orders/${orderId}`)
}
