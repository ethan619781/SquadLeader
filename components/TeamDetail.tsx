import { ChevronLeft, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TeamDetailProps {
  teamId: number;
  onNavigateBack: () => void;
  onNavigateToTeamData: () => void;
  onShowDeveloping: () => void;
}

interface TeamMember {
  id: number;
  name: string;
  phone: string;
  avatar: string;
  status: '正常' | '待激活' | '封禁';
  /** 末次完单时间，格式：yyyy-MM-dd HH:mm */
  lastOrderTime: string;
  /** 最后出车时间，格式：yyyy-MM-dd HH:mm */
  lastOnlineTime: string;
  isLeader: boolean;
}

export default function TeamDetail({ teamId, onNavigateBack, onNavigateToTeamData, onShowDeveloping }: TeamDetailProps) {
  // 模拟小队数据
  const teamData = {
    id: teamId,
    name: '广州先锋一队',
    teamId: 'XD8888',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
    leaderName: '张队长',
    memberCount: 25,
    yesterdayOrders: 145,
    ordersGrowth: 12.5,
    yesterdayRevenue: 8650,
    revenueGrowth: 8.3
  };

  // 模拟成员列表
  const members: TeamMember[] = [
    {
      id: 1,
      name: '张队长',
      phone: '138****0001',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      status: '正常',
      lastOrderTime: '2026-01-18 23:15',
      lastOnlineTime: '2026-01-19 07:30',
      isLeader: true
    },
    {
      id: 2,
      name: '李师傅',
      phone: '139****0002',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      status: '正常',
      lastOrderTime: '2026-01-18 22:40',
      lastOnlineTime: '2026-01-19 06:50',
      isLeader: false
    },
    {
      id: 3,
      name: '王师傅',
      phone: '136****0003',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      status: '正常',
      lastOrderTime: '2026-01-18 21:05',
      lastOnlineTime: '2026-01-18 23:10',
      isLeader: false
    },
    {
      id: 4,
      name: '赵师傅',
      phone: '137****0004',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      status: '待激活',
      lastOrderTime: '2026-01-15 19:20',
      lastOnlineTime: '2026-01-16 08:10',
      isLeader: false
    },
    {
      id: 5,
      name: '刘师傅',
      phone: '135****0005',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      status: '正常',
      lastOrderTime: '2026-01-17 20:45',
      lastOnlineTime: '2026-01-18 09:30',
      isLeader: false
    },
    {
      id: 6,
      name: '陈师傅',
      phone: '133****0006',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      status: '封禁',
      lastOrderTime: '2025-11-27 18:20',
      lastOnlineTime: '2025-11-27 22:05',
      isLeader: false
    }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '正常':
        return 'bg-green-50 text-green-600';
      case '待激活':
        return 'bg-orange-50 text-orange-600';
      case '封禁':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-gray-100 text-gray-500';
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
        <span className="text-[17px]" style={{ fontWeight: 600 }}>小队详情</span>
        <div className="w-6" />
      </div>

      {/* 主体内容 */}
      <div className="p-4 pb-6">
        {/* 1. 小队基本信息卡片 */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
          {/* 小队Logo和名称 */}
          <div className="flex items-start gap-4 mb-4">
            <ImageWithFallback
              src={teamData.logo}
              alt="小队Logo"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="text-[18px] mb-2" style={{ fontWeight: 700 }}>
                {teamData.name}
              </div>
              <div className="text-gray-400 text-[13px]">
                小队ID：{teamData.teamId}
              </div>
            </div>
          </div>

          {/* 队长和人数信息 */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
            <div>
              <div className="text-gray-500 text-[13px] mb-1">队长</div>
              <div className="text-[15px]" style={{ fontWeight: 600 }}>
                {teamData.leaderName}
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-[13px] mb-1">队员人数</div>
              <div className="text-[15px]" style={{ fontWeight: 600 }}>
                {teamData.memberCount}人
              </div>
            </div>
          </div>
        </div>

        {/* 2. 团队数据概览 */}
        <div className="mb-4">
          {/* 合并后的数据卡片 */}
          <div 
            className="bg-white rounded-xl p-5 shadow-sm active:bg-gray-50 transition-colors"
            onClick={onNavigateToTeamData}
          >
            <div className="text-gray-500 text-[13px] mb-4">团队数据概览</div>
            <div className="grid grid-cols-2 gap-6">
              {/* 昨日总完单 */}
              <div>
                <div className="text-gray-400 text-[12px] mb-2">昨日总完单</div>
                <div className="text-[28px] mb-2" style={{ fontWeight: 700 }}>
                  {teamData.yesterdayOrders}
                </div>
                <div className="flex items-center gap-1 text-green-500 text-[12px]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>环比 +{teamData.ordersGrowth}%</span>
                </div>
              </div>

              {/* 昨日总流水 */}
              <div>
                <div className="text-gray-400 text-[12px] mb-2">昨日总流水</div>
                <div className="text-[28px] mb-2" style={{ fontWeight: 700 }}>
                  ¥{teamData.yesterdayRevenue}
                </div>
                <div className="flex items-center gap-1 text-green-500 text-[12px]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>环比 +{teamData.revenueGrowth}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 团队成员列表 */}
        <div>
          <div className="text-[16px] mb-3 px-1" style={{ fontWeight: 600 }}>
            成员列表
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            {members.map((member, index) => (
              <div 
                key={member.id}
                className={`flex items-center justify-between p-4 ${
                  index !== members.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                onClick={onShowDeveloping}
              >
                {/* 左侧：头像 + 信息 */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative">
                    <ImageWithFallback
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {member.isLeader && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-[10px]">👑</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[15px] mb-1" style={{ fontWeight: 500 }}>
                      <span>{member.name}</span>
                      {member.isLeader && (
                        <span className="px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-[10px]" style={{ fontWeight: 600 }}>
                          队长
                        </span>
                      )}
                    </div>
                    <div className="text-gray-400 text-[12px]">
                      {member.phone}
                    </div>
                  </div>
                </div>

                {/* 右侧：状态 + 时间 */}
                <div className="text-right">
                  <span 
                    className={`inline-block text-[11px] px-2 py-1 rounded mb-1 ${getStatusStyle(member.status)}`}
                    style={{ fontWeight: 500 }}
                  >
                    {member.status}
                  </span>
                  <div className="text-gray-400 text-[11px]">
                    末次完单：{member.lastOrderTime}
                  </div>
                  <div className="text-gray-400 text-[11px]">
                    最后出车：{member.lastOnlineTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}