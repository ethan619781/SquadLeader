import { useState } from 'react';
import { ChevronLeft, AlertCircle, CheckCircle, Upload, X } from 'lucide-react';
import SharePosterModal from './SharePosterModal';

interface TaskDetailProps {
  taskId: number;
  onNavigateBack: () => void;
  onShowDeveloping: () => void;
}

type TaskStatus = '待执行' | '审核中' | '审核驳回' | '已完成' | '已过期' | '进行中';

export default function TaskDetail({ taskId, onNavigateBack, onShowDeveloping }: TaskDetailProps) {
  // 根据 taskId 判断是个人任务还是团队任务
  const isTeamTask = taskId === 9 || taskId === 10;
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(isTeamTask ? '进行中' : '待执行');
  const [showShareModal, setShowShareModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // 模拟任务数据
  const taskData = isTeamTask ? {
    id: taskId,
    title: taskId === 9 ? '团队12月订单任务' : '团队1月完单挑战',
    reward: taskId === 9 ? 500.00 : 800.00,
    deadline: taskId === 9 ? '2026-12-31 23:59' : '2026-01-31 23:59',
    description: taskId === 9 
      ? '团队需要在12月完成1000单订单目标，完成任务后所有成员将获得奖励'
      : '团队需要在1月完成1500单完单挑战，冲刺团队业绩新高',
    type: 'team' as const,
    targetCount: taskId === 9 ? 1000 : 1500,
    currentCount: taskId === 9 ? 756 : 892,
    progress: taskId === 9 ? 75.6 : 59.5,
    startDate: taskId === 9 ? '2026-12-01' : '2026-01-01'
  } : {
    id: taskId,
    title: '春节保供战-朋友圈宣传',
    reward: 20.00,
    deadline: '2026-01-25 23:59',
    description: '分享活动海报至朋友圈或抖音，帮助平台扩大影响力',
    rejectionReason: '截图模糊，无法辨认时间',
    type: 'personal' as const
  };

  const handleShare = () => {
    setShowShareModal(false);
    const toast = document.createElement('div');
    toast.textContent = '已打开分享...';
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
  };

  const handleDownload = () => {
    setShowShareModal(false);
    const toast = document.createElement('div');
    toast.textContent = '海报已保存至相册';
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
  };

  const handleImageUpload = () => {
    // 模拟上传图片
    if (uploadedImages.length < 3) {
      setUploadedImages([...uploadedImages, `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop`]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (uploadedImages.length === 0) {
      const toast = document.createElement('div');
      toast.textContent = '请至少上传1张截图';
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
      return;
    }

    setTaskStatus('审核中');
    const toast = document.createElement('div');
    toast.textContent = '提交成功，请耐心等待审核';
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
  };

  const getButtonConfig = () => {
    switch (taskStatus) {
      case '待执行':
        return {
          text: '提交审核',
          disabled: false,
          bgColor: 'bg-blue-500 hover:bg-blue-600',
          onClick: handleSubmit
        };
      case '审核中':
        return {
          text: '正在审核中...',
          disabled: true,
          bgColor: 'bg-blue-300',
          onClick: () => {}
        };
      case '审核驳回':
        return {
          text: '重新提交',
          disabled: false,
          bgColor: 'bg-blue-500 hover:bg-blue-600',
          onClick: handleSubmit
        };
      case '已过期':
        return {
          text: '任务已截止（不可重提）',
          disabled: true,
          bgColor: 'bg-gray-400',
          onClick: () => {}
        };
      case '已完成':
        return {
          text: '任务已完成',
          disabled: true,
          bgColor: 'bg-green-400',
          onClick: () => {}
        };
      case '进行中':
        return {
          text: '任务进行中',
          disabled: true,
          bgColor: 'bg-purple-400',
          onClick: () => {}
        };
      default:
        return {
          text: '提交审核',
          disabled: false,
          bgColor: 'bg-blue-500 hover:bg-blue-600',
          onClick: handleSubmit
        };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5] page-content-with-bottom-action">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateBack}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>任务详情</span>
        <div className="w-6" />
      </div>

      {/* 驳回提示条 */}
      {taskStatus === '审核驳回' && (
        <div className="bg-red-50 border-b border-red-100 px-4 py-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-red-700 text-[14px]" style={{ fontWeight: 600 }}>
                审核不通过
              </div>
              <div className="text-red-600 text-[13px] mt-1">
                {taskData.rejectionReason}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. 顶部任务信息卡片 */}
      <div className="bg-white px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <h1 className="text-[20px] text-gray-900" style={{ fontWeight: 700 }}>
            {taskData.title}
          </h1>
          {taskData.type === 'team' && (
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-600 text-[12px]" style={{ fontWeight: 600 }}>
              团队任务
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-gray-500 text-[13px]">任务奖励</span>
            <span className="text-red-500 text-[24px]" style={{ fontWeight: 700 }}>
              ¥{taskData.reward.toFixed(2)}
            </span>
          </div>
        </div>
        {taskData.type === 'team' && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-gray-500 text-[13px] mb-2">任务周期</div>
            <div className="text-[15px] text-gray-900" style={{ fontWeight: 500 }}>
              {taskData.startDate} 至 {taskData.deadline}
            </div>
          </div>
        )}
      </div>

      {/* 团队任务完成进度卡片 */}
      {taskData.type === 'team' && (
        <div className="mx-4 mt-4 bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-[16px] text-gray-900 mb-4" style={{ fontWeight: 600 }}>
            任务完成情况
          </h2>

          {/* 进度条 */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-gray-600">完成进度</span>
              <span className="text-[16px] text-blue-600" style={{ fontWeight: 600 }}>
                {taskData.progress?.toFixed(1)}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                style={{ width: `${taskData.progress}%` }}
              />
            </div>
          </div>

          {/* 数据展示 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-gray-500 text-[12px] mb-2">目标数量</div>
              <div className="text-[24px] text-blue-600" style={{ fontWeight: 700 }}>
                {taskData.targetCount}
                <span className="text-[14px] ml-1">单</span>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-gray-500 text-[12px] mb-2">当前完成</div>
              <div className="text-[24px] text-green-600" style={{ fontWeight: 700 }}>
                {taskData.currentCount}
                <span className="text-[14px] ml-1">单</span>
              </div>
            </div>
          </div>

          {/* 剩余任务 */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-gray-600">剩余任务</span>
              <span className="text-[18px] text-orange-600" style={{ fontWeight: 600 }}>
                {taskData.targetCount! - taskData.currentCount!} 单
              </span>
            </div>
          </div>

          {/* 提示信息 */}
          <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-100">
            <div className="text-blue-800 text-[12px] leading-relaxed">
              💡 团队任务需要所有成员共同努力完成，实时关注任务进度，及时调整运营策略
            </div>
          </div>
        </div>
      )}

      {/* 2. 参与步骤卡片 - 仅个人任务显示 */}
      {taskData.type === 'personal' && (
      <div className="mx-4 mt-4 bg-white rounded-xl p-5 shadow-sm">
        <h2 className="text-[16px] text-gray-900 mb-4" style={{ fontWeight: 600 }}>
          参与步骤
        </h2>

        <div className="space-y-4">
          {/* 步骤1 */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-[13px]" style={{ fontWeight: 600 }}>
              1
            </div>
            <div className="flex-1 pt-0.5">
              <div className="text-[15px] text-gray-900 mb-2">
                生成宣传海报，分享至朋友圈/抖音
              </div>
              <button
                onClick={() => setShowShareModal(true)}
                className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg text-[14px] hover:bg-blue-50 transition-colors"
                style={{ fontWeight: 600 }}
              >
                立即分享
              </button>
            </div>
          </div>

          {/* 步骤2 */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-[13px]" style={{ fontWeight: 600 }}>
              2
            </div>
            <div className="flex-1 pt-0.5">
              <div className="text-[15px] text-gray-700">
                分享成功后截图保存
              </div>
            </div>
          </div>

          {/* 步骤3 */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-[13px]" style={{ fontWeight: 600 }}>
              3
            </div>
            <div className="flex-1 pt-0.5">
              <div className="text-[15px] text-gray-700">
                上传分享截图并提交审核
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* 3. 凭证上传区 - 仅个人任务显示 */}
      {taskData.type === 'personal' && (
      <div className="mx-4 mt-4 bg-white rounded-xl p-5 shadow-sm">
        <h2 className="text-[16px] text-gray-900 mb-4" style={{ fontWeight: 600 }}>
          上传分享截图
          <span className="text-gray-400 text-[13px] ml-2">（必填，最多3张）</span>
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {/* 已上传的图片 */}
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={image}
                alt={`上传图片${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* 上传按钮 */}
          {uploadedImages.length < 3 && (
            <button
              onClick={handleImageUpload}
              className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Upload className="w-8 h-8 text-gray-400 mb-1" />
              <span className="text-gray-400 text-[12px]">上传图片</span>
            </button>
          )}
        </div>

        <div className="mt-3 text-gray-400 text-[12px]">
          提示：请确保截图清晰，能看清发布时间和内容
        </div>
      </div>
      )}

      {/* 演示状态切换器 - 仅个人任务显示 */}
      {taskData.type === 'personal' && (
      <div className="fixed top-20 right-4 z-20">
        <div className="bg-white rounded-lg shadow-lg p-2 text-[11px]">
          <div className="text-gray-500 mb-1 px-1">演示状态</div>
          <div className="space-y-1">
            {(['待执行', '审核中', '审核驳回', '已完成', '已过期', '进行中'] as TaskStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setTaskStatus(status)}
                className={`w-full px-2 py-1 rounded text-[11px] ${
                  taskStatus === status
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
      )}

      {/* 底部固定操作栏 - 团队任务进行中时不显示操作按钮 */}
      {taskData.type !== 'team' && (
      <div className="bottom-action-bar">
        <div className="w-full px-4 py-4">
          <button
            onClick={buttonConfig.onClick}
            disabled={buttonConfig.disabled}
            className={`w-full py-3 rounded-lg text-[16px] text-white transition-colors shadow-md ${buttonConfig.bgColor} ${
              buttonConfig.disabled ? 'cursor-not-allowed' : ''
            }`}
            style={{ fontWeight: 600 }}
          >
            {buttonConfig.text}
          </button>
        </div>
      </div>
      )}
      {showShareModal && (
        <SharePosterModal
          onClose={() => setShowShareModal(false)}
          onShare={handleShare}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}
