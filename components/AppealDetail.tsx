import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import exampleImage from 'figma:asset/5fe3bdd2a69c2de98dd13dbc0b21eca7e1b2352d.png';

interface AppealDetailProps {
  appealId: number;
  onNavigateBack: () => void;
  onShowDeveloping: () => void;
}

export default function AppealDetail({ appealId, onNavigateBack, onShowDeveloping }: AppealDetailProps) {
  // 模拟数据
  const appealData = {
    id: appealId,
    brand: '喜行约车',
    city: '杭州市',
    orderPhone: '13095619781',
    callbackPhone: '13095619781',
    plateNumber: '--',
    submitTime: '2025-12-29 11:12:32',
    status: appealId === 4 ? '已完结' : '处理中',
    subStatus: appealId === 1 ? '待补充证据' : undefined,
    result: appealId === 4 ? '审核通过' : undefined,
    type: '其他',
    description: '订单取消被罚款问题申诉',
    images: [],
    processRecords: [
      {
        id: 1,
        title: '分配客服',
        time: '2025-12-29 11:12:32',
        content: '处理说明：系统自动分配【微+】'
      },
      {
        id: 2,
        title: '创建工单',
        time: '2025-12-29 11:12:32',
        content: '处理说明：创建工单成功'
      }
    ]
  };

  const handleCancelAppeal = () => {
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div style="
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 24px;
      ">
        <div style="
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 320px;
          padding: 24px;
        ">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">提示</div>
            <div style="font-size: 14px; color: #666; line-height: 1.5;">确认撤销此申诉吗？</div>
          </div>
          <div style="display: flex; gap: 12px;">
            <button id="cancel-btn" style="
              flex: 1;
              padding: 12px;
              border-radius: 24px;
              border: 1px solid #ddd;
              background: white;
              font-size: 15px;
              color: #333;
            ">取消</button>
            <button id="confirm-btn" style="
              flex: 1;
              padding: 12px;
              border-radius: 24px;
              border: none;
              background: #ef4444;
              color: white;
              font-size: 15px;
              font-weight: 500;
            ">确认撤销</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const cancelBtn = modal.querySelector('#cancel-btn');
    const confirmBtn = modal.querySelector('#confirm-btn');
    
    cancelBtn?.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    confirmBtn?.addEventListener('click', () => {
      document.body.removeChild(modal);
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
        onNavigateBack();
      }, 1500);
    });
  };

  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5] page-content-with-bottom-action">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateBack}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>申诉详情</span>
        <div className="flex items-center gap-3">
          <MoreHorizontal className="w-5 h-5" onClick={onShowDeveloping} />
          <div className="w-6 h-6 border-2 border-black rounded-full" onClick={onShowDeveloping} />
        </div>
      </div>

      {/* 基础信息 */}
      <div className="mx-4 mt-4 bg-[#FFFEF0] rounded-2xl p-4 border border-yellow-200 relative overflow-hidden">
        {/* 审核通过圆戳 - 打在基础信息卡片上 */}
        {appealData.result === '审核通过' && (
          <div 
            className="absolute top-4 right-4 w-[70px] h-[70px] rounded-full border-[3px] border-green-500 flex items-center justify-center transform rotate-12 z-10"
            style={{
              background: 'rgba(34, 197, 94, 0.08)'
            }}
          >
            <div className="text-center">
              <div className="text-green-600 text-[13px]" style={{ fontWeight: 700 }}>
                申诉
              </div>
              <div className="text-green-600 text-[13px]" style={{ fontWeight: 700 }}>
                通过
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-[16px]" style={{ fontWeight: 600 }}>基础信息</span>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[13px] text-blue-500">{appealData.status}</span>
            {appealData.subStatus && (
              <span className="text-[12px] text-orange-500">{appealData.subStatus}</span>
            )}
            {appealData.result && (
              <span className="text-[12px] text-green-500">{appealData.result}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[13px]">
          <div>
            <div className="text-gray-500 mb-1">品牌</div>
            <div className="text-gray-900">{appealData.brand}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">城市</div>
            <div className="text-gray-900">{appealData.city}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">接单手机号</div>
            <div className="text-gray-900">{appealData.orderPhone}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">回访手机号</div>
            <div className="text-gray-900">{appealData.callbackPhone}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">车牌号</div>
            <div className="text-gray-900">{appealData.plateNumber}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">提交时间</div>
            <div className="text-gray-900">{appealData.submitTime}</div>
          </div>
        </div>
      </div>

      {/* 处理记录 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4">
        <div className="text-[16px] mb-4" style={{ fontWeight: 600 }}>处理记录</div>
        
        <div className="space-y-4">
          {appealData.processRecords.map((record, index) => (
            <div key={record.id} className="relative pl-6">
              {/* 时间线 */}
              <div className="absolute left-0 top-1">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                {index < appealData.processRecords.length - 1 && (
                  <div className="absolute left-[5px] top-4 w-0.5 h-12 bg-orange-300" />
                )}
              </div>
              
              {/* 内容 */}
              <div>
                <div className="text-[15px] mb-1" style={{ fontWeight: 500 }}>{record.title}</div>
                <div className="text-[13px] text-gray-500 mb-1">{record.time}</div>
                <div className="text-[13px] text-gray-600 bg-gray-50 p-2 rounded">
                  {record.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 申诉信息 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4">
        <div className="text-[16px] mb-4" style={{ fontWeight: 600 }}>申诉信息</div>
        
        <div className="space-y-3">
          <div className="flex text-[13px]">
            <span className="text-gray-500 w-20">申诉需求</span>
            <span className="flex-1 text-gray-900">{appealData.type}</span>
          </div>
          <div className="flex text-[13px]">
            <span className="text-gray-500 w-20">问题描述</span>
            <span className="flex-1 text-gray-900">{appealData.description}</span>
          </div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="bottom-action-bar">
        <div className="px-4 py-4">
          <div className="w-full flex gap-3">
            <button
              onClick={handleCancelAppeal}
              className="flex-1 py-3 rounded-full border border-gray-300 text-[15px] text-gray-700"
            >
              撤销申诉
            </button>
            <button
              onClick={onShowDeveloping}
              className="flex-1 py-3 rounded-full bg-[#FFE500] text-[15px]"
              style={{ fontWeight: 500 }}
            >
              补充证据
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}