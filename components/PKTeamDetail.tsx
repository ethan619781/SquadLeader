import { ChevronLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PKTeamDetailProps {
  onNavigateBack: () => void;
}

interface TeamMember {
  id: number;
  rank: number;
  name: string;
  avatar: string;
  orders: number;
  isLeader: boolean;
}

export default function PKTeamDetail({ onNavigateBack }: PKTeamDetailProps) {
  // 模拟小队数据
  const teamData = {
    teamName: '飞虎队',
    currentRank: 15,
    totalOrders: 3800,
    memberCount: 30,
    avgOrders: 126.7
  };

  // 模拟队员数据
  const members: TeamMember[] = [
    {
      id: 1,
      rank: 1,
      name: '张队长',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      orders: 285,
      isLeader: true
    },
    {
      id: 2,
      rank: 2,
      name: '李师傅',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      orders: 268,
      isLeader: false
    },
    {
      id: 3,
      rank: 3,
      name: '王师傅',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      orders: 245,
      isLeader: false
    },
    {
      id: 4,
      rank: 4,
      name: '赵师傅',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      orders: 230,
      isLeader: false
    },
    {
      id: 5,
      rank: 5,
      name: '刘师傅',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      orders: 215,
      isLeader: false
    },
    {
      id: 6,
      rank: 6,
      name: '陈师傅',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      orders: 198,
      isLeader: false
    },
    {
      id: 7,
      rank: 7,
      name: '周师傅',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      orders: 182,
      isLeader: false
    },
    {
      id: 8,
      rank: 8,
      name: '吴师傅',
      avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      orders: 165,
      isLeader: false
    },
    {
      id: 9,
      rank: 9,
      name: '郑师傅',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      orders: 148,
      isLeader: false
    },
    {
      id: 10,
      rank: 10,
      name: '孙师傅',
      avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8bWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY4NjM0Njc1fDA&ixlib=rb-4.1.0&q=80&w=200',
      orders: 28,
      isLeader: false
    },
    {
      id: 11,
      rank: 11,
      name: '马师傅',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2ODYzNDY3NXww&ixlib=rb-4.1.0&q=80&w=200',
      orders: 15,
      isLeader: false
    },
    {
      id: 12,
      rank: 12,
      name: '林师傅',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2ODYzNDY3NXww&ixlib=rb-4.1.0&q=80&w=200',
      orders: 0,
      isLeader: false
    }
  ];

  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5] pb-6">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateBack}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>小队数据详情</span>
        <div className="w-6" />
      </div>

      {/* 1. 顶部小队概览卡片 */}
      <div className="mx-4 mt-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-5 shadow-lg text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-[20px] mb-1" style={{ fontWeight: 700 }}>
              {teamData.teamName}
            </h2>
            <div className="text-white/80 text-[13px]">
              队员 {teamData.memberCount} 人
            </div>
          </div>
          <div className="bg-white/20 px-3 py-1.5 rounded-lg">
            <div className="text-white/80 text-[11px] mb-0.5">当前排名</div>
            <div className="text-[18px] text-center" style={{ fontWeight: 700 }}>
              No.{teamData.currentRank}
            </div>
          </div>
        </div>

        {/* 数据统计 */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
          <div>
            <div className="text-white/70 text-[12px] mb-1">小队总单量</div>
            <div className="text-[28px]" style={{ fontWeight: 700 }}>
              {teamData.totalOrders}
            </div>
          </div>
          <div>
            <div className="text-white/70 text-[12px] mb-1">人均单量</div>
            <div className="text-[28px]" style={{ fontWeight: 700 }}>
              {teamData.avgOrders}
            </div>
          </div>
        </div>
      </div>

      {/* 2. 队员贡献榜 */}
      <div className="mx-4 mt-4">
        <h3 className="text-[16px] mb-3 px-1" style={{ fontWeight: 600 }}>
          队员贡献排名
        </h3>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* 表头 */}
          <div className="grid grid-cols-[50px_1fr_80px] gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
            <div className="text-gray-500 text-[13px]" style={{ fontWeight: 600 }}>排名</div>
            <div className="text-gray-500 text-[13px]" style={{ fontWeight: 600 }}>队员</div>
            <div className="text-gray-500 text-[13px] text-right" style={{ fontWeight: 600 }}>贡献单量</div>
          </div>

          {/* 队员列表 */}
          {members.map((member, index) => (
            <div
              key={member.id}
              className={`grid grid-cols-[50px_1fr_80px] gap-2 px-4 py-3 ${
                index !== members.length - 1 ? 'border-b border-gray-100' : ''
              } ${member.isLeader ? 'bg-blue-50' : ''}`}
            >
              {/* 排名 */}
              <div className="flex items-center">
                <span className={`text-[16px] ${
                  member.rank <= 3 ? 'text-[#1890FF]' : 'text-gray-400'
                }`} style={{ fontWeight: member.rank <= 3 ? 700 : 600 }}>
                  {member.rank}
                </span>
              </div>

              {/* 队员信息 */}
              <div className="flex items-center gap-2">
                <ImageWithFallback
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] text-gray-900" style={{ fontWeight: 500 }}>
                      {member.name}
                    </span>
                    {member.isLeader && (
                      <span className="bg-[#1890FF] text-white text-[10px] px-1.5 py-0.5 rounded" style={{ fontWeight: 600 }}>
                        队长
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 贡献单量 */}
              <div className="flex items-center justify-end">
                <span className={`text-[16px] ${
                  member.orders === 0 ? 'text-red-500' : member.orders < 50 ? 'text-orange-500' : 'text-gray-900'
                }`} style={{ fontWeight: 700 }}>
                  {member.orders}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 提示信息 */}
      <div className="mx-4 mt-3 bg-yellow-50 border border-yellow-100 rounded-lg p-3">
        <div className="text-yellow-800 text-[12px]">
          <span style={{ fontWeight: 600 }}>💡 提示：</span>
          贡献单量低于50单的队员将标记为橙色，0单队员标记为红色
        </div>
      </div>
    </div>
  );
}
