
## 快速开始

### 1. 安装依赖

首先确保你已经安装了 Node.js（推荐版本 18+）。然后运行：

```bash
npm install
```

或者使用 yarn：

```bash
yarn install
```

或者使用 pnpm：

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

或者：

```bash
yarn dev
```

或者：

```bash
pnpm dev
```

项目将在 `http://localhost:5173` 运行。

### 3. 构建生产版本

```bash
# 快速构建（推荐，跳过严格类型检查）
npm run build:fast

# 完整构建（包含 TypeScript 类型检查）
npm run build
```

构建文件将生成在 `dist` 目录中。

**注意**：项目使用 `build:fast` 进行快速构建，因为部分 UI 组件库依赖可能未安装（这些组件可能未实际使用）。Netlify 部署会自动使用 `build:fast` 脚本。

## 项目结构

```
project/
├── components/          # React 组件
│   ├── ui/             # UI 组件库
│   └── ...             # 其他组件
├── styles/             # 样式文件
│   └── globals.css     # 全局样式（Tailwind CSS）
├── src/                # 源代码
│   └── main.tsx        # 应用入口文件
├── App.tsx             # 主应用组件
├── index.html          # HTML 入口文件
├── package.json        # 项目依赖配置
├── vite.config.ts      # Vite 构建配置
├── tailwind.config.js  # Tailwind CSS 配置
└── tsconfig.json       # TypeScript 配置
```

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型系统
- **Vite** - 构建工具
- **Tailwind CSS** - CSS 框架
- **Lucide React** - 图标库

## 注意事项

- 部分 UI 组件库（如 @radix-ui）可能包含在 package.json 中，但可能不会全部使用
- 如果遇到导入错误，请检查 `components/ui/` 目录中的文件，确保导入语句中没有版本号（如 `@1.2.3`）
- 此项目是原型代码，可能需要根据实际需求进行调整和优化

## 故障排除

### 导入错误

如果遇到模块导入错误，可能是因为某些 UI 组件库没有安装。你可以：

1. 查看错误信息，确定缺少哪个包
2. 安装对应的包：`npm install <package-name>`

### Tailwind CSS 样式不生效

确保：
1. `tailwind.config.js` 中的 `content` 路径包含了你的组件文件
2. `styles/globals.css` 被正确导入到 `src/main.tsx`

## 部署到 Netlify

### 准备工作

1. **确保代码已提交到 Git 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **本地测试构建**
   ```bash
   npm run build
   npm run preview
   ```
   确保构建成功且预览正常。

### Netlify 部署步骤

#### 方法一：通过 Netlify Dashboard（推荐）

1. **登录 Netlify**
   - 访问 [https://app.netlify.com](https://app.netlify.com)
   - 使用 GitHub/GitLab/Bitbucket 账号登录

2. **导入项目**
   - 点击 "Add new site" → "Import an existing project"
   - 选择你的 Git 仓库
   - Netlify 会自动检测构建配置

3. **配置构建设置**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18` (在 Environment variables 中设置)

4. **部署**
   - 点击 "Deploy site"
   - 等待构建完成

#### 方法二：通过 Netlify CLI

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy --prod
```

### 部署后配置

1. **自定义域名**（可选）
   - 在 Netlify Dashboard → Site settings → Domain management
   - 添加你的自定义域名

2. **环境变量**（如果需要）
   - Site settings → Environment variables
   - 添加必要的环境变量

3. **HTTPS**
   - Netlify 自动为所有站点提供 HTTPS 证书

### 项目已包含的部署配置

- ✅ `netlify.toml` - Netlify 构建和路由配置
- ✅ `public/_redirects` - SPA 路由重定向规则
- ✅ 优化的构建配置（代码分割、压缩等）
- ✅ 安全头部设置
- ✅ 静态资源缓存优化

### 注意事项

1. **构建时间**：首次部署可能需要 2-5 分钟
2. **自动部署**：每次推送到主分支会自动触发部署
3. **预览部署**：Pull Request 会自动创建预览部署
4. **构建日志**：在 Netlify Dashboard 可以查看详细构建日志

### 常见问题

**Q: 部署后页面空白？**
- 检查 `netlify.toml` 中的 `publish` 目录是否正确（应为 `dist`）
- 确认 `_redirects` 文件在 `public` 目录下

**Q: 路由跳转 404？**
- 确保 `_redirects` 文件存在且内容为 `/* /index.html 200`
- 检查 `netlify.toml` 中的重定向规则

**Q: 构建失败？**
- 查看 Netlify 构建日志
- 确保所有依赖都在 `package.json` 中
- 检查 Node 版本是否兼容（推荐 18+）
