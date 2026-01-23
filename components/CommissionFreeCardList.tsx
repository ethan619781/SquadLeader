import { useState, useMemo } from 'react';
import { ChevronDown, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CommissionFreeCardListProps {
  onNavigateBack: () => void;
  onNavigateToDetail: (cardId: number) => void;
  onNavigateToHome?: () => void;
  onNavigateToTeamRecruitment?: () => void;
  onNavigateToMyPage?: () => void;
  onShowDeveloping?: () => void;
}

interface CardProduct {
  id: number;
  name: string;
  city: string;
  price: number;
  originalPrice?: number;
  sales: number;
  image: string;
  description: string;
  duration: string;
}

export default function CommissionFreeCardList({
  onNavigateBack,
  onNavigateToDetail,
  onNavigateToHome,
  onNavigateToTeamRecruitment,
  onNavigateToMyPage,
  onShowDeveloping
}: CommissionFreeCardListProps) {
  const [currentCity, setCurrentCity] = useState('杭州');
  const [sortType, setSortType] = useState<'comprehensive' | 'sales' | 'price'>('comprehensive');
  const [showCitySelector, setShowCitySelector] = useState(false);

  // Mock 数据 - 不同城市的免拥卡
  const allCards: CardProduct[] = [
    {
      id: 1,
      name: '喜行约车杭州1天免佣卡 所有渠道0抽佣',
      city: '杭州',
      price: 89,
      originalPrice: 101,
      sales: 1466,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      description: '单单免 1 天',
      duration: '1天'
    },
    {
      id: 2,
      name: '喜行约车杭州3天免佣卡 所有渠道0抽佣',
      city: '杭州',
      price: 239,
      originalPrice: 299,
      sales: 892,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      description: '单单免 3 天',
      duration: '3天'
    },
    {
      id: 3,
      name: '喜行约车北京1天免佣卡 所有渠道0抽佣',
      city: '北京',
      price: 99,
      originalPrice: 119,
      sales: 1234,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      description: '单单免 1 天',
      duration: '1天'
    },
    {
      id: 4,
      name: '喜行约车北京7天免佣卡 所有渠道0抽佣',
      city: '北京',
      price: 599,
      originalPrice: 699,
      sales: 567,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      description: '单单免 7 天',
      duration: '7天'
    },
    {
      id: 5,
      name: '喜行约车上海1天免佣卡 所有渠道0抽佣',
      city: '上海',
      price: 95,
      originalPrice: 110,
      sales: 987,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      description: '单单免 1 天',
      duration: '1天'
    },
    {
      id: 6,
      name: '喜行约车上海30天免佣卡 所有渠道0抽佣',
      city: '上海',
      price: 2499,
      originalPrice: 2999,
      sales: 234,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      description: '单单免 30 天',
      duration: '30天'
    }
  ];

  const cities = ['杭州', '北京', '上海', '广州', '深圳'];

  // 根据当前城市筛选
  const cityFilteredCards = useMemo(() => {
    return allCards.filter(card => card.city === currentCity);
  }, [currentCity]);

  // 排序
  const sortedCards = useMemo(() => {
    const cards = [...cityFilteredCards];
    switch (sortType) {
      case 'sales':
        return cards.sort((a, b) => b.sales - a.sales);
      case 'price':
        return cards.sort((a, b) => a.price - b.price);
      case 'comprehensive':
      default:
        return cards;
    }
  }, [cityFilteredCards, sortType]);

  return (
    <div className="w-full min-h-screen bg-[#F4F4F4] page-content-with-bottom-bar">
      {/* 顶部导航栏 */}
      <div className="bg-[#FFC300] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-1" onClick={() => setShowCitySelector(!showCitySelector)}>
          <span className="text-[18px] text-[#1A1A1A]" style={{ fontWeight: 600 }}>{currentCity}</span>
          <ChevronDown className="w-4 h-4 text-[#1A1A1A]" />
        </div>
        <div className="flex items-center gap-3">
          <MoreHorizontal className="w-5 h-5 text-[#1A1A1A]" />
          <div className="w-6 h-6 border-2 border-[#1A1A1A] rounded-full" />
        </div>
      </div>

      {/* 城市选择器 */}
      {showCitySelector && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => {
                  setCurrentCity(city);
                  setShowCitySelector(false);
                }}
                className={`px-4 py-2 rounded-full text-[14px] transition-colors active:opacity-80 ${
                  currentCity === city
                    ? 'bg-[#FFC300] text-[#1A1A1A]'
                    : 'bg-white text-[#333333]'
                }`}
                style={{ fontWeight: currentCity === city ? 600 : 400 }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 排序栏 */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-6 -mt-4">
        <button
          onClick={() => setSortType('comprehensive')}
          className={`flex items-center gap-1 text-[14px] active:opacity-80 ${
            sortType === 'comprehensive' ? 'text-[#FFC300]' : 'text-[#333333]'
          }`}
          style={{ fontWeight: sortType === 'comprehensive' ? 600 : 400 }}
        >
          综合
        </button>
        <button
          onClick={() => setSortType('sales')}
          className={`flex items-center gap-1 text-[14px] active:opacity-80 ${
            sortType === 'sales' ? 'text-[#FFC300]' : 'text-[#333333]'
          }`}
          style={{ fontWeight: sortType === 'sales' ? 600 : 400 }}
        >
          销量
          <ArrowUpDown className="w-3 h-3" />
        </button>
        <button
          onClick={() => setSortType('price')}
          className={`flex items-center gap-1 text-[14px] active:opacity-80 ${
            sortType === 'price' ? 'text-[#FFC300]' : 'text-[#333333]'
          }`}
          style={{ fontWeight: sortType === 'price' ? 600 : 400 }}
        >
          价格
          <ArrowUpDown className="w-3 h-3" />
        </button>
      </div>

      {/* 商品列表 */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {sortedCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onNavigateToDetail(card.id)}
              className="bg-white rounded-[12px] overflow-hidden active:scale-[0.98] transition-transform cursor-pointer"
            >
              {/* 商品图片区域 */}
              <div className="relative bg-gradient-to-br from-green-50 to-green-100 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-green-700" style={{ fontWeight: 500 }}>
                    喜行约车
                  </span>
                </div>
                <div className="flex items-center justify-center h-20 mb-1">
                  <div className="text-3xl">🚗</div>
                </div>
                <div className="text-center">
                  <div className="text-[13px] text-green-700 mb-0.5" style={{ fontWeight: 700 }}>
                    单单免佣卡优惠
                  </div>
                  <div className="text-[10px] text-[#FFC300] mb-1" style={{ fontWeight: 600 }}>{card.city}</div>
                  <div className="text-[12px] text-green-700 mb-1" style={{ fontWeight: 600 }}>
                    {card.description}
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-[11px] text-green-600">售价</span>
                    <span className="text-[16px] text-[#FF4A26]" style={{ fontWeight: 700 }}>
                      {card.price}
                    </span>
                    <span className="text-[11px] text-green-600">元</span>
                  </div>
                  <div className="text-[9px] text-gray-500 mt-1">
                    当日17点后购买的订单后天生效开始免佣
                  </div>
                </div>
              </div>

              {/* 商品信息 */}
              <div className="p-3 bg-white">
                <div className="text-[14px] text-[#333333] mb-2 line-clamp-2" style={{ fontWeight: 400 }}>
                  {card.name}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[16px] text-[#FF4A26]" style={{ fontWeight: 700 }}>
                    ¥ {card.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateToDetail(card.id);
                    }}
                    className="px-3 py-1.5 bg-[#FFC300] text-[#1A1A1A] text-[12px] rounded-lg active:bg-[#E5B000] active:opacity-80 transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    立即抢购
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedCards.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-[14px]">
            当前城市暂无免拥卡商品
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="bottom-navigation-bar">
        <div className="w-full grid grid-cols-4 h-[60px]">
          <button
            className="flex flex-col items-center justify-center gap-1"
            onClick={() => {
              if (onNavigateToHome) {
                onNavigateToHome();
              } else if (onShowDeveloping) {
                onShowDeveloping();
              }
            }}
          >
            <div className="w-6 h-6 bg-gray-300 rounded-lg" />
            <span className="text-[11px] text-gray-500">首页</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <div className="w-6 h-6 bg-[#FFC300] rounded-lg" />
            <span className="text-[11px] text-[#1A1A1A]" style={{ fontWeight: 600 }}>免佣卡</span>
          </button>
          <button
            className="flex flex-col items-center justify-center gap-1"
            onClick={() => {
              if (onNavigateToTeamRecruitment) {
                onNavigateToTeamRecruitment();
              } else if (onShowDeveloping) {
                onShowDeveloping();
              }
            }}
          >
            <div className="w-6 h-6 bg-gray-300 rounded-lg" />
            <span className="text-[11px] text-gray-500">小队</span>
          </button>
          <button
            className="flex flex-col items-center justify-center gap-1"
            onClick={() => {
              if (onNavigateToMyPage) {
                onNavigateToMyPage();
              } else if (onShowDeveloping) {
                onShowDeveloping();
              }
            }}
          >
            <div className="w-6 h-6 bg-gray-300 rounded-lg" />
            <span className="text-[11px] text-gray-500">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}
