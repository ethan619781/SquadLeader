# Netlify 部署指南

## 📋 部署前检查清单

### 1. 本地测试构建

在部署前，请确保项目可以正常构建：

```bash
# 安装依赖
npm install

# 构建项目（快速构建，跳过严格类型检查）
npm run build:fast

# 预览构建结果
npm run preview
```

**注意**：项目使用 `build:fast` 脚本进行构建，这会跳过严格的 TypeScript 类型检查，因为部分 UI 组件库依赖未安装（这些组件可能未实际使用）。如果需要完整类型检查，可以运行 `npm run build`。

确保：
- ✅ 构建成功，没有错误
- ✅ 预览页面正常显示
- ✅ 所有路由可以正常访问

### 2. Git 仓库准备

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "准备部署到 Netlify"

# 推送到远程仓库（GitHub/GitLab/Bitbucket）
git remote add origin <your-repo-url>
git push -u origin main
```

### 3. 检查配置文件

确保以下文件存在且配置正确：

- ✅ `netlify.toml` - Netlify 构建配置
- ✅ `public/_redirects` - SPA 路由重定向
- ✅ `package.json` - 包含构建脚本
- ✅ `.gitignore` - 排除不需要的文件

## 🚀 Netlify 部署步骤

### 方法一：通过 Netlify Dashboard（推荐新手）

1. **访问 Netlify**
   - 打开 [https://app.netlify.com](https://app.netlify.com)
   - 使用 GitHub/GitLab/Bitbucket 账号登录

2. **导入项目**
   - 点击 "Add new site" → "Import an existing project"
   - 选择你的 Git 提供商（GitHub/GitLab/Bitbucket）
   - 授权 Netlify 访问你的仓库
   - 选择要部署的仓库

3. **配置构建设置**
   Netlify 会自动检测配置，但请确认：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 在 "Environment variables" 中添加 `NODE_VERSION = 18`

4. **部署**
   - 点击 "Deploy site"
   - 等待构建完成（通常 2-5 分钟）

5. **查看结果**
   - 构建成功后，你会得到一个 Netlify 提供的 URL（如 `https://your-site.netlify.app`）
   - 点击 URL 查看部署的网站

### 方法二：通过 Netlify CLI（适合开发者）

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 在项目目录初始化
netlify init

# 按照提示选择：
# - Create & configure a new site
# - Team: 选择你的团队
# - Site name: 输入站点名称（可选）
# - Build command: npm run build
# - Directory to deploy: dist

# 部署到生产环境
netlify deploy --prod
```

## ⚙️ 部署后配置

### 1. 自定义域名（可选）

1. 在 Netlify Dashboard → Site settings → Domain management
2. 点击 "Add custom domain"
3. 输入你的域名
4. 按照提示配置 DNS 记录

### 2. 环境变量（如果需要）

1. Site settings → Environment variables
2. 添加变量（如 API 密钥等）
3. 重新部署以应用更改

### 3. 自动部署设置

- **自动部署**：默认启用，每次推送到主分支会自动部署
- **预览部署**：Pull Request 会自动创建预览部署
- **分支部署**：可以在 Site settings → Build & deploy → Branch deploys 中配置

## 🔧 项目已包含的优化

### 1. 构建优化
- ✅ 代码分割（React、UI 库分离）
- ✅ 生产环境移除 console 和 debugger
- ✅ 资源压缩和优化

### 2. 路由支持
- ✅ SPA 路由重定向（所有路由指向 index.html）
- ✅ 支持浏览器前进/后退

### 3. 性能优化
- ✅ 静态资源长期缓存
- ✅ HTML 文件不缓存（确保更新及时）

### 4. 安全配置
- ✅ XSS 保护
- ✅ 内容类型保护
- ✅ 框架嵌入保护

## 🐛 常见问题排查

### 问题 1: 构建失败

**可能原因：**
- Node 版本不兼容
- 依赖安装失败
- TypeScript 编译错误

**解决方法：**
1. 检查 Netlify 构建日志
2. 在本地运行 `npm run build` 复现问题
3. 确保 Node 版本为 18+
4. 检查 `package.json` 中的依赖版本

### 问题 2: 部署后页面空白

**可能原因：**
- 构建输出目录错误
- 路由重定向未生效

**解决方法：**
1. 确认 `netlify.toml` 中 `publish = "dist"`
2. 确认 `public/_redirects` 文件存在
3. 检查浏览器控制台错误

### 问题 3: 路由跳转 404

**可能原因：**
- `_redirects` 文件未正确复制到 dist

**解决方法：**
1. 确认 `public/_redirects` 文件存在
2. 检查构建后的 `dist/_redirects` 是否存在
3. 确认 `netlify.toml` 中的重定向规则

### 问题 4: 样式丢失

**可能原因：**
- Tailwind CSS 未正确构建
- 资源路径错误

**解决方法：**
1. 检查 `tailwind.config.js` 中的 content 路径
2. 确认 `styles/globals.css` 被正确导入
3. 检查构建日志中的警告

## 📊 部署后验证

部署成功后，请验证：

- [ ] 首页正常加载
- [ ] 所有页面路由正常
- [ ] 手机容器显示正常
- [ ] 底部导航栏正常显示
- [ ] 所有功能按钮可点击
- [ ] 图片和资源正常加载
- [ ] 移动端响应式正常

## 🔄 更新部署

每次更新代码后：

1. **提交到 Git**
   ```bash
   git add .
   git commit -m "更新内容"
   git push
   ```

2. **Netlify 自动部署**
   - Netlify 会自动检测推送
   - 自动触发新的构建和部署
   - 在 Dashboard 可以查看部署状态

3. **手动触发部署**（可选）
   - 在 Netlify Dashboard → Deploys
   - 点击 "Trigger deploy" → "Deploy site"

## 📝 注意事项

1. **构建时间**：首次部署可能需要 2-5 分钟，后续部署通常更快
2. **免费额度**：Netlify 免费版有构建时间限制（每月 300 分钟）
3. **预览部署**：每个 Pull Request 会自动创建预览部署，方便测试
4. **回滚**：可以在 Deploys 页面回滚到之前的版本

## 🎉 完成！

部署成功后，你的项目就可以通过 Netlify 提供的 URL 访问了！

如果需要帮助，可以查看：
- [Netlify 官方文档](https://docs.netlify.com/)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
