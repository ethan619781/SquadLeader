import { ChevronLeft, MoreHorizontal, ChevronRight, BarChart3, Users, Trophy, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TeamLeaderPageProps {
  onNavigateToHome: () => void;
  onNavigateToTaskList: () => void;
  onNavigateToTeamDetail: (teamId: number) => void;
  onNavigateToTeamData: () => void;
  onNavigateToPKList: () => void;
  onNavigateToLevelCenter: () => void;
  onNavigateToTeamChat?: (teamName: string, teamMemberCount: number) => void;
  onShowDeveloping: () => void;
}

export default function TeamLeaderPage({ onNavigateToHome, onNavigateToTaskList, onNavigateToTeamDetail, onNavigateToTeamData, onNavigateToPKList, onNavigateToLevelCenter, onNavigateToTeamChat, onShowDeveloping }: TeamLeaderPageProps) {
  // 模拟数据
  const leaderStats = {
    name: '张队长',
    badge: '顶级喜宝',
    teams: 3,
    totalMembers: 86,
    totalOrders: 2845,
    totalRevenue: 158600
  };

  const latestTask = {
    name: '春节保供战-宣传打卡',
    reward: 50,
    status: '待执行'
  };

  const myTeams = [
    {
      id: 1,
      name: '广州先锋一队',
      currentMembers: 28,
      maxMembers: 30,
      yesterdayOrders: 145,
      yesterdayRevenue: 8650
    },
    {
      id: 2,
      name: '广州先锋二队',
      currentMembers: 30,
      maxMembers: 30,
      yesterdayOrders: 162,
      yesterdayRevenue: 9420
    },
    {
      id: 3,
      name: '广州精英队',
      currentMembers: 28,
      maxMembers: 30,
      yesterdayOrders: 138,
      yesterdayRevenue: 7890
    }
  ];

  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateToHome}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>小队长</span>
        <div className="flex items-center gap-3">
          <MoreHorizontal className="w-5 h-5" onClick={onShowDeveloping} />
        </div>
      </div>

      {/* 主体内容 */}
      <div className="pb-6">
        {/* 1. 顶部个人信息卡片 */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 mx-4 mt-4 rounded-xl p-5 shadow-lg">
          {/* 用户信息 */}
          <div className="flex items-center mb-6">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200"
              alt="用户头像"
              className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
            />
            <div className="ml-3">
              <div className="flex items-center gap-2">
                <span className="text-white text-[18px]" style={{ fontWeight: 600 }}>
                  {leaderStats.name}
                </span>
                <button
                  onClick={onNavigateToLevelCenter}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-[11px] px-2 py-0.5 rounded-full hover:from-yellow-500 hover:to-yellow-700 transition-colors active:scale-95"
                  style={{ fontWeight: 500 }}
                >
                  {leaderStats.badge}
                </button>
              </div>
            </div>
          </div>

          {/* 4列数据展示 */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-white text-[22px] mb-1" style={{ fontWeight: 700 }}>
                {leaderStats.teams}
              </div>
              <div className="text-white/70 text-[11px]">管理小队</div>
            </div>
            <div className="text-center">
              <div className="text-white text-[22px] mb-1" style={{ fontWeight: 700 }}>
                {leaderStats.totalMembers}
              </div>
              <div className="text-white/70 text-[11px]">总人数</div>
            </div>
            <div className="text-center">
              <div className="text-white text-[22px] mb-1" style={{ fontWeight: 700 }}>
                {leaderStats.totalOrders}
              </div>
              <div className="text-white/70 text-[11px]">总单量</div>
            </div>
            <div className="text-center">
              <div className="text-white text-[22px] mb-1" style={{ fontWeight: 700 }}>
                {(leaderStats.totalRevenue / 10000).toFixed(1)}w
              </div>
              <div className="text-white/70 text-[11px]">总流水</div>
            </div>
          </div>
        </div>

        {/* 2. 任务通知卡片 */}
        <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          {/* 标题栏 */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[16px]" style={{ fontWeight: 600 }}>我的任务</span>
            <button 
              onClick={onNavigateToTaskList}
              className="flex items-center gap-1 text-gray-400 text-[13px]"
            >
              查看更多
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 任务内容 */}
          <div className="flex items-center justify-between py-2">
            <div className="flex-1">
              <div className="text-[15px] mb-1" style={{ fontWeight: 500 }}>
                {latestTask.name}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-500 text-[16px]" style={{ fontWeight: 600 }}>
                +{latestTask.reward}元
              </span>
              <span className="bg-blue-50 text-blue-600 text-[12px] px-2 py-1 rounded" style={{ fontWeight: 500 }}>
                {latestTask.status}
              </span>
            </div>
          </div>
        </div>

        {/* 3. 我的小队列表 */}
        <div className="mx-4 mt-5">
          <div className="text-[16px] mb-3 px-1" style={{ fontWeight: 600 }}>
            管理的小队
          </div>

          {/* 小队卡片列表 */}
          <div className="space-y-3">
            {myTeams.map((team) => (
              <div key={team.id} className="bg-white rounded-xl p-4 shadow-sm">
                {/* 顶部：小队名称 + 人数 + 群聊按钮 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[15px]" style={{ fontWeight: 600 }}>
                    {team.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-600 text-[12px] px-2 py-1 rounded" style={{ fontWeight: 500 }}>
                      {team.currentMembers}/{team.maxMembers}人
                    </span>
                    <button 
                      onClick={() => onNavigateToTeamChat?.(team.name, team.currentMembers)}
                      className="flex items-center justify-center gap-1 px-2 py-1 bg-gray-50 rounded text-gray-700 text-[12px] hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span style={{ fontWeight: 500 }}>进入群聊</span>
                    </button>
                  </div>
                </div>

                {/* 中间：核心数据 */}
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <div className="text-gray-500 text-[12px] mb-1">昨日完单</div>
                    <div className="text-[20px]" style={{ fontWeight: 700 }}>
                      {team.yesterdayOrders}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-[12px] mb-1">昨日流水</div>
                    <div className="text-[20px]" style={{ fontWeight: 700 }}>
                      ¥{team.yesterdayRevenue}
                    </div>
                  </div>
                </div>

                {/* 底部：操作按钮 */}
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={onNavigateToTeamData}
                    className="flex items-center justify-center gap-1 py-2 bg-gray-50 rounded-lg text-gray-700 text-[13px] hover:bg-gray-100 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" strokeWidth={1.5} />
                    <span style={{ fontWeight: 500 }}>小队数据</span>
                  </button>
                  <button 
                    onClick={() => onNavigateToTeamDetail(team.id)}
                    className="flex items-center justify-center gap-1 py-2 bg-gray-50 rounded-lg text-gray-700 text-[13px] hover:bg-gray-100 transition-colors"
                  >
                    <Users className="w-4 h-4" strokeWidth={1.5} />
                    <span style={{ fontWeight: 500 }}>小队成员</span>
                  </button>
                  <button 
                    onClick={onNavigateToPKList}
                    className="flex items-center justify-center gap-1 py-2 bg-gray-50 rounded-lg text-gray-700 text-[13px] hover:bg-gray-100 transition-colors"
                  >
                    <Trophy className="w-4 h-4" strokeWidth={1.5} />
                    <span style={{ fontWeight: 500 }}>小队PK</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}