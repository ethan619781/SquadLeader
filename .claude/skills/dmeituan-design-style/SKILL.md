---
name: dMeituan-design-style
description: Create pixel-perfect, Meituan/Roo-style high-fidelity mobile designs with strict yellow-black contrast, number-heavy layouts, and realistic ride-hailing data. Use when you need Meituan/Dianping visual language, bold pricing emphasis, and flat white cards on gray background.
---

# dMeituan Design Style

高保真移动端原型，严格对齐美团 / 大众点评 (Roo Design) 视觉体系，重点突出「品牌黄 + 深黑」的高对比体验和数字信息的可读性。

## Design System（严格遵守）

### 1. Color Palette（美团色彩系统 - 黄黑高对比）

- **Brand Primary（品牌黄）**: `#FFC300`
  - 用途：顶部 Header、主按钮、关键高亮区域背景。
  - **关键规则**：当背景是品牌黄时，文字颜色必须是 `#1A1A1A`，**绝对不能使用白色文字**。
- **Functional Colors**
  - **Price Red（价格 / 紧迫）**: `#FF4A26`（用于金额、倒计时、紧急提示）
  - **Link Blue（链接）**: `#2A83FE`（仅用于协议、跳转链接文案）
  - **Success（成功）**: `#00C250`
- **Neutral（中性色）**
  - **Title**: `#111111`（主要标题，字重 600）
  - **Body**: `#333333`（正文内容）
  - **Disable**: `#CCCCCC`（失效、不可点击状态）
  - **Background**: `#F4F4F4`（App 整体底色，浅灰，用于承托白色卡片）
  - **Card Bg**: `#FFFFFF`（卡片背景，纯白）

所有颜色搭配必须优先保证 **可读性** 和 **对比度**，避免在灰色背景上使用过浅文字。

### 2. Typography（排版规范）

- **数字敏感信息**
  - 金额、时间、倒计时等数字：`font-weight: 700`（Bold），字号相对文字略大，风格接近 DIN。
  - 示例：价格 `¥ 35.50` 使用更大的字号和加粗红色。
- **Header 1（页面标题）**
  - 字号：18px
  - 字重：600
  - 颜色：`#111111`
- **Body（正文）**
  - 字号：14px
  - 行高：1.5
  - 颜色：`#333333`
- **Caption（说明文案）**
  - 字号：12px
  - 颜色：`#999999`

### 3. Spacing & Layout（间距与布局）

- 页面左右 Padding：`16px`（移动端标准）
- 底部安全区：为主要内容或底部按钮预留 `padding-bottom: constant(safe-area-inset-bottom)`。
- 通栏头部布局模式：
  - 顶部 Header 背景常用品牌黄 `#FFC300`。
  - 首屏下方的主内容白色卡片使用 `-mt-4` 等负 margin 轻微“叠”在黄色区域上，营造卡片浮起的层级感。

布局优先使用 **单列滚动 + 白卡片分段** 的信息组织方式。

### 4. Components（美团风格组件）

#### Button（按钮）

- 主按钮：
  - 背景色：`#FFC300`
  - 文本色：`#1A1A1A`
  - 字重：600
  - 无边框
  - 圆角：`rounded-lg`（约 8px）或 `rounded-full`（胶囊形）
  - Active 状态：背景变为 `#E5B000`，同时可附加 `active:opacity-80` 或 `active:scale-95`

#### Card（卡片）

- 圆角：`border-radius: 12px`
- 无描边、无明显阴影（保持 Flat 风格）
- 通过 `#F4F4F4` 的灰色背景衬托白底卡片层级

#### Tag（标签）

- 背景色：`#FFF8D9`
- 文本色：`#FF6600`
- 常用于优惠信息、活动标记、路线标签等。

## Interaction & Animation（交互与动效）

### Micro-Interactions（微交互）

- 所有可点击元素（按钮、列表项、卡片）：
  - 至少使用 `active:opacity-80` 或 `active:scale-95` 模拟按压反馈。

### Feedback（用户反馈）

- 成功 / 失败操作：
  - 使用 Toast 做轻量反馈提示，位置一般在屏幕中下部。
- 危险操作（如取消订单、退出行程）：
  - 必须弹出 Modal 二次确认框，按钮区通常为“再想想”（次要）+“确认操作”（主按钮）。

## Data Realism（真实顺风车数据）

严禁使用 `"Test User"`, `"Lorem Ipsum"` 等占位内容，必须使用真实场景数据：

- 地址示例：
  - `"北京市朝阳区大望路万达广场"`
  - `"燕郊天洋城"`
- 价格示例：
  - `"¥ 35.50"`（数字使用 Price Red `#FF4A26`，字号偏大，字重 700）
- 时间与距离：
  - `"今日 18:30"`
  - `"距起点 1.2km"`

所有示例与 Mock 数据都需要贴近真实顺风车 / 出行业务语境。

## Tech Implementation（技术落地）

- 使用 **Tailwind CSS** 实现上述设计规范。
- 布局必须使用 **Flexbox** 或 **Grid**。
- 所有可滚动列表放在：
  - `<div class="overflow-y-auto no-scrollbar">` 中，
  - 并通过自定义样式隐藏滚动条以保持沉浸式体验。

## Workflow（工作流）

当用户要求生成页面时，按以下流程生成：

1. 将页面整体背景设置为 `#F4F4F4`。
2. 构建整体布局：
   - 如有 Header，优先使用品牌黄 `#FFC300` 作为顶部背景，并考虑白卡片 `-mt-4` 叠加效果。
3. 用真实的顺风车场景 Mock 数据填充（真实地址、价格、时间、距离等）。
4. 按照上文的颜色、排版、间距与组件规范，补充 Tailwind 类名和交互类（`active:opacity-80` / `active:scale-95`）。
5. 输出最终代码（优先使用 `<script setup>` + Tailwind 的 Vue / 前端片段，或根据项目栈输出对应实现），确保视觉风格符合美团 / Roo 体系。

