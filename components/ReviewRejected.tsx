import { XCircle } from 'lucide-react';

interface ReviewRejectedProps {
  onNavigateToApplication: () => void;
}

export default function ReviewRejected({ onNavigateToApplication }: ReviewRejectedProps) {
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
          <div className="w-32 h-32 rounded-full bg-red-50 flex items-center justify-center">
            <XCircle className="w-16 h-16 text-red-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* 标题 */}
        <h1 className="text-[22px] mb-6 text-center" style={{ fontWeight: 600 }}>
          很遗憾，申请未通过
        </h1>

        {/* 原因提示框 */}
        <div className="w-full bg-red-50 border border-red-200 rounded-xl p-4 mb-12">
          <p className="text-[14px] text-red-700 leading-relaxed">
            <span style={{ fontWeight: 600 }}>原因：</span>服务分低于 95 分，暂不符合准入标准。
          </p>
        </div>

        {/* 再次申请按钮 */}
        <button
          onClick={onNavigateToApplication}
          className="w-full max-w-[280px] py-3 bg-blue-500 text-white rounded-lg text-[16px] hover:bg-blue-600 transition-colors shadow-sm"
          style={{ fontWeight: 600 }}
        >
          再次申请
        </button>
      </div>
    </div>
  );
}