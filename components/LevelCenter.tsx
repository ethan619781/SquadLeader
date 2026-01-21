import { useState } from 'react';
import { ChevronLeft, ChevronRight, Lock, Headphones, User, TrendingUp, Heart, Shield, Crown, CreditCard, Plane, ChevronRight as ChevronRightIcon } from 'lucide-react';

interface LevelCenterProps {
  onNavigateBack: () => void;
  onNavigateToRules: () => void;
  onShowDeveloping: () => void;
  onNavigateToGrowthDetail?: () => void;
}

interface LevelCard {
  level: number;
  name: string;
  unlocked: boolean;
  currentValue: number;
  targetValue: number;
  requirement: string;
  color: string;
  badgeColor: string;
  benefits: number;
}

interface Benefit {
  id: number;
  icon: JSX.Element;
  label: string;
  unlocked: boolean;
}

// 用户当前状态
interface CurrentUser {
  level: number;
  levelName: string;
  currentScore: number;
  nextThreshold: number;
  validUntil: string;
  isMaxLevel: boolean;
}

export default function LevelCenter({ onNavigateBack, onNavigateToRules, onShowDeveloping, onNavigateToGrowthDetail }: LevelCenterProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(2); // 默认显示Lv.3当前等级

  // 用户当前状态数据
  const currentUser: CurrentUser = {
    level: 3,
    levelName: "顶级喜宝",
    currentScore: 2500,
    nextThreshold: 5000,
    validUntil: "2026.04.01",
    isMaxLevel: false
  };

  // 等级卡片数据
  const levelCards: LevelCard[] = [
    {
      level: 1,
      name: '初级喜宝',
      unlocked: true,
      currentValue: 100,
      targetValue: 100,
      requirement: '',
      color: 'from-orange-400 to-orange-600',
      badgeColor: 'text-orange-500',
      benefits: 2
    },
    {
      level: 2,
      name: '中级喜宝',
      unlocked: true,
      currentValue: 500,
      targetValue: 500,
      requirement: '',
      color: 'from-gray-400 to-gray-600',
      badgeColor: 'text-gray-500',
      benefits: 4
    },
    {
      level: 3,
      name: '高级喜宝',
      unlocked: true,
      currentValue: currentUser.currentScore,
      targetValue: currentUser.nextThreshold,
      requirement: '当前等级',
      color: 'from-yellow-400 to-yellow-600',
      badgeColor: 'text-yellow-500',
      benefits: 6
    },
    {
      level: 4,
      name: '顶级喜宝',
      unlocked: false,
      currentValue: currentUser.currentScore,
      targetValue: currentUser.nextThreshold,
      requirement: '成长值满5000可升级',
      color: 'from-purple-400 via-pink-500 to-red-500',
      badgeColor: 'text-purple-500',
      benefits: 8
    }
  ];

  const currentCard = levelCards[currentCardIndex];

  // 权益数据
  const benefits: Benefit[] = [
    {
      id: 1,
      icon: <Headphones className="w-6 h-6" />,
      label: '专属客服',
      unlocked: currentCardIndex >= 0
    },
    {
      id: 2,
      icon: <User className="w-6 h-6" />,
      label: '城市经理',
      unlocked: currentCardIndex >= 0
    },
    {
      id: 3,
      icon: <TrendingUp className="w-6 h-6" />,
      label: '职业规划',
      unlocked: currentCardIndex >= 1
    },
    {
      id: 4,
      icon: <Heart className="w-6 h-6" />,
      label: '年度体检',
      unlocked: currentCardIndex >= 1
    },
    {
      id: 5,
      icon: <Shield className="w-6 h-6" />,
      label: '社保服务',
      unlocked: currentCardIndex >= 2
    },
    {
      id: 6,
      icon: <Crown className="w-6 h-6" />,
      label: '俱乐部会员',
      unlocked: currentCardIndex >= 2
    },
    {
      id: 7,
      icon: <CreditCard className="w-6 h-6" />,
      label: '免拥卡权益',
      unlocked: currentCardIndex >= 3
    },
    {
      id: 8,
      icon: <Plane className="w-6 h-6" />,
      label: '年度旅游',
      unlocked: currentCardIndex >= 3
    }
  ];

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex < levelCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  return (
    <div className="w-full w-full min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl" />
      </div>

      {/* 顶部导航栏 - 透明背景 */}
      <div className="relative px-4 py-3 flex items-center justify-between z-10">
        <ChevronLeft 
          className="w-6 h-6 text-white" 
          onClick={onNavigateBack}
        />
        <span className="text-[17px] text-white" style={{ fontWeight: 600 }}>成长等级</span>
        <button
          onClick={onNavigateToRules}
          className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-[13px] rounded-full border border-white/30"
          style={{ fontWeight: 500 }}
        >
          规则
        </button>
      </div>

      {/* 等级卡片轮播区 */}
      <div className="relative px-4 pt-6 pb-8">
        <div className="relative">
          {/* 卡片容器 */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
            >
              {levelCards.map((card, index) => (
                <div
                  key={card.level}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 ${
                    card.unlocked ? 'border-yellow-400/50' : 'border-white/30'
                  } shadow-2xl min-h-[280px]`}>
                    {/* 发光效果 */}
                    {card.unlocked && index === currentCardIndex && (
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-2xl" />
                    )}

                    <div className="relative">
                      {/* 顶部：标题 + 徽章 */}
                      <div className="flex items-start justify-between mb-4">
                        {/* 等级标题 */}
                        <div>
                          <div className={`text-[32px] mb-2 bg-gradient-to-r ${card.color} bg-clip-text text-transparent transform -rotate-3`} style={{ fontWeight: 900 }}>
                            Lv.{card.level}
                          </div>
                          <div className="text-white text-[20px] mb-1" style={{ fontWeight: 700 }}>
                            {card.name}
                          </div>
                          <div className={`text-[13px] ${card.unlocked ? 'text-green-300' : 'text-red-300'}`} style={{ fontWeight: 500 }}>
                            {card.unlocked ? '已解锁' : '未解锁'}
                          </div>
                        </div>

                        {/* 右侧徽章 */}
                        <div className="ml-4 flex-shrink-0">
                          <div className="relative w-24 h-24">
                            {/* 发光圆环 */}
                            {card.unlocked && (
                              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-full blur-xl opacity-50 animate-pulse`} />
                            )}
                            {/* 徽章 */}
                            <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center shadow-2xl border-4 border-white/30`}>
                              <Crown className={`w-12 h-12 ${card.unlocked ? 'text-white' : 'text-white/30'}`} strokeWidth={2.5} />
                              {!card.unlocked && (
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                                  <Lock className="w-8 h-8 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 底部：进度信息 / 当前成长值信息（整卡片通栏） */}
                      <div className="space-y-2">
                        {card.level === currentUser.level ? (
                          <div
                            className="bg-white/10 rounded-xl px-4 py-3 cursor-pointer active:scale-[0.98] transition-transform w-full"
                            onClick={onNavigateToGrowthDetail}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[13px] text-white/80" style={{ fontWeight: 500 }}>
                                当前成长值
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNavigateToGrowthDetail?.();
                                }}
                                className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[11px] text-white/90 leading-none active:scale-95 transition-transform"
                                style={{ fontWeight: 500 }}
                              >
                                成长值明细
                              </button>
                            </div>
                            <div className="flex items-baseline gap-2 mb-1.5">
                              <span className="text-[22px] text-white" style={{ fontWeight: 700 }}>
                                {currentUser.currentScore.toLocaleString()}
                              </span>
                              {!currentUser.isMaxLevel && (
                                <>
                                  <span className="text-[13px] text-white/70">/</span>
                                  <span className="text-[16px] text-white/80" style={{ fontWeight: 500 }}>
                                    {currentUser.nextThreshold.toLocaleString()}
                                  </span>
                                </>
                              )}
                            </div>
                            {!currentUser.isMaxLevel && (
                              <div className="flex items-center justify-between mt-1">
                                <div className="flex-1 bg-white/20 rounded-full h-1.5 overflow-hidden mr-2">
                                  <div
                                    className="h-full bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 transition-all duration-500"
                                    style={{ width: `${(currentUser.currentScore / currentUser.nextThreshold) * 100}%` }}
                                  />
                                </div>
                                <span className="text-[11px] text-white/80">
                                  还需 {currentUser.nextThreshold - currentUser.currentScore} 成长值升级
                                </span>
                              </div>
                            )}
                            <div className="mt-2 flex items-center justify-between text-[11px] text-white/70">
                              <span>等级有效期</span>
                              <span style={{ fontWeight: 500 }}>{currentUser.validUntil}</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            {card.requirement && (
                              <div className="text-white/90 text-[13px] leading-relaxed">
                                {card.requirement}
                              </div>
                            )}
                            {!card.unlocked && card.requirement && (
                              <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
                                  style={{ width: `${card.targetValue ? (card.currentValue / card.targetValue) * 100 : 0}%` }}
                                />
                              </div>
                            )}
                            {!card.unlocked && card.requirement && (
                              <div className="text-white/70 text-[11px]">
                                {card.currentValue} / {card.targetValue}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 左右切换按钮 */}
          {currentCardIndex > 0 && (
            <button
              onClick={handlePrevCard}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {currentCardIndex < levelCards.length - 1 && (
            <button
              onClick={handleNextCard}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 指示器 */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {levelCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCardIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentCardIndex 
                  ? 'w-6 bg-white' 
                  : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 权益信息区 - 白色圆角容器 */}
      <div className="relative bg-white rounded-t-3xl px-5 pt-5 pb-8 shadow-2xl flex-1">
        {/* 标题栏 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] text-gray-900" style={{ fontWeight: 700 }}>
            Lv.{currentCard.level} 解锁 {currentCard.benefits} 项权益
          </h2>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        {/* 权益宫格 */}
        <div className="grid grid-cols-4 gap-4">
          {benefits.map((benefit) => (
            <button
              key={benefit.id}
              onClick={benefit.unlocked ? onShowDeveloping : undefined}
              className="flex flex-col items-center gap-2"
            >
              <div className={`relative w-14 h-14 rounded-full flex items-center justify-center ${
                benefit.unlocked 
                  ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
                  : 'bg-gray-200'
              }`}>
                <div className={benefit.unlocked ? 'text-white' : 'text-gray-400'}>
                  {benefit.icon}
                </div>
                {!benefit.unlocked && (
                  <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <span className={`text-[11px] text-center ${
                benefit.unlocked ? 'text-gray-700' : 'text-gray-400'
              }`} style={{ fontWeight: 500 }}>
                {benefit.label}
              </span>
            </button>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4">
          <div className="text-blue-900 text-[13px] leading-relaxed">
            <span style={{ fontWeight: 600 }}>💡 提示：</span>
            持续提升等级可解锁更多专属权益，成为平台顶级合伙人
          </div>
        </div>
      </div>
    </div>
  );
}
