import { useState, useEffect } from 'react';
import { ChevronLeft, MoreVertical, Copy } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrderDetailProps {
  onNavigateBack: () => void;
  onNavigateToPayment?: (orderId: string) => void;
  onShowCancelModal?: () => void;
  onShowConfirmReceipt?: () => void;
  orderId: string;
}

type OrderStatus = '待付款' | '待发货' | '待收货' | '已完成' | '已取消';

export default function OrderDetail({ onNavigateBack, onNavigateToPayment, onShowCancelModal, onShowConfirmReceipt, orderId }: OrderDetailProps) {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(3592); // 59分52秒 = 3592秒
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // 根据订单ID获取订单数据（Mock）
  const getOrderData = (id: string) => {
    const orders: Record<string, any> = {
      '4922275681678748821': {
        id: id,
        status: '待发货' as OrderStatus,
        card: {
          name: '喜行约车杭州1天免佣卡 所有渠道0抽佣',
          image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
          price: 89,
          quantity: 2,
          city: '杭州'
        },
        phone: '18089898989',
        remarks: '请及时帮我发货谢谢',
        paymentMethod: '微信',
        totalAmount: 178,
        isPaid: true,
        orderTime: '2025-11-25 17:30:00',
        paymentTime: '2025-11-25 17:30:05'
      },
      '4922275681678748822': {
        id: id,
        status: '待付款' as OrderStatus,
        card: {
          name: '喜行约车杭州1天免佣卡 所有渠道0抽佣',
          image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
          price: 89,
          quantity: 1,
          city: '杭州'
        },
        phone: '18089898989',
        remarks: '请及时帮我发货谢谢',
        paymentMethod: '微信',
        totalAmount: 89,
        isPaid: false,
        orderTime: '2025-11-25 17:24:49'
      },
      '4922275681678748823': {
        id: id,
        status: '待收货' as OrderStatus,
        card: {
          name: '喜行约车杭州1天免佣卡 所有渠道0抽佣',
          image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
          price: 89,
          quantity: 1,
          city: '杭州'
        },
        phone: '18089898989',
        remarks: '请及时帮我发货谢谢',
        paymentMethod: '微信',
        totalAmount: 89,
        isPaid: true,
        orderTime: '2025-11-24 10:15:30',
        paymentTime: '2025-11-24 10:15:35'
      },
      '4922275681678748824': {
        id: id,
        status: '已取消' as OrderStatus,
        card: {
          name: '喜行约车杭州1天免佣卡 所有渠道0抽佣',
          image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
          price: 89,
          quantity: 1,
          city: '杭州'
        },
        phone: '18089898989',
        remarks: '请及时帮我发货谢谢',
        paymentMethod: '微信',
        totalAmount: 89,
        isPaid: false,
        orderTime: '2025-11-23 14:20:15',
        cancelledAt: '2025-11-23 14:25:30',
        cancelReason: '超时未支付'
      },
      '4922275681678748825': {
        id: id,
        status: '已完成' as OrderStatus,
        card: {
          name: '喜行约车杭州1天免佣卡 所有渠道0抽佣',
          image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
          price: 89,
          quantity: 1,
          city: '杭州'
        },
        phone: '18089898989',
        remarks: '请及时帮我发货谢谢',
        paymentMethod: '微信',
        totalAmount: 89,
        isPaid: true,
        orderTime: '2025-11-20 09:30:00',
        paymentTime: '2025-11-20 09:30:05',
        refundAmount: 89,
        refundTime: '2050-11-20 11:11'
      }
    };
    return orders[id] || orders['4922275681678748822'];
  };

  const orderData = getOrderData(orderId);

  // 倒计时
  useEffect(() => {
    if (orderData.status === '待付款') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [orderData.status]);

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderData.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 获取金额显示文案
  const getAmountText = () => {
    if (orderData.status === '待付款') {
      return { label: '需付款', amount: orderData.totalAmount };
    } else if (orderData.isPaid) {
      return { label: '实付款', amount: orderData.totalAmount };
    } else if (orderData.status === '已取消') {
      return { label: '应付款', amount: orderData.totalAmount };
    }
    return { label: '订单金额', amount: orderData.totalAmount };
  };

  const amountInfo = getAmountText();

  return (
    <div className="w-full min-h-screen bg-[#F4F4F4] page-content-with-bottom-action">
      {/* 顶部导航栏 - 品牌黄 Header */}
      <div className="bg-[#FFC300] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <ChevronLeft className="w-6 h-6 cursor-pointer text-[#1A1A1A]" onClick={onNavigateBack} />
        <span className="text-[18px] flex-1 text-center text-[#1A1A1A]" style={{ fontWeight: 600 }}>
          {orderData.status}
        </span>
        <div className="flex items-center gap-3">
          <MoreVertical className="w-5 h-5 text-[#1A1A1A]" />
          <div className="w-6 h-6 border-2 border-[#1A1A1A] rounded-full" />
        </div>
      </div>

      {/* 待付款倒计时 */}
      {orderData.status === '待付款' && countdown > 0 && (
        <div className="bg-white mx-4 mt-3 rounded-[12px] px-4 py-3 -mt-4">
          <div className="text-[14px] text-[#333333]">
            还剩 <span className="text-[#FF4A26]" style={{ fontWeight: 700 }}>{formatCountdown(countdown)}</span> 订单自动取消
          </div>
        </div>
      )}

      {/* 取消原因 */}
      {orderData.status === '已取消' && orderData.cancelReason && (
        <div className="bg-white mx-4 mt-3 rounded-[12px] px-4 py-3 -mt-4">
          <div className="text-[14px] text-[#333333]">
            取消原因：{orderData.cancelReason}
          </div>
        </div>
      )}

      {/* 售后退款信息 */}
      {orderData.status === '已完成' && orderData.refundAmount && (
        <div className="bg-white mx-4 mt-3 rounded-[12px] p-4 -mt-4">
          <div className="text-[18px] text-[#111111] mb-2" style={{ fontWeight: 600 }}>
            售后退款
          </div>
          <div className="text-[14px] text-[#333333] mb-1">
            售后退款: <span className="text-[#FF4A26]" style={{ fontWeight: 700 }}>¥{orderData.refundAmount.toFixed(2)}</span>
          </div>
          <div className="text-[12px] text-[#999999]">
            退款成功: {orderData.refundTime}
          </div>
        </div>
      )}

      {/* 商品信息 */}
      <div className="bg-white mx-4 mt-3 rounded-[12px] p-4">
        <div className="flex items-start gap-3">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center flex-shrink-0">
            <div className="text-3xl">🚗</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] text-[#111111] mb-2" style={{ fontWeight: 500 }}>
              {orderData.card.name}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[18px] text-[#FF4A26]" style={{ fontWeight: 700 }}>
                ¥{orderData.card.price}
              </span>
              <span className="text-[12px] text-[#999999]">
                数量 ×{orderData.card.quantity}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 接单手机号 */}
      <div className="bg-white mx-4 mt-3 rounded-[12px] p-4">
        <div className="text-[14px] text-[#111111] mb-1" style={{ fontWeight: 500 }}>
          接单手机号
        </div>
        <div className="text-[14px] text-[#333333]">{orderData.phone}</div>
      </div>

      {/* 备注 */}
      {orderData.remarks && (
        <div className="bg-white mx-4 mt-3 rounded-[12px] p-4">
          <div className="text-[14px] text-[#111111] mb-1" style={{ fontWeight: 500 }}>
            备注
          </div>
          <div className="text-[14px] text-[#333333]">{orderData.remarks}</div>
        </div>
      )}

      {/* 支付信息 */}
      <div className="bg-white mx-4 mt-3 rounded-[12px] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] text-[#111111]" style={{ fontWeight: 500 }}>
            付款方式
          </span>
          <span className="text-[14px] text-[#333333]">{orderData.paymentMethod}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-[#111111]" style={{ fontWeight: 500 }}>
            {amountInfo.label}
          </span>
          <span
            className={`text-[18px] ${
              orderData.status === '待付款' || orderData.status === '已取消'
                ? 'text-[#FF4A26]'
                : 'text-[#111111]'
            }`}
            style={{ fontWeight: 700 }}
          >
            ¥{amountInfo.amount}
          </span>
        </div>
      </div>

      {/* 订单信息 */}
      <div className="bg-white mx-4 mt-3 rounded-[12px] p-4">
        <div className="text-[18px] text-[#111111] mb-3" style={{ fontWeight: 600 }}>
          订单信息
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#999999]">订单编号</span>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-[#111111]">{orderData.id}</span>
              <button
                onClick={handleCopyOrderId}
                className="flex items-center gap-1 text-[#2A83FE] text-[12px] active:opacity-80"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? '已复制' : '复制'}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#999999]">
              {orderData.status === '已取消' ? '下单时间' : orderData.isPaid ? '创建时间' : '下单时间'}
            </span>
            <span className="text-[13px] text-[#333333]">{orderData.orderTime}</span>
          </div>
          {orderData.paymentTime && (
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#999999]">支付时间</span>
              <span className="text-[13px] text-[#333333]">{orderData.paymentTime}</span>
            </div>
          )}
          {orderData.cancelledAt && (
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#999999]">取消时间</span>
              <span className="text-[13px] text-[#333333]">{orderData.cancelledAt}</span>
            </div>
          )}
        </div>
      </div>

      {/* 底部操作按钮 */}
      {(orderData.status === '待付款' || orderData.status === '待发货' || orderData.status === '待收货' || orderData.status === '已完成' || orderData.status === '已取消') && (
        <div className="bottom-action-bar px-4 py-3">
          {orderData.status === '待付款' && (
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="flex-1 border-2 border-gray-300 text-[#333333] text-[14px] py-3 rounded-lg active:opacity-80 transition-colors"
                style={{ fontWeight: 500 }}
              >
                取消订单
              </button>
              <button
                onClick={() => onNavigateToPayment?.(orderData.id)}
                className="flex-1 bg-[#FFC300] text-[#1A1A1A] text-[14px] py-3 rounded-lg active:bg-[#E5B000] active:opacity-80 transition-colors"
                style={{ fontWeight: 600 }}
              >
                去支付
              </button>
            </div>
          )}
          {orderData.status === '待发货' && (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="w-full border-2 border-gray-300 text-[#333333] text-[14px] py-3 rounded-lg active:opacity-80 transition-colors"
              style={{ fontWeight: 500 }}
            >
              取消订单
            </button>
          )}
          {orderData.status === '待收货' && (
            <button
              onClick={() => {
                if (onShowConfirmReceipt) {
                  onShowConfirmReceipt();
                } else {
                  alert('确认收货成功！');
                }
              }}
              className="w-full border-2 border-gray-300 text-[#333333] text-[14px] py-3 rounded-lg active:opacity-80 transition-colors"
              style={{ fontWeight: 500 }}
            >
              确认收货
            </button>
          )}
          {(orderData.status === '已完成' || orderData.status === '已取消') && (
            <button
              className="w-full border-2 border-[#FFC300] text-[#FFC300] text-[14px] py-3 rounded-lg active:opacity-80 transition-colors"
              style={{ fontWeight: 500 }}
            >
              联系客服
            </button>
          )}
        </div>
      )}

      {/* 取消订单确认弹窗 */}
      {showCancelConfirm && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-5 safe-area-bottom">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[18px] text-[#111111]" style={{ fontWeight: 600 }}>
                确定取消订单?
              </span>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="w-6 h-6 flex items-center justify-center text-gray-400"
              >
                ×
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 border-2 border-gray-300 text-[#333333] text-[14px] py-3 rounded-lg active:opacity-80 transition-colors"
                style={{ fontWeight: 500 }}
              >
                我在等等
              </button>
              <button
                onClick={() => {
                  setShowCancelConfirm(false);
                  if (onShowCancelModal) {
                    onShowCancelModal();
                  } else {
                    alert('订单已取消');
                    onNavigateBack();
                  }
                }}
                className="flex-1 bg-[#FFC300] text-[#1A1A1A] text-[14px] py-3 rounded-lg active:bg-[#E5B000] active:opacity-80 transition-colors"
                style={{ fontWeight: 600 }}
              >
                确认取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
