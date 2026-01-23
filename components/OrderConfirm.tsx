import { useState } from 'react';
import { ChevronLeft, MoreVertical } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrderData {
  cardId: number;
  cardName: string;
  cardImage: string;
  price: number;
  phone: string;
  remarks: string;
}

interface OrderConfirmProps {
  onNavigateBack: () => void;
  onNavigateToPayment: (orderData: OrderData) => void;
  cardId: number;
}

export default function OrderConfirm({ onNavigateBack, onNavigateToPayment, cardId }: OrderConfirmProps) {
  const [phone, setPhone] = useState('13800138000'); // 默认当前登录账号
  const [remarks, setRemarks] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Mock 商品数据
  const cardData = {
    id: cardId,
    name: '喜行约车杭州1天免佣卡 所有渠道0抽佣',
    price: 89,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
    city: '杭州'
  };

  // 订单公告提醒信息（后台配置）
  const orderNotice = '17点前购买明天生效, 17点后购买后天生效';

  // 手机号验证
  const validatePhone = (phoneNumber: string) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneNumber.trim()) {
      return '请输入接单手机号';
    }
    if (!phoneRegex.test(phoneNumber)) {
      return '手机号格式不正确';
    }
    return '';
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (phoneError) {
      setPhoneError(validatePhone(value));
    }
  };

  const handlePhoneBlur = () => {
    setPhoneError(validatePhone(phone));
  };

  const handleSubmit = () => {
    const error = validatePhone(phone);
    if (error) {
      setPhoneError(error);
      return;
    }

    const orderData: OrderData = {
      cardId: cardData.id,
      cardName: cardData.name,
      cardImage: cardData.image,
      price: cardData.price,
      phone: phone.trim(),
      remarks: remarks.trim()
    };

    onNavigateToPayment(orderData);
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F4F4] page-content-with-bottom-action">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={onNavigateBack} />
        <span className="text-[17px] flex-1 text-center" style={{ fontWeight: 600 }}>
          订单确认
        </span>
        <div className="flex items-center gap-3">
          <MoreVertical className="w-5 h-5 text-gray-600" />
          <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
        </div>
      </div>

      {/* 订单公告提醒 */}
      {orderNotice && (
        <div className="bg-[#FFF9E6] mx-4 mt-3 rounded-lg px-3 py-2.5 flex items-start gap-2">
          <div className="text-[18px] mt-0.5">📢</div>
          <div className="flex-1 text-[13px] text-[#595959] leading-relaxed">
            {orderNotice}
          </div>
        </div>
      )}

      {/* 商品信息 */}
      <div className="bg-white mx-4 mt-3 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center flex-shrink-0">
            <div className="text-3xl">🚗</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] text-[#1F1F1F] mb-2 line-clamp-2" style={{ fontWeight: 500 }}>
              {cardData.name}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-orange-50 text-[#FFC300] text-[11px] rounded">
                限购1单
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[18px] text-[#FF4A26]" style={{ fontWeight: 700 }}>
                ¥{cardData.price}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#595959]">数量</span>
                <span className="text-[14px] text-[#1F1F1F]">×1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 支付信息 */}
      <div className="bg-white mx-4 mt-3 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-[#1F1F1F]" style={{ fontWeight: 500 }}>
            支付方式
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[14px] text-[#1F1F1F]">微信支付</span>
            <div className="w-5 h-5 rounded-full border-2 border-[#1677FF] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1677FF]" />
            </div>
          </div>
        </div>
      </div>

      {/* 接单手机号 */}
      <div className="bg-white mx-4 mt-3 rounded-xl p-4">
        <div className="mb-3">
          <span className="text-[14px] text-[#1F1F1F]" style={{ fontWeight: 500 }}>
            接单手机号
          </span>
          <span className="text-[12px] text-[#FF4A26] ml-1">*</span>
        </div>
        <input
          type="tel"
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onBlur={handlePhoneBlur}
          placeholder="请输入接单手机号 (必填)"
          className={`w-full bg-[#F4F4F4] rounded-lg px-3 py-2.5 text-[14px] outline-none ${
            phoneError ? 'border border-[#FF4D4F]' : ''
          }`}
        />
        {phoneError && (
          <div className="text-[12px] text-[#FF4A26] mt-1">{phoneError}</div>
        )}
      </div>

      {/* 备注信息 */}
      <div className="bg-white mx-4 mt-3 rounded-xl p-4">
        <div className="mb-3">
          <span className="text-[14px] text-[#1F1F1F]" style={{ fontWeight: 500 }}>
            备注
          </span>
        </div>
        <textarea
          value={remarks}
          onChange={(e) => {
            if (e.target.value.length <= 200) {
              setRemarks(e.target.value);
            }
          }}
          placeholder="请输入订单备注"
          rows={4}
          className="w-full bg-[#F4F4F4] rounded-lg px-3 py-2.5 text-[14px] outline-none resize-none"
        />
        <div className="text-right text-[12px] text-[#BFBFBF] mt-1">
          {remarks.length}/200
        </div>
      </div>

      {/* 底部支付按钮 */}
      <div className="bottom-action-bar px-4 py-3">
        <button
          onClick={handleSubmit}
          className="w-full bg-[#FAAD14] text-white text-[16px] py-3 rounded-lg active:bg-[#E5B000] active:opacity-80 transition-colors"
          style={{ fontWeight: 600 }}
        >
          立即支付 ¥{cardData.price}
        </button>
      </div>
    </div>
  );
}
