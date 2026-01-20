import { useState } from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';

interface AppealListProps {
  onNavigateToHome: () => void;
  onNavigateToDetail: (appealId: number) => void;
  onShowDeveloping: () => void;
  tab?: string;
}

type TabType = '全部' | '处理中' | '已完结';
type StatusType = '处理中' | '已完结' | '已撤销';

interface AppealItem {
  id: number;
  type: string;
  city: string;
  plateNumber: string;
  orderNumber: string;
  submitTime: string;
  status: StatusType;
  subStatus?: string;
  result?: '审核通过' | '审核不通过';
}

export default function AppealList({ onNavigateToHome, onNavigateToDetail, onShowDeveloping, tab }: AppealListProps) {
  const [activeTab, setActiveTab] = useState<TabType>((tab as TabType) || '全部');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppealId, setSelectedAppealId] = useState<number | null>(null);

  // 模拟数据
  const allAppeals: AppealItem[] = [
    {
      id: 1,
      type: '取消订单申诉',
      city: '浙江省/杭州市',
      plateNumber: '浙A12345',
      orderNumber: '20251229001',
      submitTime: '2025-12-29 11:12:32',
      status: '处理中',
      subStatus: '待补充证据'
    },
    {
      id: 2,
      type: '服务费用申诉',
      city: '浙江省/杭州市',
      plateNumber: '浙A67890',
      orderNumber: '20251228002',
      submitTime: '2025-12-28 10:30:15',
      status: '处理中'
    },
    {
      id: 3,
      type: '罚款申诉',
      city: '浙江省/杭州市',
      plateNumber: '浙A11111',
      orderNumber: '20251227003',
      submitTime: '2025-12-27 14:20:00',
      status: '已完结'
    },
    {
      id: 4,
      type: '违规申诉',
      city: '浙江省/杭州市',
      plateNumber: '浙A22222',
      orderNumber: '20251226004',
      submitTime: '2025-12-26 09:15:00',
      status: '已完结',
      result: '审核通过'
    }
  ];

  const getFilteredAppeals = () => {
    if (activeTab === '全部') return allAppeals;
    return allAppeals.filter(appeal => appeal.status === activeTab);
  };

  const filteredAppeals = getFilteredAppeals();

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case '处理中':
        return 'text-blue-500';
      case '已完结':
        return 'text-gray-500';
      case '已撤销':
        return 'text-gray-400';
      default:
        return 'text-gray-500';
    }
  };

  const handleCancelAppeal = (appealId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAppealId(appealId);
    setShowCancelModal(true);
  };

  const confirmCancelAppeal = () => {
    // 这里处理撤销逻辑
    const toast = document.createElement('div');
    toast.textContent = '申诉已撤销';
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
    
    setShowCancelModal(false);
    setSelectedAppealId(null);
  };

  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateToHome}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>申诉中心</span>
        <div className="flex items-center gap-3">
          <MoreHorizontal className="w-5 h-5" onClick={onShowDeveloping} />
          <div className="w-6 h-6 border-2 border-black rounded-full" onClick={onShowDeveloping} />
        </div>
      </div>

      {/* Tab栏 */}
      <div className="bg-white border-b border-gray-200 sticky top-[57px] z-10">
        <div className="flex">
          {(['全部', '处理中', '已完结'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-[15px] relative ${
                activeTab === tab ? 'text-gray-900' : 'text-gray-500'
              }`}
              style={{ fontWeight: activeTab === tab ? 600 : 400 }}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#FFE500]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 列表内容 */}
      <div className="p-4 space-y-3">
        {filteredAppeals.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-[14px]">暂无申诉记录</div>
          </div>
        ) : (
          filteredAppeals.map((appeal) => (
            <div
              key={appeal.id}
              className="bg-white rounded-lg p-4 relative"
              onClick={() => onNavigateToDetail(appeal.id)}
            >
              {/* 审核通过圆戳 - 列表页小尺寸 */}
              {appeal.status === '已完结' && appeal.result === '审核通过' && (
                <div 
                  className="absolute top-3 right-3 w-[60px] h-[60px] rounded-full border-[3px] border-green-500 flex items-center justify-center transform rotate-12"
                  style={{
                    background: 'rgba(34, 197, 94, 0.05)'
                  }}
                >
                  <div className="text-center">
                    <div className="text-green-600 text-[12px]" style={{ fontWeight: 700 }}>
                      申诉
                    </div>
                    <div className="text-green-600 text-[12px]" style={{ fontWeight: 700 }}>
                      通过
                    </div>
                  </div>
                </div>
              )}

              {/* 标题和状态 */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 text-[15px]" style={{ fontWeight: 500 }}>
                  喜行出行-"{appeal.type}"-申诉
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className={`text-[13px] ${getStatusColor(appeal.status)}`}>
                    {appeal.status}
                  </div>
                  {appeal.subStatus && (
                    <div className="text-[12px] text-orange-500">
                      {appeal.subStatus}
                    </div>
                  )}
                </div>
              </div>

              {/* 详细信息 */}
              <div className="space-y-2 text-[13px] text-gray-600 mb-3">
                <div className="flex">
                  <span className="w-16">城市</span>
                  <span className="flex-1">{appeal.city}</span>
                </div>
                <div className="flex">
                  <span className="w-16">车牌号</span>
                  <span className="flex-1">{appeal.plateNumber}</span>
                </div>
                <div className="flex">
                  <span className="w-16">订单号</span>
                  <span className="flex-1">{appeal.orderNumber}</span>
                </div>
                <div className="flex">
                  <span className="w-16">提交时间</span>
                  <span className="flex-1">{appeal.submitTime}</span>
                </div>
              </div>

              {/* 底部按钮 */}
              <div className="pt-3 border-t border-gray-100 flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToDetail(appeal.id);
                  }}
                  className="flex-1 py-2 rounded-full border border-gray-300 text-[14px] text-gray-700"
                >
                  查看详情
                </button>
                {appeal.subStatus === '待补充证据' ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowDeveloping();
                      }}
                      className="flex-1 py-2 rounded-full bg-[#FFE500] text-[14px] text-gray-900"
                    >
                      补充证据
                    </button>
                    <button
                      onClick={(e) => handleCancelAppeal(appeal.id, e)}
                      className="flex-1 py-2 rounded-full border border-red-500 text-[14px] text-red-500"
                    >
                      撤销申诉
                    </button>
                  </>
                ) : appeal.status === '处理中' ? (
                  <button
                    onClick={(e) => handleCancelAppeal(appeal.id, e)}
                    className="flex-1 py-2 rounded-full border border-red-500 text-[14px] text-red-500"
                  >
                    撤销申诉
                  </button>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 撤销确认弹窗 */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl w-full max-w-[320px] p-6">
            <div className="text-center mb-6">
              <div className="text-[18px] mb-4" style={{ fontWeight: 600 }}>
                提示
              </div>
              <div className="text-[14px] text-gray-600 leading-relaxed">
                确认撤销此申诉吗？
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 rounded-full border border-gray-300 text-[15px] text-gray-700"
              >
                消
              </button>
              <button
                onClick={confirmCancelAppeal}
                className="flex-1 py-3 rounded-full bg-red-500 text-white text-[15px]"
                style={{ fontWeight: 500 }}
              >
                确认撤销
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}