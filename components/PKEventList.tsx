import { useState } from 'react';
import { ChevronLeft, Clock, Flame } from 'lucide-react';

interface PKEventListProps {
  onNavigateBack: () => void;
  onNavigateToEventDetail: (eventId: number) => void;
}

interface PKEvent {
  id: number;
  title: string;
  status: '报名中' | 'PK进行中' | '已结束';
  registrationPeriod: string;
  pkPeriod: string;
}

export default function PKEventList({ onNavigateBack, onNavigateToEventDetail }: PKEventListProps) {
  const [activeTab, setActiveTab] = useState<'全部' | '报名中' | 'PK中' | '已结束'>('报名中');

  // 模拟赛事数据
  const allEvents: PKEvent[] = [
    {
      id: 1,
      title: '春节保供战·城市争霸赛',
      status: '报名中',
      registrationPeriod: '2026.01.18 - 01.20',
      pkPeriod: '2026.01.21 - 01.27'
    },
    {
      id: 2,
      title: '元宵节冲单挑战赛',
      status: '报名中',
      registrationPeriod: '2026.02.01 - 02.03',
      pkPeriod: '2026.02.04 - 02.10'
    },
    {
      id: 3,
      title: '周末王者争霸赛',
      status: 'PK进行中',
      registrationPeriod: '2026.01.10 - 01.12',
      pkPeriod: '2026.01.13 - 01.19'
    },
    {
      id: 4,
      title: '新春开门红挑战',
      status: 'PK进行中',
      registrationPeriod: '2026.01.08 - 01.10',
      pkPeriod: '2026.01.11 - 01.17'
    },
    {
      id: 5,
      title: '跨年冲单大赛',
      status: '已结束',
      registrationPeriod: '2025.12.25 - 12.27',
      pkPeriod: '2025.12.28 - 2026.01.03'
    },
    {
      id: 6,
      title: '圣诞节特别赛',
      status: '已结束',
      registrationPeriod: '2025.12.18 - 12.20',
      pkPeriod: '2025.12.21 - 12.27'
    }
  ];

  // 根据Tab筛选赛事
  const filteredEvents = allEvents.filter(event => {
    if (activeTab === '全部') return true;
    if (activeTab === '报名中') return event.status === '报名中';
    if (activeTab === 'PK中') return event.status === 'PK进行中';
    if (activeTab === '已结束') return event.status === '已结束';
    return true;
  });

  // 状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '报名中':
        return {
          bg: 'bg-blue-500',
          text: 'text-white',
          borderColor: 'border-l-blue-500'
        };
      case 'PK进行中':
        return {
          bg: 'bg-red-500',
          text: 'text-white',
          borderColor: 'border-l-red-500'
        };
      case '已结束':
        return {
          bg: 'bg-gray-400',
          text: 'text-white',
          borderColor: 'border-l-gray-400'
        };
      default:
        return {
          bg: 'bg-gray-400',
          text: 'text-white',
          borderColor: 'border-l-gray-400'
        };
    }
  };

  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateBack}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>小队PK赛</span>
        <div className="w-6" />
      </div>

      {/* Tab 切换栏 */}
      <div className="bg-white sticky top-[52px] z-10 shadow-sm">
        <div className="flex items-center">
          {(['全部', '报名中', 'PK中', '已结束'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 relative"
            >
              <span 
                className={`text-[15px] ${
                  activeTab === tab ? 'text-[#1890FF]' : 'text-gray-600'
                }`}
                style={{ fontWeight: activeTab === tab ? 600 : 500 }}
              >
                {tab}
              </span>
              {activeTab === tab && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#1890FF] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 赛事列表 */}
      <div className="p-4 space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-[14px]">暂无赛事</div>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const statusStyle = getStatusStyle(event.status);
            return (
              <div
                key={event.id}
                onClick={() => onNavigateToEventDetail(event.id)}
                className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 ${statusStyle.borderColor} active:bg-gray-50 transition-colors`}
              >
                <div className="p-4">
                  {/* 标题区 */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 pr-3">
                      <h3 className="text-[16px] text-gray-900" style={{ fontWeight: 700 }}>
                        {event.title}
                      </h3>
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text} flex-shrink-0`}>
                      {event.status === 'PK进行中' && (
                        <Flame className="w-3.5 h-3.5" />
                      )}
                      <span className="text-[12px]" style={{ fontWeight: 600 }}>
                        {event.status}
                      </span>
                    </div>
                  </div>

                  {/* 时间信息区 */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-500 text-[13px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>报名：{event.registrationPeriod}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>PK期：{event.pkPeriod}</span>
                    </div>
                  </div>

                  {/* 分割线 */}
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-end">
                      <span className="text-[#1890FF] text-[14px]" style={{ fontWeight: 500 }}>
                        查看详情 &gt;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
