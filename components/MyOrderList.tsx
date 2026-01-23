import { useState, useMemo } from 'react';
import { ChevronLeft, Home, MoreVertical } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MyOrderListProps {
  onNavigateBack: () => void;
  onNavigateToOrderDetail: (orderId: string) => void;
  initialTab?: string;
}

interface Order {
  id: string;
  status: '待付款' | '待发货' | '待收货' | '已完成' | '已取消';
  productImage: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalAmount: number;
  isPaid: boolean;
  createdAt: string;
  cancelledAt?: string;
  cancelReason?: string;
}

export default function MyOrderList({ onNavigateBack, onNavigateToOrderDetail, initialTab = '全部' }: MyOrderListProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Mock 订单数据 - 按创建时间倒序
  const allOrders: Order[] = [
    {
      id: '4922275681678748821',
      status: '待发货',
      productImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      productName: '喜行约车杭州1天免佣卡 所有渠道0抽佣',
      unitPrice: 89,
      quantity: 2,
      totalAmount: 178,
      isPaid: true,
      createdAt: '2025-11-25 17:30:00'
    },
    {
      id: '4922275681678748822',
      status: '待付款',
      productImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      productName: '喜行约车杭州1天免佣卡 所有渠道0抽佣',
      unitPrice: 89,
      quantity: 1,
      totalAmount: 89,
      isPaid: false,
      createdAt: '2025-11-25 17:24:49'
    },
    {
      id: '4922275681678748823',
      status: '待收货',
      productImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      productName: '喜行约车杭州1天免佣卡 所有渠道0抽佣',
      unitPrice: 89,
      quantity: 1,
      totalAmount: 89,
      isPaid: true,
      createdAt: '2025-11-24 10:15:30'
    },
    {
      id: '4922275681678748824',
      status: '已取消',
      productImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      productName: '喜行约车杭州1天免佣卡 所有渠道0抽佣',
      unitPrice: 89,
      quantity: 1,
      totalAmount: 89,
      isPaid: false,
      createdAt: '2025-11-23 14:20:15',
      cancelledAt: '2025-11-23 14:25:30',
      cancelReason: '超时未支付'
    },
    {
      id: '4922275681678748825',
      status: '已完成',
      productImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      productName: '喜行约车杭州1天免佣卡 所有渠道0抽佣',
      unitPrice: 89,
      quantity: 1,
      totalAmount: 89,
      isPaid: true,
      createdAt: '2025-11-20 09:30:00'
    }
  ];

  // 根据Tab筛选订单
  const filteredOrders = useMemo(() => {
    if (activeTab === '全部') {
      return allOrders;
    }
    return allOrders.filter(order => order.status === activeTab);
  }, [activeTab]);

  // 获取订单金额显示文案
  const getAmountText = (order: Order) => {
    if (order.status === '待付款') {
      return { text: `需付款 ¥${order.totalAmount}`, color: 'text-[#FF4A26]' };
    } else if (order.isPaid) {
      return { text: `实付款 ¥${order.totalAmount}`, color: 'text-[#111111]' };
    } else if (order.status === '已取消') {
      return { text: `应付款 ¥${order.totalAmount}`, color: 'text-[#FF4A26]' };
    }
    return { text: `¥${order.totalAmount}`, color: 'text-[#111111]' };
  };

  const tabs = ['全部', '待付款', '待发货', '待收货', '已完成'];

  return (
    <div className="w-full min-h-screen bg-[#F4F4F4]">
      {/* 顶部导航栏 - 品牌黄 Header */}
      <div className="bg-[#FFC300] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <ChevronLeft className="w-6 h-6 cursor-pointer text-[#1A1A1A]" onClick={onNavigateBack} />
          <Home className="w-5 h-5 cursor-pointer text-[#1A1A1A]" />
        </div>
        <span className="text-[18px] flex-1 text-center text-[#1A1A1A]" style={{ fontWeight: 600 }}>
          我的订单
        </span>
        <div className="flex items-center gap-3">
          <MoreVertical className="w-5 h-5 text-[#1A1A1A]" />
          <div className="w-6 h-6 border-2 border-[#1A1A1A] rounded-full" />
        </div>
      </div>

      {/* Tab 标签栏 */}
      <div className="bg-white border-b border-gray-200 sticky top-[52px] z-10 -mt-4">
        <div className="flex overflow-x-auto px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-3 text-[15px] relative transition-colors active:opacity-80 ${
                activeTab === tab ? 'text-[#FFC300]' : 'text-[#333333]'
              }`}
              style={{ fontWeight: activeTab === tab ? 600 : 400 }}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC300]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 订单列表 */}
      <div className="px-4 py-4">
        {filteredOrders.length > 0 ? (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => onNavigateToOrderDetail(order.id)}
                className="bg-white rounded-[12px] p-4 active:scale-[0.98] transition-transform cursor-pointer"
              >
                {/* 顶部：Logo + 状态 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#FFC300] rounded" />
                    <span className="text-[14px] text-[#111111]" style={{ fontWeight: 500 }}>
                      喜行约车
                    </span>
                  </div>
                  <span
                    className={`text-[13px] px-2 py-0.5 rounded ${
                      order.status === '待付款'
                        ? 'bg-red-50 text-[#FF4A26]'
                        : order.status === '待发货'
                        ? 'bg-orange-50 text-[#FFC300]'
                        : order.status === '待收货'
                        ? 'bg-blue-50 text-[#2A83FE]'
                        : order.status === '已完成'
                        ? 'bg-green-50 text-[#00C250]'
                        : 'bg-gray-50 text-[#999999]'
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {order.status}
                  </span>
                </div>

                {/* 商品信息 */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center flex-shrink-0">
                    <div className="text-3xl">🚗</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] text-[#111111] mb-2 line-clamp-2" style={{ fontWeight: 500 }}>
                      {order.productName}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] text-[#FF4A26]" style={{ fontWeight: 700 }}>
                          ¥{order.unitPrice}
                        </span>
                        <span className="text-[12px] text-[#999999]">
                          数量×{order.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 订单金额和操作按钮 */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span
                    className={`text-[15px] ${getAmountText(order).color}`}
                    style={{ fontWeight: 600 }}
                  >
                    {getAmountText(order).text}
                  </span>

                  <div className="flex items-center gap-2">
                    {order.status === '待付款' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToOrderDetail(order.id);
                          }}
                          className="px-4 py-1.5 border border-gray-300 text-[#595959] text-[13px] rounded-lg active:scale-95 transition-transform"
                          style={{ fontWeight: 500 }}
                        >
                          取消订单
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToOrderDetail(order.id);
                          }}
                          className="px-4 py-1.5 bg-[#FFC300] text-[#1A1A1A] text-[13px] rounded-lg active:bg-[#E5B000] active:opacity-80 transition-colors"
                          style={{ fontWeight: 600 }}
                        >
                          立即支付
                        </button>
                      </>
                    )}
                    {order.status === '待发货' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToOrderDetail(order.id);
                        }}
                        className="px-4 py-1.5 border border-gray-300 text-[#595959] text-[13px] rounded-lg active:scale-95 transition-transform"
                        style={{ fontWeight: 500 }}
                      >
                        取消订单
                      </button>
                    )}
                    {order.status === '待收货' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToOrderDetail(order.id);
                        }}
                        className="px-4 py-1.5 border border-gray-300 text-[#595959] text-[13px] rounded-lg active:scale-95 transition-transform"
                        style={{ fontWeight: 500 }}
                      >
                        确认收货
                      </button>
                    )}
                    {/* 已取消、已完成：无按钮 */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 text-[14px]">
            暂无{activeTab === '全部' ? '' : activeTab}订单
          </div>
        )}
      </div>
    </div>
  );
}
