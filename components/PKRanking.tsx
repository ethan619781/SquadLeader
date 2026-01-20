import { ChevronLeft, Medal, TrendingDown } from 'lucide-react';

interface PKRankingProps {
  eventId: number;
  onNavigateBack: () => void;
  onNavigateToTeamDetail: () => void;
}

interface RankingTeam {
  rank: number;
  teamName: string;
  totalOrders: number;
  gap?: number; // 与上一名的差距
}

export default function PKRanking({ eventId, onNavigateBack, onNavigateToTeamDetail }: PKRankingProps) {
  // 模拟排行榜数据
  const rankings: RankingTeam[] = [
    { rank: 1, teamName: '广州先锋队', totalOrders: 5800 },
    { rank: 2, teamName: '深圳飞虎队', totalOrders: 5620, gap: 180 },
    { rank: 3, teamName: '东莞精英队', totalOrders: 5450, gap: 170 },
    { rank: 4, teamName: '佛山战狼队', totalOrders: 5280, gap: 170 },
    { rank: 5, teamName: '珠海猛虎队', totalOrders: 5150, gap: 130 },
    { rank: 6, teamName: '中山勇士队', totalOrders: 4980, gap: 170 },
    { rank: 7, teamName: '江门铁军队', totalOrders: 4820, gap: 160 },
    { rank: 8, teamName: '惠州雄鹰队', totalOrders: 4680, gap: 140 },
    { rank: 9, teamName: '肇庆龙腾队', totalOrders: 4550, gap: 130 },
    { rank: 10, teamName: '清远奋进队', totalOrders: 4420, gap: 130 },
    { rank: 11, teamName: '韶关拼搏队', totalOrders: 4290, gap: 130 },
    { rank: 12, teamName: '汕头冲锋队', totalOrders: 4160, gap: 130 },
    { rank: 13, teamName: '汕尾突击队', totalOrders: 4050, gap: 110 },
    { rank: 14, teamName: '湛江奋斗队', totalOrders: 3920, gap: 130 },
    { rank: 15, teamName: '茂名飞虎队', totalOrders: 3800, gap: 120 }
  ];

  // 我的战队数据（假设是第15名）
  const myTeam = {
    rank: 15,
    teamName: '茂名飞虎队',
    totalOrders: 3800
  };

  // 获取奖牌图标
  const getMedalIcon = (rank: number) => {
    if (rank === 1) {
      return <Medal className="w-6 h-6 text-yellow-500" fill="#EAB308" />;
    } else if (rank === 2) {
      return <Medal className="w-6 h-6 text-gray-400" fill="#9CA3AF" />;
    } else if (rank === 3) {
      return <Medal className="w-6 h-6 text-orange-500" fill="#F97316" />;
    }
    return null;
  };

  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5] page-content-with-bottom-action">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateBack}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>实时排名</span>
        <div className="w-6" />
      </div>

      {/* 1. 顶部概览 */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-4 py-6">
        {/* 右上角更新时间 */}
        <div className="flex justify-end mb-4">
          <div className="bg-white/20 text-white text-[11px] px-2 py-1 rounded">
            数据更新至昨日 24:00
          </div>
        </div>

        {/* 状态和倒计时 */}
        <div className="text-center">
          <div className="text-white text-[24px] mb-2" style={{ fontWeight: 700 }}>
            比赛进行中
          </div>
          <div className="text-white/80 text-[14px]">
            距离比赛结束还剩 <span className="text-white text-[18px]" style={{ fontWeight: 700 }}>3</span> 天
          </div>
        </div>
      </div>

      {/* 2. 排行榜列表 */}
      <div className="mx-4 mt-4 bg-white rounded-xl shadow-sm overflow-hidden">
        {/* 表头 */}
        <div className="grid grid-cols-[60px_1fr_100px] gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="text-gray-500 text-[13px]" style={{ fontWeight: 600 }}>排名</div>
          <div className="text-gray-500 text-[13px]" style={{ fontWeight: 600 }}>战队名称</div>
          <div className="text-gray-500 text-[13px] text-right" style={{ fontWeight: 600 }}>累计单量</div>
        </div>

        {/* 排名列表 */}
        <div>
          {rankings.map((team, index) => (
            <div
              key={team.rank}
              className={`grid grid-cols-[60px_1fr_100px] gap-2 px-4 py-4 ${
                index !== rankings.length - 1 ? 'border-b border-gray-100' : ''
              } ${team.rank === myTeam.rank ? 'bg-blue-50' : ''}`}
            >
              {/* 左侧：排名 */}
              <div className="flex items-center">
                {team.rank <= 3 ? (
                  getMedalIcon(team.rank)
                ) : (
                  <span className="text-gray-400 text-[16px]" style={{ fontWeight: 600 }}>
                    {team.rank}
                  </span>
                )}
              </div>

              {/* 中间：战队名称 + 差距提示 */}
              <div>
                <div className={`text-[15px] mb-1 ${team.rank <= 3 ? 'text-gray-900' : 'text-gray-700'}`} style={{ fontWeight: team.rank <= 3 ? 600 : 500 }}>
                  {team.teamName}
                  {team.rank === myTeam.rank && (
                    <span className="ml-2 text-[11px] bg-blue-500 text-white px-1.5 py-0.5 rounded">我的</span>
                  )}
                </div>
                {team.gap && (
                  <div className="flex items-center gap-1 text-red-500 text-[11px]">
                    <TrendingDown className="w-3 h-3" />
                    <span>距上一名差 {team.gap} 单</span>
                  </div>
                )}
              </div>

              {/* 右侧：单量 */}
              <div className="text-right">
                <div className={`text-[16px] ${team.rank === 1 ? 'text-red-500' : 'text-gray-900'}`} style={{ fontWeight: team.rank === 1 ? 700 : 600 }}>
                  {team.totalOrders}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-6" />

      {/* 3. 底部悬浮栏 - 我的战队 */}
      <div className="bottom-action-bar" style={{ borderTop: '2px solid #1890FF' }}>
        <div className="w-full px-4 py-4">
          <div className="flex items-center justify-between">
            {/* 左侧：我的排名 */}
            <div className="flex items-center gap-4">
              <div>
                <div className="text-gray-500 text-[11px] mb-1">我的排名</div>
                <div className="text-[20px] text-[#1890FF]" style={{ fontWeight: 700 }}>
                  {myTeam.rank}
                </div>
              </div>
              {/* 累计单量 */}
              <div>
                <div className="text-gray-500 text-[11px] mb-1">累计单量</div>
                <div className="text-[20px] text-gray-900" style={{ fontWeight: 700 }}>
                  {myTeam.totalOrders}
                </div>
              </div>
            </div>

            {/* 右侧：查看详情按钮 */}
            <button
              onClick={onNavigateToTeamDetail}
              className="px-4 py-2 border-2 border-[#1890FF] text-[#1890FF] rounded-lg text-[14px] hover:bg-blue-50 transition-colors"
              style={{ fontWeight: 600 }}
            >
              查看详情 &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
