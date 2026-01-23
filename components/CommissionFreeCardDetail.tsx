import { useState, useEffect } from 'react';
import { ChevronLeft, MoreVertical, Home } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CommissionFreeCardDetailProps {
  onNavigateBack: () => void;
  onNavigateToOrderConfirm: (cardId: number) => void;
  cardId: number;
}

export default function CommissionFreeCardDetail({ onNavigateBack, onNavigateToOrderConfirm, cardId }: CommissionFreeCardDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showServiceModal, setShowServiceModal] = useState(false);

  // Mock 商品数据
  const cardData = {
    id: cardId,
    name: '喜行约车杭州1天免佣卡 所有渠道0抽佣',
    price: 89,
    originalPrice: 101,
    sales: 1466,
    city: '杭州',
    images: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200'
    ],
    serviceNotice: '线下门店 · 不支持申请退款 · 收货后结算',
    serviceDetail: '本商品为虚拟商品，购买后将在指定时间生效。17点前购买次日生效，17点后购买后日生效。不支持退款，请谨慎购买。',
    description: '购买后享受1天内所有订单免佣金服务，适用于所有接单渠道。',
    detailImages: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=400'
    ]
  };

  // 图片轮播自动切换
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % cardData.images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [cardData.images.length]);

  return (
    <div className="w-full min-h-screen bg-[#F4F4F4] page-content-with-bottom-action">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={onNavigateBack} />
          <Home className="w-5 h-5 cursor-pointer text-gray-600" />
        </div>
        <span className="text-[17px] flex-1 text-center" style={{ fontWeight: 600 }}>
          喜行约车
        </span>
        <div className="flex items-center gap-3">
          <MoreVertical className="w-5 h-5 text-gray-600" />
          <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
        </div>
      </div>

      {/* 商品图轮播 */}
      <div className="relative bg-white">
        <div className="relative overflow-hidden" style={{ height: '375px' }}>
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {cardData.images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 relative">
                <div className="bg-gradient-to-br from-green-50 to-green-100 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚗</div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mx-4">
                      <div className="text-[16px] text-green-700 mb-2" style={{ fontWeight: 700 }}>
                        单单免佣卡优惠
                      </div>
                      <div className="text-[12px] text-[#FFC300] mb-2">{cardData.city}</div>
                      <div className="text-[14px] text-green-600 mb-1">单单免 1天</div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-[12px] text-green-600">售价</span>
                        <span className="text-[20px] text-[#FF4A26]" style={{ fontWeight: 700 }}>
                          {cardData.price}
                        </span>
                        <span className="text-[12px] text-green-600">元</span>
                      </div>
                      <div className="text-[10px] text-gray-500 mt-2">
                        当日17点后购买的订单后天生效开始免佣
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 轮播指示器 */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {cardData.images.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        {/* 页码指示 */}
        <div className="absolute bottom-3 left-3 bg-black/30 text-white text-[11px] px-2 py-0.5 rounded">
          {currentImageIndex + 1}/{cardData.images.length}
        </div>
      </div>

      {/* 商品基础信息 */}
      <div className="bg-white px-4 py-4 mb-3">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[22px] text-[#FFC300]" style={{ fontWeight: 700 }}>
            ¥{cardData.price}
          </span>
          {cardData.originalPrice && (
            <>
              <span className="text-[14px] text-gray-400 line-through">
                价格 ¥{cardData.originalPrice}
              </span>
            </>
          )}
          <span className="ml-auto text-[14px] text-[#FFC300]">
            已售{cardData.sales}
          </span>
        </div>
        <div className="text-[16px] text-[#1F1F1F] mb-3" style={{ fontWeight: 600 }}>
          {cardData.name}
        </div>
      </div>

      {/* 服务告知 */}
      <div className="bg-white px-4 py-3 mb-3">
        <div
          className="flex items-center justify-between cursor-pointer active:opacity-70"
          onClick={() => setShowServiceModal(true)}
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-[#FAAD14] rounded-full" />
            <div className="w-1 h-1 bg-[#FAAD14] rounded-full" />
            <div className="w-1 h-1 bg-[#FAAD14] rounded-full" />
            <div className="w-1 h-1 bg-[#FAAD14] rounded-full" />
            <span className="text-[14px] text-[#1F1F1F]" style={{ fontWeight: 500 }}>
              服务
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#595959] text-[13px]">
            <span>{cardData.serviceNotice}</span>
            <span className="text-gray-400">&gt;</span>
          </div>
        </div>
      </div>

      {/* 温馨提示 */}
      <div className="bg-white px-4 py-3 mb-3">
        <div className="text-[14px] text-[#1F1F1F] mb-2" style={{ fontWeight: 600 }}>
          温馨提示
        </div>
        <div className="space-y-2 text-[13px] text-[#595959] leading-relaxed">
          <div>如需使用微信支付,可在微信小程序搜索【喜行司机社】打开微信购卡</div>
          <div>下单请填写正确的接单手机号码!</div>
          <div>当日17点后购卡的免佣时间延迟到后天生效!</div>
        </div>
      </div>

      {/* 商品详情 */}
      <div className="bg-white px-4 py-4 mb-3">
        <div className="text-[14px] text-[#1F1F1F] mb-3" style={{ fontWeight: 600 }}>
          商品详情
        </div>
        {/* 详情描述 */}
        <div className="text-[13px] text-[#595959] leading-relaxed mb-4">
          {cardData.description}
        </div>
        {/* 详情图片 */}
        <div className="space-y-2">
          {cardData.detailImages.map((image, index) => (
            <ImageWithFallback
              key={index}
              src={image}
              alt={`详情图${index + 1}`}
              className="w-full rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* 底部立即抢购按钮 */}
      <div className="bottom-action-bar px-4 py-3">
        <button
          onClick={() => onNavigateToOrderConfirm(cardId)}
          className="w-full bg-[#FFC300] text-[#1A1A1A] text-[16px] py-3 rounded-lg active:bg-[#E5B000] active:opacity-80 transition-colors"
          style={{ fontWeight: 600 }}
        >
          立即抢购
        </button>
      </div>

      {/* 服务告知弹窗 */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-5 max-h-[60vh] overflow-y-auto">
            <div className="text-[18px] text-[#1F1F1F] mb-4" style={{ fontWeight: 600 }}>
              服务告知
            </div>
            <div className="text-[14px] text-[#595959] leading-relaxed mb-6">
              {cardData.serviceDetail}
            </div>
            <button
              onClick={() => setShowServiceModal(false)}
              className="w-full bg-[#1677FF] text-white text-[16px] py-3 rounded-lg active:scale-[0.98] transition-transform"
              style={{ fontWeight: 600 }}
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
