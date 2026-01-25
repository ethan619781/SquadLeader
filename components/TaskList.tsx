import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface TaskListProps {
  onNavigateBack: () => void;
  onNavigateToTaskDetail: (taskId: number) => void;
  onShowDeveloping: () => void;
}

interface Task {
  id: number;
  name: string;
  deadline: string;
  reward: number;
  status: '待执行' | '审核中' | '已完成' | '已过期' | '审核驳回' | '进行中';
  rejectionReason?: string;
  type: 'personal' | 'team'; // 个人任务 | 团队任务
  // 团队任务特有字段
  targetCount?: number; // 目标数量（如1000单）
  currentCount?: number; // 当前完成数量
  progress?: number; // 完成进度百分比
}

export default function TaskList({ onNavigateBack, onNavigateToTaskDetail, onShowDeveloping }: TaskListProps) {
  const [activeTab, setActiveTab] = useState('全部');
  
  const tabs = ['全部', '待执行', '审核中', '已完成', '已过期'];

  // 模拟任务数据
  const allTasks: Task[] = [
    {
      id: 2,
      name: '朋友圈宣传打卡',
      deadline: '2026-01-20 23:59',
      reward: 20,
      status: '审核驳回',
      rejectionReason: '截图不符合要求',
      type: 'personal'
    },
    {
      id: 5,
      name: '服务质量提升',
      deadline: '2026-01-10 23:59',
      reward: 40,
      status: '已过期',
      type: 'personal'
    },
    {
      id: 7,
      name: '完单激励活动',
      deadline: '2026-01-12 23:59',
      reward: 25,
      status: '已完成',
      type: 'personal'
    },
    {
      id: 8,
      name: '安全驾驶培训',
      deadline: '2026-01-19 23:59',
      reward: 60,
      status: '审核中',
      type: 'personal'
    },
    {
      id: 9,
      name: '团队12月订单任务',
      deadline: '2026-12-31 23:59',
      reward: 500,
      status: '进行中',
      type: 'team',
      targetCount: 1000,
      currentCount: 756,
      progress: 75.6
    },
    {
      id: 10,
      name: '团队1月完单挑战',
      deadline: '2026-01-31 23:59',
      reward: 800,
      status: '进行中',
      type: 'team',
      targetCount: 1500,
      currentCount: 892,
      progress: 59.5
    }
  ];

  // 根据当前Tab过滤任务
  const filteredTasks = activeTab === '全部' 
    ? allTasks 
    : allTasks.filter(task => task.status === activeTab);

  // 获取状态标签样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '待执行':
        return 'bg-blue-50 text-blue-600';
      case '审核中':
        return 'bg-orange-50 text-orange-600';
      case '已完成':
        return 'bg-green-50 text-green-600';
      case '已过期':
        return 'bg-gray-100 text-gray-500';
      case '审核驳回':
        return 'bg-red-500 text-white';
      case '进行中':
        return 'bg-purple-50 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateBack}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>我的任务</span>
        <div className="w-6" />
      </div>

      {/* Tab 标签栏 */}
      <div className="bg-white border-b border-gray-200 sticky top-[52px] z-10">
        <div 
          className="flex overflow-x-auto px-4" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-3 text-[15px] relative transition-colors ${
                activeTab === tab 
                  ? 'text-blue-600' 
                  : 'text-gray-500'
              }`}
              style={{ fontWeight: activeTab === tab ? 600 : 400 }}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 任务列表 */}
      <div className="p-4 space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className="bg-white rounded-xl p-4 shadow-sm active:bg-gray-50 transition-colors"
              onClick={() => onNavigateToTaskDetail(task.id)}
            >
              <div className="flex items-start justify-between">
                {/* 左侧：任务名称和时间 */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-[15px]" style={{ fontWeight: 500 }}>
                    {task.name}
                    </div>
                    {task.type === 'team' && (
                      <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-600 text-[10px]" style={{ fontWeight: 600 }}>
                        团队
                      </span>
                    )}
                  </div>
                  {task.rejectionReason && (
                    <div className="text-red-500 text-[12px] mb-2">
                      原因：{task.rejectionReason}
                    </div>
                  )}
                  {task.type === 'team' && task.status === '进行中' && (
                    <div className="text-gray-600 text-[13px] mb-2">
                      完成进度：{task.currentCount}/{task.targetCount} ({task.progress?.toFixed(1)}%)
                    </div>
                  )}
                  <div className="text-gray-400 text-[12px]">
                    截止时间：{task.deadline}
                  </div>
                </div>

                {/* 右侧：金额和状态 */}
                <div className="flex flex-col items-end gap-2 ml-3">
                  <span className="text-red-500 text-[16px]" style={{ fontWeight: 600 }}>
                    ¥{task.reward.toFixed(2)}
                  </span>
                  <span 
                    className={`text-[12px] px-2 py-1 rounded ${getStatusStyle(task.status)}`}
                    style={{ fontWeight: 500 }}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-[14px]">暂无任务</div>
          </div>
        )}
      </div>
    </div>
  );
}