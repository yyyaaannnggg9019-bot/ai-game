# AI小游戏平台

一个让用户自由分享和游玩AI小游戏的平台。

## 项目简介

AI小游戏平台是一个基于Next.js构建的现代化Web应用，允许用户上传、分享和游玩各种AI生成的小游戏。平台提供了完整的用户系统、游戏管理、社交互动等功能。

## 功能特性

- 🎮 **游戏浏览与游玩** - 浏览各类AI小游戏并直接在线游玩
- 🔐 **用户认证** - 安全的注册和登录系统
- 📤 **游戏上传** - 用户可以上传自己的AI小游戏
- ❤️ **点赞收藏** - 对喜欢的游戏进行点赞和收藏
- 💬 **评论系统** - 与其他玩家交流游戏体验
- 🔍 **搜索筛选** - 按分类和关键词搜索游戏
- 👤 **个人中心** - 管理个人信息和游戏作品

## 技术栈

- **框架**: Next.js 16.2.4 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: SQLite with Prisma ORM
- **认证**: Next-Auth
- **API**: REST API with Next.js API Routes

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/yyyaaannnggg9019-bot/ai-game.git
cd ai-game
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
# 编辑 .env.local 文件并添加必要配置
```

4. 启动开发服务器
```bash
npm run dev
```

5. 访问 http://localhost:3000

## 项目结构

```
src/
├── app/              # Next.js App Router 页面
├── components/       # React 组件
├── lib/              # 工具函数和配置
└── ...
```

## 贡献

欢迎提交Issue和Pull Request来改进项目！

## 许可证

MIT