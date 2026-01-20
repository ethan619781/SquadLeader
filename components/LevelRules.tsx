import { ChevronLeft, Medal, Award, Trophy, Crown } from 'lucide-react';

interface LevelRulesProps {
  onNavigateBack: () => void;
}

interface RuleLevel {
  level: number;
  name: string;
  icon: JSX.Element;
  description: string;
  color: string;
  bgColor: string;
}

export default function LevelRules({ onNavigateBack }: LevelRulesProps) {
  const ruleLevels: RuleLevel[] = [
    {
      level: 1,
      name: '初级喜宝',
      icon: <Medal className="w-8 h-8" strokeWidth={2} />,
      description: '完成小队长实名认证，绑定喜行司机端账号。',
      color: 'text-orange-600',
      bgColor: 'bg-orange-500'
    },
    {
      level: 2,
      name: '中级喜宝',
      icon: <Award className="w-8 h-8" strokeWidth={2} />,
      description: '成功组建 1 个 30 人小队，且活跃率达标。',
      color: 'text-gray-600',
      bgColor: 'bg-gray-500'
    },
    {
      level: 3,
      name: '高级喜宝',
      icon: <Trophy className="w-8 h-8" strokeWidth={2} />,
      description: '组建 2 个小队，月流水达到 10 万元。',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-500'
    },
    {
      level: 4,
      name: '顶级喜宝',
      icon: <Crown className="w-8 h-8" strokeWidth={2} />,
      description: '组建 3 个小队，年度流水进入全国前 100 名。',
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="w-full w-full min-h-screen bg-white">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateBack}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>等级规则</span>
        <div className="w-6" />
      </div>

      {/* 页面内容 */}
      <div className="px-5 py-6">
        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-[24px] text-gray-900 mb-2" style={{ fontWeight: 700 }}>
            喜宝计划晋升规则
          </h1>
          <p className="text-gray-500 text-[14px]">
            完成相应条件即可晋升等级，解锁更多专属权益
          </p>
        </div>

        {/* 规则列表 - 垂直时间轴 */}
        <div className="relative">
          {/* 连接线 */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-orange-300 via-gray-300 via-yellow-300 to-purple-300" />

          {/* 等级节点 */}
          <div className="space-y-8">
            {ruleLevels.map((rule, index) => (
              <div key={rule.level} className="relative flex items-start gap-4">
                {/* 图标节点 */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-12 h-12 ${rule.bgColor} rounded-full flex items-center justify-center text-white shadow-lg`}>
                    {rule.icon}
                  </div>
                  {/* 等级标签 */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-100">
                    <span className={`text-[11px] ${rule.color}`} style={{ fontWeight: 700 }}>
                      {rule.level}
                    </span>
                  </div>
                </div>

                {/* 内容区 */}
                <div className="flex-1 bg-gray-50 rounded-xl p-4 shadow-sm">
                  <h3 className={`text-[17px] mb-2 ${rule.color}`} style={{ fontWeight: 700 }}>
                    {rule.name}
                  </h3>
                  <p className="text-gray-700 text-[14px] leading-relaxed">
                    {rule.description}
                  </p>

                  {/* 解锁权益数量提示 */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-gray-500 text-[12px]">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <span>可解锁 {rule.level * 2} 项专属权益</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部说明 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-5 border border-blue-100">
          <h3 className="text-blue-900 text-[15px] mb-3" style={{ fontWeight: 600 }}>
            等级说明
          </h3>
          <ul className="space-y-2 text-blue-800 text-[13px]">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>等级每月1日结算一次，根据上月数据进行调整</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>活跃率 = 月活跃司机数 / 小队总人数，需达到 60% 以上</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>流水数据以平台实际结算为准</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>等级权益即时生效，降级后权益同步调整</span>
            </li>
          </ul>
        </div>

        {/* 联系客服 */}
        <div className="mt-6 text-center">
          <div className="text-gray-400 text-[13px] mb-2">
            有疑问？
          </div>
          <button className="text-blue-500 text-[14px]" style={{ fontWeight: 600 }}>
            联系专属客服 &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
