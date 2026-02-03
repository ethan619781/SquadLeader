/**
 * 被动关联弹窗：发现了您的司机档案
 * 触发条件：当前未关联 + 后台根据登录手机号匹配到司机且未绑定 + 今日弹窗次数未超限
 */

interface DriverBindingPassiveModalProps {
  /** 当前登录手机号脱敏展示，如 138****0000 */
  maskedPhone: string;
  /** 司机姓名脱敏，如 张* */
  driverNameHint: string;
  onConfirm: () => void;
  onDismiss: () => void;
}

export default function DriverBindingPassiveModal({
  maskedPhone,
  driverNameHint,
  onConfirm,
  onDismiss,
}: DriverBindingPassiveModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center px-6">
      <div className="bg-white rounded-[16px] w-full max-w-[320px] overflow-hidden shadow-xl animate-fade-in">
        <div className="p-5">
          <div className="text-[18px] text-[#111111] mb-3 text-center" style={{ fontWeight: 600 }}>
            发现了您的司机档案
          </div>
          <div className="text-[14px] text-[#666666] leading-relaxed mb-6 text-center">
            系统检测到当前手机号 <span className="text-[#111111]" style={{ fontWeight: 500 }}>{maskedPhone}</span> 已注册司机身份 <span className="text-[#111111]" style={{ fontWeight: 500 }}>{driverNameHint}</span>，关联后可解锁更多功能。
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onConfirm}
              className="w-full py-3 rounded-full bg-[#FFC300] text-[#1A1A1A] text-[16px] active:opacity-90"
              style={{ fontWeight: 600 }}
            >
              立即关联
            </button>
            <button
              type="button"
              onClick={onDismiss}
              className="w-full py-3 rounded-full border border-gray-300 text-[#666666] text-[15px] active:opacity-80"
            >
              暂不关联
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
