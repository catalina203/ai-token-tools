# AI Token Tools - 项目指南

## 项目概述

面向 AI 开发者的免费工具网站，提供 Token 计算、成本估算、Prompt 格式化、模型价格对比等 7 个工具。所有处理在浏览器端完成，无服务端依赖。

## 技术栈

- **Next.js 14** (App Router) + TypeScript
- **React 18** (Server & Client Components)
- **TailwindCSS** (样式)
- **lucide-react** (图标)
- **clsx + tailwind-merge** (className 合并工具函数)
- **diff** (文本差异对比)
- **Cloudflare Pages** (部署目标，静态导出)

## 目录结构

```
├── app/
│   ├── layout.tsx              # 根布局（Header + Footer + Google AdSense）
│   ├── page.tsx                # 首页（Hero + 工具列表 + 特性 + CTA）
│   ├── globals.css             # Tailwind 基础样式 + 自定义组件类
│   ├── guide/page.tsx          # 使用指南页面
│   └── tools/
│       ├── page.tsx            # 工具列表页
│       ├── token-calculator/   # Token 计算器
│       ├── token-cost-calculator/  # Token 成本计算器
│       ├── tokenizer-viewer/   # Tokenizer 可视化
│       ├── prompt-formatter/   # Prompt 格式化工具
│       ├── prompt-diff/        # Prompt 对比工具
│       ├── model-price-comparison/  # 模型价格对比（服务端组件）
│       └── context-length-checker/  # 上下文长度检查器
├── components/
│   ├── Header.tsx              # 导航栏（含移动端菜单）
│   ├── Footer.tsx              # 页脚
│   ├── ToolCard.tsx            # 工具卡片组件
│   ├── ToolLayout.tsx          # 工具页通用布局
│   ├── TokenInput.tsx          # 文本输入组件（带清除/粘贴/字数统计）
│   └── TokenResult.tsx         # Token 结果展示（含进度条/详情）
├── lib/
│   ├── tokenizer.ts            # Token 估算/分词/统计逻辑
│   ├── costCalculator.ts       # 成本计算/模型查询/价格对比
│   └── utils.ts                # cn/formatNumber/copyToClipboard/debounce 等工具函数
├── data/
│   └── models.json             # AI 模型数据（OpenAI/Anthropic/Google/Mistral/Cohere）
├── next.config.js              # 静态导出配置 (output: 'export')
├── tailwind.config.ts          # Tailwind 主题配置（primary 蓝色调）
├── tsconfig.json               # TypeScript 配置（@/ 路径别名）
├── wrangler.toml               # Cloudflare Pages 部署配置
└── postcss.config.js
```

## 关键约定

### 组件规范
- 页面文件统一放在 `app/tools/<tool-name>/page.tsx`
- 每个工具页有独立 `layout.tsx` 导出 SEO metadata（model-price-comparison 除外，metadata 在 page.tsx）
- 客户端组件使用 `'use client'` 指令
- 服务端组件为默认（如 model-price-comparison、guide）
- 通用组件放在 `components/`，业务逻辑放在 `lib/`

### 导入规范
- 使用 `@/` 路径别名引用项目根目录
- 示例：`import Header from '@/components/Header'`

### 样式规范
- 使用 `cn()` 工具函数（`clsx` + `tailwind-merge`）合并 className
- Tailwind 自定义组件类：`btn-primary`、`btn-secondary`、`card`、`input`、`textarea`、`select`

### SEO 规范
- 每个工具页通过 layout.tsx 的 `metadata` 导出设置 title/description/keywords/openGraph
- 包含 `alternates.canonical` 指向正式 URL
- 页面结构：h1 + 说明 + 工具主体 + Info 区域 + FAQ 区域

## 可用命令

```bash
npm run dev        # 启动开发服务器
npm run build      # 构建（静态导出到 dist/）
npm run start      # 启动生产服务器
npm run lint       # ESLint 检查
npm run typecheck  # TypeScript 类型检查
npm run deploy     # 部署到 Cloudflare Pages
```

## 注意事项

- `next.config.js` 配置了 `output: 'export'`，构建输出为静态文件到 `dist/` 目录
- **不修改**: `next.config.js`、`postcss.config.js`、`wrangler.toml`、`tailwind.config.ts`、`tsconfig.json`
- **不修改**: `data/models.json`（模型数据文件，如需修改需单独确认）
- 每个工具页面 layout.tsx 中的 `metadata` 对象需要包含目标关键词以优化 SEO
- 所有文件使用 `tsx` / `ts` 扩展名

## 模型数据说明

`data/models.json` 包含 5 个提供商的 18 个模型：
- **OpenAI**: GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-3.5 Turbo, o1 Preview, o1 Mini
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
- **Google**: Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini 1.0 Pro
- **Mistral**: Mistral Large, Mistral Medium, Mistral Small
- **Cohere**: Command R+, Command R

每个模型包含：id, name, contextLength, inputPrice, outputPrice, description
