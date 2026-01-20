import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

interface GrowthDetailProps {
  onNavigateBack: () => void;
}

// 即将过期的成长值
interface ExpiringGrowth {
  date: string;
  score: number;
}

// 成长值记录
interface GrowthRecord {
  type: string;
  score: number;
  time: string;
}

// 月度成长值数据
interface MonthlyGrowth {
  month: string;
  totalScore: number;
  records: GrowthRecord[];
}

export default function GrowthDetail({ onNavigateBack }: GrowthDetailProps) {
  // 即将过期的成长值
  const expiringGrowth: ExpiringGrowth[] = [
    {
      date: "2026-02-01",
      score: 900
    }
  ];

  // 生成近13个月的成长值明细数据
  const generateGrowthHistory = (): MonthlyGrowth[] => {
    const history: MonthlyGrowth[] = [];
    const now = new Date();
    
    // 生成近13个月的数据
    for (let i = 12; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      // 生成该月的记录（2-5条）
      const recordCount = Math.floor(Math.random() * 4) + 2;
      const records: GrowthRecord[] = [];

      const types = ["拉新奖励", "完单奖励", "小队任务", "活跃奖励"];

      // 如果是当前月份，添加示例数据（固定两条）
      if (i === 0 && monthKey === `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`) {
        records.push(
          { type: "拉新奖励", score: 100, time: `${monthKey}-20 14:00` },
          { type: "完单奖励", score: 5, time: `${monthKey}-19 12:00` }
        );
      }

      // 生成其他记录
      for (let j = records.length; j < recordCount; j++) {
        const day = Math.floor(Math.random() * 28) + 1;
        const hour = Math.floor(Math.random() * 12) + 8;
        const minute = Math.floor(Math.random() * 60);
        const dayStr = String(day).padStart(2, '0');
        const hourStr = String(hour).padStart(2, '0');
        const minuteStr = String(minute).padStart(2, '0');
        const time = `${monthKey}-${dayStr} ${hourStr}:${minuteStr}`;

        const type = types[Math.floor(Math.random() * types.length)];
        let score: number;
        
        if (type === "拉新奖励") {
          score = Math.floor(Math.random() * 200) + 50; // 50-250
        } else if (type === "完单奖励") {
          score = Math.floor(Math.random() * 20) + 1; // 1-20
        } else if (type === "小队任务") {
          score = Math.floor(Math.random() * 100) + 20; // 20-120
        } else {
          score = Math.floor(Math.random() * 50) + 10; // 10-60
        }
        
        records.push({
          type,
          score,
          time
        });
      }
      
      // 按时间倒序排序（最新在前）
      records.sort((a, b) => {
        const dateA = new Date(a.time.replace(' ', 'T'));
        const dateB = new Date(b.time.replace(' ', 'T'));
        return dateB.getTime() - dateA.getTime();
      });
      
      // 重新计算总分（基于实际记录）
      const calculatedTotal = records.reduce((sum, record) => sum + record.score, 0);
      
      history.push({
        month: monthKey,
        totalScore: calculatedTotal,
        records
      });
    }
    
    return history;
  };

  const growthHistory = useMemo(() => generateGrowthHistory(), []);
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

  // 格式化日期显示
  const formatExpiringDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  // 格式化月份显示
  const formatMonth = (monthKey: string): string => {
    const [year, month] = monthKey.split('-');
    return `${year}年${parseInt(month)}月`;
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f5f5]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateBack}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>成长值明细</span>
        <div className="w-6" />
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* 即将过期的成长值 */}
        {expiringGrowth.length > 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
            <div className="mb-3">
              <span className="text-[15px] text-gray-900" style={{ fontWeight: 600 }}>
                即将过期
              </span>
            </div>
            {expiringGrowth.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-3 mb-2 last:mb-0">
                <div className="text-[13px] text-gray-600">
                  {formatExpiringDate(item.date)} 即将过期{item.score} 成长值
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 近13个月成长值明细 */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <span className="text-[15px] text-gray-900" style={{ fontWeight: 600 }}>
              成长值明细
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {growthHistory.map((monthData) => {
              const isExpanded = expandedMonth === monthData.month;
              return (
                <div key={monthData.month} className="px-4 py-3">
                  {/* 月份标题（百叶窗触发） */}
                  <button
                    type="button"
                    onClick={() => setExpandedMonth(isExpanded ? null : monthData.month)}
                    className="w-full flex items-center justify-between mb-2"
                  >
                    <span className="text-[15px] text-gray-900 text-left" style={{ fontWeight: 600 }}>
                      {formatMonth(monthData.month)}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-blue-600" style={{ fontWeight: 600 }}>
                        总计 +{monthData.totalScore}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* 该月记录列表（百叶窗内容） */}
                  {isExpanded && (
                    <div className="mt-2 space-y-2">
                      {monthData.records.map((record, recordIndex) => (
                        <div
                          key={recordIndex}
                          className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="text-[14px] text-gray-900 mb-1" style={{ fontWeight: 500 }}>
                              {record.type}
                            </div>
                            <div className="text-[12px] text-gray-400">
                              发放时间：{record.time}
                            </div>
                          </div>
                          <div className="text-[16px] text-green-600" style={{ fontWeight: 600 }}>
                            +{record.score}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
