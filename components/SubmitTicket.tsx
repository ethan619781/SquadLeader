import { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus } from 'lucide-react';

interface SubmitTicketProps {
  onNavigateToHome: () => void;
  onShowDeveloping: () => void;
}

export default function SubmitTicket({ onNavigateToHome, onShowDeveloping }: SubmitTicketProps) {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [description, setDescription] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    if (!vehicleNumber.trim()) {
      const toast = document.createElement('div');
      toast.textContent = '请填写车牌号码';
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

    // 显示提交成功提示
    const toast = document.createElement('div');
    toast.textContent = '提交成功！';
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
      onNavigateToHome();
    }, 1500);
  };

  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5] page-content-with-bottom-action">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateToHome}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>提交工单</span>
        <div className="flex items-center gap-3">
          <MoreHorizontal className="w-5 h-5" onClick={onShowDeveloping} />
          <div className="w-6 h-6 border-2 border-black rounded-full" onClick={onShowDeveloping} />
        </div>
      </div>

      {/* 表单内容 */}
      <div className="mt-3 bg-white">
        {/* 城市 */}
        <div 
          className="flex items-center justify-between px-4 py-4 border-b border-gray-100"
          onClick={onShowDeveloping}
        >
          <div className="flex items-center gap-2">
            <span className="text-red-500">*</span>
            <span className="text-[15px]">城市</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] text-gray-600">浙江省/杭州市</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* 服务品牌 */}
        <div 
          className="flex items-center justify-between px-4 py-4 border-b border-gray-100"
          onClick={onShowDeveloping}
        >
          <div className="flex items-center gap-2">
            <span className="text-red-500">*</span>
            <span className="text-[15px]">服务品牌</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] text-gray-600">喜行约车</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* 回访电话 */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-red-500">*</span>
            <span className="text-[15px]">回访电话</span>
          </div>
          <span className="text-[15px] text-gray-600">18800880098</span>
        </div>

        {/* 提单手机号 */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-red-500">*</span>
            <span className="text-[15px]">提单手机号</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] text-gray-600">18800880098</span>
            <span className="text-[13px] text-orange-500">同上</span>
          </div>
        </div>

        {/* 车牌号码 */}
        <div 
          className="flex items-center justify-between px-4 py-4 border-b border-gray-100"
          onClick={onShowDeveloping}
        >
          <div className="flex items-center gap-2">
            <span className="text-red-500">*</span>
            <span className="text-[15px]">车辆号码</span>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="text"
              placeholder="请输入车牌号码"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="text-[15px] text-gray-600 text-right outline-none bg-transparent"
            />
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* 申诉需求 */}
        <div 
          className="flex items-center justify-between px-4 py-4 border-b border-gray-100"
          onClick={onShowDeveloping}
        >
          <div className="flex items-center gap-2">
            <span className="text-red-500">*</span>
            <span className="text-[15px]">申诉需求</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] text-gray-400">请选择</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* 问题描述 */}
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-red-500">*</span>
            <span className="text-[15px]">问题描述</span>
          </div>
          <textarea
            placeholder="请输入问题1000字以内"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
            className="w-full h-20 text-[14px] text-gray-600 outline-none bg-transparent resize-none"
          />
        </div>
      </div>

      {/* 申诉凭证 */}
      <div className="mt-3 bg-white px-4 py-4">
        <div className="flex items-start gap-2 mb-4">
          <span className="text-red-500">*</span>
          <span className="text-[15px]">申诉凭证</span>
        </div>
        
        <div 
          className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400"
          onClick={onShowDeveloping}
        >
          <Plus className="w-6 h-6 text-gray-400 mb-1" />
          <span className="text-[11px] text-gray-400">添加图片/</span>
          <span className="text-[11px] text-gray-400">视频</span>
        </div>
        
        <div className="mt-2 text-[12px] text-gray-400">
          请上传如：发票、维修单、水印照片等（最多9张）
        </div>
      </div>

      {/* 行程录音 */}
      <div className="mt-3 bg-white px-4 py-4">
        <div className="text-[15px] mb-3">行程录音</div>
        <div 
          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
          onClick={onShowDeveloping}
        >
          <span className="text-[14px] text-gray-500">行程中录音是否可以调辅助</span>
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="bottom-action-bar">
        <div className="w-full px-4 py-4">
          <button 
            className="w-full bg-[#FFE500] rounded-full py-3.5 text-[16px]"
            style={{ fontWeight: 500 }}
            onClick={handleSubmit}
          >
            提交工单
          </button>
        </div>
      </div>
    </div>
  );
}
