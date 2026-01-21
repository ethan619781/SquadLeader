import { useMemo, useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface BenefitDetailProps {
  onNavigateBack: () => void;
  initialBenefitId?: number;
  currentLevel: number;
}

interface BenefitConfig {
  id: number;
  name: string;
  icon: string;
  desc: string;
  eligibleLevels: number[];
  isLocked: boolean;
}

export default function BenefitDetail({ onNavigateBack, initialBenefitId, currentLevel }: BenefitDetailProps) {

  const benefits: BenefitConfig[] = useMemo(() => {
    const base: Omit<BenefitConfig, 'isLocked'>[] = [
      {
        id: 1,
        name: '专属客服',
        icon: '🎧',
        desc: '7x24小时 VIP 专属热线，专人极速接入，申诉优先处理。',
        eligibleLevels: [1, 2, 3, 4],
      },
      {
        id: 2,
        name: '城市经理',
        icon: '👔',
        desc: '所在城市经理直接对接，提供线下业务指导及纠纷调解服务。',
        eligibleLevels: [1, 2, 3, 4],
      },
      {
        id: 3,
        name: '职业规划',
        icon: '📈',
        desc: '获得平台认证讲师一对一职业辅导，定制晋升与转型路径。',
        eligibleLevels: [2, 3, 4],
      },
      {
        id: 4,
        name: '年度体检',
        icon: '🩺',
        desc: '每年一次公立三甲医院深度体检套餐，关爱您的身体健康。',
        eligibleLevels: [2, 3, 4],
      },
      {
        id: 5,
        name: '社保服务',
        icon: '🛡️',
        desc: '平台协助办理灵活就业社保，并提供专属社保补贴。',
        eligibleLevels: [3, 4],
      },
      {
        id: 6,
        name: '俱乐部会员',
        icon: '👑',
        desc: '获邀加入“喜宝精英俱乐部”，参与高端线下沙龙及行业交流会。',
        eligibleLevels: [3, 4],
      },
      {
        id: 7,
        name: '免拥卡权益',
        icon: '💳',
        desc: '每月赠送免佣卡，跑单收入全归您，让每一滴汗水都值钱。',
        eligibleLevels: [4],
      },
      {
        id: 8,
        name: '年度旅游',
        icon: '✈️',
        desc: '受邀参加年度“喜宝荣耀之旅”，五天四夜豪华团建，费用全包。',
        eligibleLevels: [4],
      },
    ];

    return base.map((item) => {
      const minLevel = Math.min(...item.eligibleLevels);
      const isLocked = currentLevel < minLevel;
      return { ...item, isLocked };
    });
  }, [currentLevel]);

  const initialIndex = useMemo(() => {
    if (!initialBenefitId) return 0;
    const idx = benefits.findIndex((b) => b.id === initialBenefitId);
    return idx === -1 ? 0 : idx;
  }, [benefits, initialBenefitId]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const currentBenefit = benefits[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < benefits.length - 1 ? prev + 1 : prev));
  };

  const allLevels = [1, 2, 3, 4];

  const formatLevels = (levels: number[]) => {
    const sorted = [...levels].sort((a, b) => a - b);
    if (sorted.length === 1) {
      return `Lv.${sorted[0]}`;
    }
    return `Lv.${sorted[0]} - Lv.${sorted[sorted.length - 1]}`;
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateBack}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>权益详情</span>
        <div className="w-6" />
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* 顶部指示：第几个权益 */}
        <div className="flex items-center justify-center mb-3 text-[12px] text-gray-500">
          {currentIndex + 1} / {benefits.length}
        </div>

        {/* 翻页式滑动区域 */}
        <div
          className="relative overflow-hidden rounded-2xl mb-4 max-w-[360px] mx-auto"
          onTouchStart={(e) => {
            if (e.touches.length === 1) {
              setTouchStartX(e.touches[0].clientX);
            }
          }}
          onTouchEnd={(e) => {
            if (touchStartX == null) return;
            const endX = e.changedTouches[0]?.clientX ?? touchStartX;
            const diff = endX - touchStartX;
            const threshold = 40; // 滑动阈值
            if (diff > threshold) {
              // 向右滑，查看上一个
              handlePrev();
            } else if (diff < -threshold) {
              // 向左滑，查看下一个
              handleNext();
            }
            setTouchStartX(null);
          }}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {benefits.map((benefit, index) => (
              <div
                key={benefit.id}
                className="shrink-0 w-full"
              >
                <div
                  className={`bg-white rounded-2xl p-5 shadow-md transition-transform duration-300 ${
                    index === currentIndex ? 'scale-100' : 'scale-95 opacity-70'
                  }`}
                >
                  {/* 图标与锁态 */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        benefit.isLocked ? 'bg-gray-200 text-gray-400' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <span>{benefit.icon}</span>
                      </div>
                      <div>
                        <div className="text-[16px] text-gray-900" style={{ fontWeight: 700 }}>
                          {benefit.name}
                        </div>
                        <div className="text-[12px] text-gray-500 mt-0.5">
                          适用等级：{formatLevels(benefit.eligibleLevels)}
                        </div>
                      </div>
                    </div>
                    {benefit.isLocked && (
                      <span className="px-2 py-1 rounded-full bg-gray-100 text-[11px] text-gray-500" style={{ fontWeight: 500 }}>
                        未解锁
                      </span>
                    )}
                    {!benefit.isLocked && (
                      <span className="px-2 py-1 rounded-full bg-green-50 text-[11px] text-green-600" style={{ fontWeight: 500 }}>
                        已解锁
                      </span>
                    )}
                  </div>

                  {/* 权益说明 */}
                  <div className="mt-1">
                    <div className="text-[14px] text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                      权益说明
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-[13px] text-gray-700 leading-relaxed">
                        {benefit.desc}
                      </div>
                    </div>
                  </div>

                  {/* 权益对象 */}
                  <div className="mt-5">
                    <div className="text-[14px] text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                      权益对象
                    </div>
                    <div className="space-y-2">
                      {allLevels.map((level) => {
                        const enabled = benefit.eligibleLevels.includes(level);
                        const isCurrent = level === currentLevel;
                        return (
                          <div
                            key={level}
                            className="flex items-center gap-3"
                          >
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] ${
                                enabled
                                  ? level === 1
                                    ? 'bg-orange-100 text-orange-600'
                                    : level === 2
                                    ? 'bg-blue-100 text-blue-600'
                                    : level === 3
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : 'bg-purple-100 text-purple-600'
                                  : 'bg-gray-100 text-gray-400'
                              }`}
                            >
                              Lv{level}
                            </div>
                            <div className="flex-1 flex items-baseline justify-between">
                              <span
                                className={`text-[13px] ${
                                  enabled ? 'text-gray-900' : 'text-gray-400'
                                }`}
                                style={{ fontWeight: enabled ? 600 : 400 }}
                              >
                                Lv{level} 等级
                              </span>
                              {isCurrent && (
                                <span className="text-[11px] text-blue-600" style={{ fontWeight: 500 }}>
                                  当前等级
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 当前等级提示 */}
                  <div className="mt-4 text-[12px] text-gray-500">
                    当前等级：Lv.{currentLevel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部左右切换按钮 */}
        <div className="flex items-center justify-between mt-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded-full text-[13px] ${
              currentIndex === 0
                ? 'bg-gray-100 text-gray-400'
                : 'bg-white text-gray-800 shadow-sm active:scale-95 transition-transform'
            }`}
          >
            上一个
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === benefits.length - 1}
            className={`px-4 py-2 rounded-full text-[13px] ${
              currentIndex === benefits.length - 1
                ? 'bg-gray-100 text-gray-400'
                : 'bg-white text-gray-800 shadow-sm active:scale-95 transition-transform'
            }`}
          >
            下一个
          </button>
        </div>
      </div>
    </div>
  );
}

