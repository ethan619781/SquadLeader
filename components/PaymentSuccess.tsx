import { CheckCircle2 } from 'lucide-react';

interface PaymentSuccessProps {
  onNavigateToCardList: () => void;
  onNavigateToOrderDetail: (orderId: string) => void;
  orderId: string;
}

export default function PaymentSuccess({ onNavigateToCardList, onNavigateToOrderDetail, orderId }: PaymentSuccessProps) {
  return (
    <div className="w-full min-h-screen bg-[#F4F4F4] flex flex-col items-center justify-center px-4">
      {/* 支付成功图标和文字 */}
      <div className="flex items-center gap-3 mb-8">
        <CheckCircle2 className="w-12 h-12 text-[#00C250]" />
        <span className="text-[20px] text-[#111111]" style={{ fontWeight: 600 }}>
          支付成功
        </span>
      </div>

      {/* 操作按钮 */}
      <div className="w-full max-w-sm flex gap-3">
        <button
          onClick={() => onNavigateToOrderDetail(orderId)}
          className="flex-1 border-2 border-gray-300 text-[#333333] text-[14px] py-3 rounded-lg active:opacity-80 transition-colors"
          style={{ fontWeight: 500 }}
        >
          查看订单
        </button>
        <button
          onClick={onNavigateToCardList}
          className="flex-1 border-2 border-[#FFC300] text-[#FFC300] text-[14px] py-3 rounded-lg active:opacity-80 transition-colors"
          style={{ fontWeight: 500 }}
        >
          继续逛逛
        </button>
      </div>
    </div>
  );
}
