import { useState } from 'react';
import { ChevronLeft, Trophy, Award, Gift } from 'lucide-react';

interface PKEventDetailProps {
  eventId: number;
  onNavigateBack: () => void;
  onNavigateToRanking: (eventId: number) => void;
  onShowDeveloping: () => void;
}

export default function PKEventDetail({ eventId, onNavigateBack, onNavigateToRanking, onShowDeveloping }: PKEventDetailProps) {
  // 模拟报名状态：'未报名' | '已报名' | 'PK中' | '已结束'
  const [registrationStatus, setRegistrationStatus] = useState<'未报名' | '已报名' | 'PK中' | '已结束'>('未报名');
  const [registeredTeams] = useState(58);

  // 模拟赛事数据
  const eventData = {
    id: eventId,
    title: '春节保供战·城市争霸赛',
    region: '广州赛区',
    metric: '比拼总完单量',
    registrationPeriod: '2026.01.18 - 01.20',
    competitionPeriod: '2026.01.21 - 01.27',
    announcementDate: '2026.01.28'
  };

  const handleRegister = () => {
    if (registrationStatus === '未报名') {
      setRegistrationStatus('已报名');
      const toast = document.createElement('div');
      toast.textContent = '报名成功！';
      toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 9999;
        font-size: 14px;
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 2000);
    } else if (registrationStatus === 'PK中') {
      onNavigateToRanking(eventId);
    }
  };

  // 当前进度步骤（1: 报名期, 2: 比赛期, 3: 公示期）
  const currentStep = registrationStatus === '未报名' || registrationStatus === '已报名' ? 1 : registrationStatus === 'PK中' ? 2 : 3;

  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5] page-content-with-bottom-action">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateBack}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>赛事详情</span>
        <div className="w-6" />
      </div>

      {/* 1. 顶部氛围头图 */}
      <div className="relative h-[180px] overflow-hidden bg-gradient-to-br from-red-500 to-red-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-4" strokeWidth={1.5} />
            <h1 className="text-white text-[22px] mb-2" style={{ fontWeight: 700 }}>
              {eventData.title}
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/90 text-[14px]">
              <span>{eventData.region}</span>
              <span>|</span>
              <span>{eventData.metric}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 赛事时间轴 */}
      <div className="mx-4 mt-4 bg-white rounded-xl p-5 shadow-sm">
        <h2 className="text-[16px] mb-4" style={{ fontWeight: 600 }}>赛事进程</h2>
        
        {/* 步骤条 */}
        <div className="relative">
          {/* 连接线 */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />
          
          <div className="relative flex items-start justify-between">
            {/* 步骤1：报名期 */}
            <div className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 1 ? 'bg-[#1890FF]' : 'bg-gray-200'
              }`}>
                {currentStep > 1 ? (
                  <span className="text-white text-[16px]">✓</span>
                ) : (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <div className="text-center">
                <div className={`text-[13px] mb-1 ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-400'}`} style={{ fontWeight: 600 }}>
                  报名期
                </div>
                <div className="text-gray-400 text-[11px]">
                  {eventData.registrationPeriod}
                </div>
              </div>
            </div>

            {/* 步骤2：比赛期 */}
            <div className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 2 ? 'bg-[#1890FF]' : 'bg-gray-200'
              }`}>
                {currentStep > 2 ? (
                  <span className="text-white text-[16px]">✓</span>
                ) : (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <div className="text-center">
                <div className={`text-[13px] mb-1 ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`} style={{ fontWeight: 600 }}>
                  比赛期
                </div>
                <div className="text-gray-400 text-[11px]">
                  {eventData.competitionPeriod}
                </div>
              </div>
            </div>

            {/* 步骤3：公示期 */}
            <div className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 3 ? 'bg-[#1890FF]' : 'bg-gray-200'
              }`}>
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
              <div className="text-center">
                <div className={`text-[13px] mb-1 ${currentStep >= 3 ? 'text-gray-900' : 'text-gray-400'}`} style={{ fontWeight: 600 }}>
                  公示期
                </div>
                <div className="text-gray-400 text-[11px]">
                  {eventData.announcementDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 赛事奖励区 */}
      <div className="mx-4 mt-4 bg-white rounded-xl p-5 shadow-sm">
        <h2 className="text-[16px] mb-4" style={{ fontWeight: 600 }}>赛事奖励</h2>
        
        <div className="grid grid-cols-3 gap-3">
          {/* 冠军 */}
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-yellow-500" strokeWidth={2} />
            </div>
            <div className="text-[12px] text-gray-500 mb-1">冠军</div>
            <div className="text-[14px] text-gray-900" style={{ fontWeight: 700 }}>
              ¥1000
            </div>
            <div className="text-[11px] text-gray-500">现金</div>
          </div>

          {/* 亚军 */}
          <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <Award className="w-10 h-10 text-gray-500" strokeWidth={2} />
            </div>
            <div className="text-[12px] text-gray-500 mb-1">亚军</div>
            <div className="text-[14px] text-gray-900" style={{ fontWeight: 700 }}>
              ¥500
            </div>
            <div className="text-[11px] text-gray-500">油卡</div>
          </div>

          {/* 季军 */}
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <Gift className="w-10 h-10 text-orange-500" strokeWidth={2} />
            </div>
            <div className="text-[12px] text-gray-500 mb-1">季军</div>
            <div className="text-[14px] text-gray-900" style={{ fontWeight: 700 }}>
              ¥200
            </div>
            <div className="text-[11px] text-gray-500">物资</div>
          </div>
        </div>
      </div>

      {/* 4. 报名状态区 */}
      {(registrationStatus === '未报名' || registrationStatus === '已报名') && (
        <div className="mx-4 mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-[14px]">
              当前已报名 <span className="text-[#1890FF] text-[18px]" style={{ fontWeight: 700 }}>{registeredTeams}</span> 支战队
            </span>
          </div>
        </div>
      )}

      {/* 底部固定按钮 */}
      <div className="bottom-action-bar">
        <div className="w-full px-4 py-4">
          {registrationStatus === '未报名' && (
            <button
              onClick={handleRegister}
              className="w-full py-3 rounded-lg text-[16px] bg-red-500 hover:bg-red-600 text-white transition-colors shadow-md"
              style={{ fontWeight: 600 }}
            >
              立即报名参赛
            </button>
          )}
          
          {registrationStatus === '已报名' && (
            <div>
              <div className="text-center text-gray-500 text-[13px] mb-3">
                比赛将于 {eventData.competitionPeriod.split(' - ')[0]} 正式开始
              </div>
              <button
                className="w-full py-3 rounded-lg text-[16px] bg-gray-400 text-white cursor-not-allowed"
                style={{ fontWeight: 600 }}
                disabled
              >
                已报名，等待开赛
              </button>
            </div>
          )}

          {registrationStatus === 'PK中' && (
            <button
              onClick={handleRegister}
              className="w-full py-3 rounded-lg text-[16px] bg-red-500 hover:bg-red-600 text-white transition-colors shadow-md"
              style={{ fontWeight: 600 }}
            >
              查看实时排名
            </button>
          )}

          {registrationStatus === '已结束' && (
            <button
              onClick={onShowDeveloping}
              className="w-full py-3 rounded-lg text-[16px] bg-gray-400 text-white"
              style={{ fontWeight: 600 }}
            >
              赛事已结束
            </button>
          )}
        </div>
      </div>

      {/* 演示切换按钮 */}
      <div className="fixed top-20 right-4 z-20">
        <div className="bg-white rounded-lg shadow-lg p-2 text-[11px]">
          <div className="text-gray-500 mb-1 px-1">演示状态切换</div>
          <div className="space-y-1">
            {(['未报名', '已报名', 'PK中', '已结束'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setRegistrationStatus(status)}
                className={`w-full px-2 py-1 rounded text-[11px] ${
                  registrationStatus === status
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
