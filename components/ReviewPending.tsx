import { Clock } from 'lucide-react';

interface ReviewPendingProps {
  onNavigateToHome: () => void;
}

export default function ReviewPending({ onNavigateToHome }: ReviewPendingProps) {
  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5]">
      {/* 演示按钮区域 - 顶部测试用 */}
      <div className="bg-yellow-50 border-b border-yellow-200 p-3">
        <div className="text-[12px] text-yellow-700 mb-2 text-center" style={{ fontWeight: 500 }}>
          演示测试按钮
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('team-status', { detail: 'approved' }))}
            className="flex-1 py-2 bg-green-500 text-white rounded-lg text-[13px]"
            style={{ fontWeight: 500 }}
          >
            审核通过
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('team-status', { detail: 'rejected' }))}
            className="flex-1 py-2 bg-red-500 text-white rounded-lg text-[13px]"
            style={{ fontWeight: 500 }}
          >
            审核驳回
          </button>
        </div>
      </div>

      {/* 主体内容 */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
        {/* 中心插画 */}
        <div className="mb-8">
          <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center">
            <Clock className="w-16 h-16 text-blue-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* 标题 */}
        <h1 className="text-[22px] mb-3 text-center" style={{ fontWeight: 600 }}>
          申请正在审核中
        </h1>

        {/* 副标题 */}
        <p className="text-[14px] text-gray-500 text-center leading-relaxed mb-12 px-4">
          城市经理将在 1-3 个工作日内完成审核，请保持电话畅通。
        </p>

        {/* 返回首页按钮 */}
        <button
          onClick={onNavigateToHome}
          className="w-full max-w-[280px] py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg text-[16px] hover:bg-gray-50 transition-colors"
          style={{ fontWeight: 500 }}
        >
          返回首页
        </button>
      </div>
    </div>
  );
}