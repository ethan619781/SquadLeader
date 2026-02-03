/**
 * 司机关联页面（主动关联）：手动输入姓名 + 司机手机号进行绑定
 * 入口：我的 - 身份卡片「普通用户」点击跳转
 */

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

const PHONE_REG = /^1\d{10}$/;

/** 每日绑定尝试次数存储 key 前缀，后缀为日期 YYYY-MM-DD */
const BIND_ATTEMPT_STORAGE_KEY = 'driver_binding_attempt';

/** 每个司机（当前用户）每天最多绑定尝试次数，默认 5 次 */
const DEFAULT_MAX_ATTEMPTS_PER_DAY = 5;

export type BindingResult = 'success' | 'mismatch' | 'already_bound';

interface DriverBindingPageProps {
  onNavigateBack: () => void;
  onBindingSuccess: () => void;
  /** 每日最多绑定尝试次数，超过后提示“操作过于频繁”，默认 5 */
  maxAttemptsPerDay?: number;
  /** 提交校验：返回 success | mismatch | already_bound，对接时改为真实 API */
  onSubmit?: (name: string, phone: string) => Promise<BindingResult>;
}

export default function DriverBindingPage({
  onNavigateBack,
  onBindingSuccess,
  maxAttemptsPerDay = DEFAULT_MAX_ATTEMPTS_PER_DAY,
  onSubmit,
}: DriverBindingPageProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<'mismatch' | 'already_bound' | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const trimName = name.trim();
    if (!trimName) {
      showToast('请填写司机姓名');
      return;
    }
    if (trimName.length > 50) {
      showToast('姓名最多50个字符');
      return;
    }
    if (!phone) {
      showToast('请填写司机手机号');
      return;
    }
    if (!PHONE_REG.test(phone)) {
      showToast('请输入正确的11位手机号');
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const attemptKey = `${BIND_ATTEMPT_STORAGE_KEY}_${today}`;
    const attemptCount = parseInt(localStorage.getItem(attemptKey) || '0', 10);
    if (attemptCount >= maxAttemptsPerDay) {
      showToast('您的操作过于频繁请稍后重试，或联系客服');
      return;
    }

    setError('');
    setLoading(true);
    try {
      localStorage.setItem(attemptKey, String(attemptCount + 1));
      const result = onSubmit
        ? await onSubmit(trimName, phone)
        : await mockSubmit(trimName, phone);
      if (result === 'success') {
        onBindingSuccess();
        showToast('关联成功');
        onNavigateBack();
        return;
      }
      if (result === 'mismatch') {
        setError('mismatch');
        return;
      }
      if (result === 'already_bound') {
        setError('already_bound');
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F4F4]">
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft className="w-6 h-6 cursor-pointer text-[#1A1A1A]" onClick={onNavigateBack} />
        <span className="text-[18px] text-[#1A1A1A]" style={{ fontWeight: 600 }}>
          关联司机账号
        </span>
        <div className="w-6" />
      </div>

      <div className="px-4 py-6">
        <div className="text-[13px] text-[#999999] mb-6">
          适用于司机手机号与小程序登录号不一致的用户，请填写喜行出行注册的司机信息进行匹配。
        </div>

        <div className="bg-white rounded-[12px] p-4 shadow-sm">
          <div className="mb-4">
            <label className="block text-[14px] text-[#333333] mb-2" style={{ fontWeight: 500 }}>
              司机姓名 <span className="text-[#FF4A26]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 50))}
              placeholder="请输入与约约注册一致的姓名"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-[#FFC300]"
              maxLength={50}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[14px] text-[#333333] mb-2" style={{ fontWeight: 500 }}>
              司机手机号 <span className="text-[#FF4A26]">*</span>
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
              placeholder="请输入11位手机号"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-[#FFC300]"
              maxLength={11}
            />
          </div>

          {error === 'mismatch' && (
            <div className="mb-4 text-[13px] text-[#FF4A26]">
              未查询到该司机信息，请核对姓名与手机号是否与喜行出行注册信息一致。
            </div>
          )}
          {error === 'already_bound' && (
            <div className="mb-4 text-[13px] text-[#FF4A26]">
              该司机账号已被其他用户绑定。如非本人操作，请联系客服。
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#FFC300] text-[#1A1A1A] text-[16px] active:opacity-90 disabled:opacity-60"
            style={{ fontWeight: 600 }}
          >
            {loading ? '校验中...' : '立即绑定'}
          </button>
        </div>
      </div>
    </div>
  );
}

function showToast(msg: string) {
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.7);color:white;padding:12px 24px;border-radius:8px;z-index:9999;font-size:14px;';
  document.body.appendChild(el);
  setTimeout(() => document.body.removeChild(el), 2000);
}

/** 模拟提交：对接时替换为真实 API，返回 success | mismatch | already_bound */
async function mockSubmit(name: string, phone: string): Promise<BindingResult> {
  await new Promise((r) => setTimeout(r, 600));
  if (phone === '13812340000' && name === '张三') return 'success';
  if (phone === '13812340001') return 'already_bound';
  return 'mismatch';
}
