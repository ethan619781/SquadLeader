import { AlertCircle, TrendingDown, TrendingUp, Copy, FileText, X } from 'lucide-react';

interface DiagnosticModalProps {
  onClose: () => void;
}

export default function DiagnosticModal({ onClose }: DiagnosticModalProps) {
  // 模拟诊断数据
  const diagnosticData = {
    conclusion: '昨日流水环比下跌 15%，主要因出勤率不足导致。',
    isWarning: true,
    dimensions: [
      {
        name: '出勤人数',
        change: '减少 5 人',
        trend: 'down' as const,
        color: 'text-red-500'
      },
      {
        name: '人均时长',
        change: '持平',
        trend: 'neutral' as const,
        color: 'text-gray-900'
      },
      {
        name: '人均完单',
        change: '上涨 2%',
        trend: 'up' as const,
        color: 'text-green-500'
      }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* 半透明遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* 底部弹出面板 */}
      <div className="relative w-full w-full bg-white rounded-t-3xl pb-safe animate-slide-up">
        {/* 顶部把手 */}
        <div className="pt-2 pb-3 flex justify-center">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* 标题栏 */}
        <div className="px-5 pb-4 flex items-center justify-between">
          <h2 className="text-[18px] text-gray-900" style={{ fontWeight: 700 }}>
            数据智能诊断
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="px-5 pb-6">
          {/* 1. 诊断结论区 */}
          <div className={`rounded-xl p-4 mb-5 ${
            diagnosticData.isWarning ? 'bg-red-50' : 'bg-green-50'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                diagnosticData.isWarning ? 'bg-red-100' : 'bg-green-100'
              }`}>
                <AlertCircle className={`w-5 h-5 ${
                  diagnosticData.isWarning ? 'text-red-500' : 'text-green-500'
                }`} />
              </div>
              <div className="flex-1">
                <div className={`text-[13px] mb-1 ${
                  diagnosticData.isWarning ? 'text-red-900' : 'text-green-900'
                }`} style={{ fontWeight: 600 }}>
                  诊断结果
                </div>
                <div className={`text-[14px] leading-relaxed ${
                  diagnosticData.isWarning ? 'text-red-800' : 'text-green-800'
                }`}>
                  {diagnosticData.conclusion}
                </div>
              </div>
            </div>
          </div>

          {/* 2. 归因分析维度 */}
          <div className="mb-5">
            <h3 className="text-[16px] text-gray-900 mb-3" style={{ fontWeight: 600 }}>
              异常维度分析
            </h3>
            
            <div className="space-y-3">
              {diagnosticData.dimensions.map((dimension, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-[15px] text-gray-700" style={{ fontWeight: 500 }}>
                      {dimension.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[15px] ${dimension.color}`} style={{ fontWeight: 600 }}>
                      {dimension.change}
                    </span>
                    {dimension.trend === 'down' && (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                    {dimension.trend === 'up' && (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    )}
                    {dimension.trend === 'neutral' && (
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div className="w-3 h-0.5 bg-gray-400 rounded" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 建议行动区 */}
          <div>
            <h3 className="text-[16px] text-gray-900 mb-3" style={{ fontWeight: 600 }}>
              建议方案
            </h3>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 space-y-2">
              <p className="text-[13px] text-blue-900 leading-relaxed">
                1）优先唤醒最近 3 天未出车但历史表现稳定的司机，可通过一对一话术+任务激励方式，集中提升出勤率。
              </p>
              <p className="text-[13px] text-blue-900 leading-relaxed">
                2）针对晚高峰出勤不足的问题，建议在 17:00 前发布「高峰冲单任务」，并配合群内实时播报在线人数和完单进度。
              </p>
              <p className="text-[13px] text-blue-900 leading-relaxed">
                3）对完单下滑超过 20% 的司机，单独拉出名单，安排运营同学电话回访，排查近期路线、油费、订单质量等体验问题。
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 16px);
        }
      `}</style>
    </div>
  );
}
