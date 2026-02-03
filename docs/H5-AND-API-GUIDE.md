# 项目改为 H5 并对接接口指南

当前项目已是 **Vite + React + TypeScript** 单页应用，本身即可作为 H5 使用。本文说明如何从「纯前端演示」改为「可对接后端接口的 H5」，并保持后续扩展方便。

---

## 一、H5 适配（当前已具备 / 可补充）

### 1. 已有配置

- **index.html**：已设置 `viewport`、`user-scalable=no` 等，适合移动端。
- **样式**：Tailwind + 全局 CSS，按 375 等设计稿写即可。
- **构建**：`npm run build` 产出 `dist/`，可部署到任意静态服务器或 CDN，用浏览器打开即为 H5。

### 2. 可选增强

- **安全区（刘海屏 / 底部横条）**  
  - 已在 `styles/globals.css` 的 `:root` 中增加 `--safe-area-inset-*` 变量。  
  - 需要全屏到安全区时，在 `index.html` 的 viewport 后加：  
    `<meta name="viewport" content="viewport-fit=cover" />`（若已有 viewport，把 `viewport-fit=cover` 合并进同一行）。  
  - 底部导航栏等可加：`padding-bottom: var(--safe-area-inset-bottom);`。

- **禁止双击缩放**（按需）  
  - 已在 viewport 中 `user-scalable=no`，一般足够；若仍有双击放大，可再在前端监听 `touchstart` 做防抖。

- **路由与分享**  
  - 当前为「状态路由」（App 内 `currentPage`），无 URL 变化。  
  - 若 H5 需要分享链接、深链，可后续引入 **React Router**，用 `HashRouter`（如 `#/order/123`）最简单，无需服务端配 fallback。

---

## 二、接口对接结构（已搭好）

### 1. 目录与职责

```
src/
  api/
    request.ts   # 统一请求封装（baseURL、token、超时、错误处理）
    order.ts     # 订单相关接口示例
    index.ts     # 统一导出
```

- **对接新接口时**：在 `src/api/` 下按业务新建模块（如 `appeal.ts`、`team.ts`），在 `request.ts` 里统一处理鉴权、错误码、登出等。

### 2. 环境变量

- 复制 `.env.example` 为 `.env` 或 `.env.local`。
- 配置 `VITE_API_BASE_URL`（开发/测试/生产可分别用 `.env.development` / `.env.production`）。
- 代码里通过 `import.meta.env.VITE_API_BASE_URL` 使用，请求封装已读该变量作为 baseURL。

### 3. 请求封装说明（request.ts）

- 使用原生 `fetch`，无额外依赖。
- 自动带 `Authorization: Bearer <token>`，token 从 `localStorage.getItem('token')` 读；登录成功后需 `localStorage.setItem('token', xxx)`。
- 401 时会清除本地 token，可按需在这里跳转登录页。
- 返回体约定为 `{ code, message?, data }`；若你们后端格式不同，只需改 `request.ts` 里解析与错误判断逻辑。

### 4. 在页面里使用接口（示例：订单列表）

当前订单列表在 `components/MyOrderList.tsx` 里用本地 mock 数据。改为对接接口的步骤：

1. **调接口拿数据**  
   使用 `src/api/order.ts` 里的 `getOrderList`，在组件内：

   - `useState` 存列表与分页；
   - `useEffect` 或事件里调用 `getOrderList({ tab: activeTab, page, pageSize })`，把返回的 `data.list` 赋给状态；
   - 同时处理 loading、error 态（如展示空状态或 toast）。

2. **类型一致**  
   `OrderItem` 等类型已在 `api/order.ts` 定义，后端字段若不一致，只改该类型及接口层映射即可，页面组件尽量用同一类型。

3. **其它页面**  
   申诉、小队、任务等同理：在 `src/api/` 加对应模块（如 `appeal.ts`），定义类型、封装请求，再在对应页面用 `useState` + `useEffect` 或后续用 React Query/SWR 替换。

---

## 三、改造顺序建议

1. **先保持现状**  
   不删现有 mock，确保现有 H5 可访问、可构建、可部署。

2. **接一个真实接口**  
   选一个简单接口（如订单列表或用户信息），在 `src/api` 加接口函数，在对应页面用环境变量 `VITE_API_BASE_URL` 指向后端，把该页数据源从 mock 换成接口返回，确认请求、鉴权、错误处理都符合预期。

3. **逐步替换 mock**  
   按业务模块（订单、申诉、小队、任务等）逐个把 mock 换成接口，并在 `request.ts` 里统一处理 401、业务错误码等。

4. **可选增强**  
   - 使用 **React Query** 或 **SWR** 管理服务端状态与缓存。  
   - 使用 **Zustand/Context** 存用户信息、token，方便多页面共享。  
   - 需要 URL 与分享时再上 **React Router (HashRouter)**。

---

## 四、部署 H5

- 执行 `npm run build`，将 `dist/` 部署到 Nginx、OSS、Netlify 等即可。
- 若使用 BrowserRouter，需配置服务器把所有路径 fallback 到 `index.html`；当前未使用 Router，直接访问根或任意路径指向的同一 index 即可。

按上述步骤即可在现有项目上平滑改为「可对接接口的 H5」，并保持后续扩展空间。
