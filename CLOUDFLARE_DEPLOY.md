# Cloudflare Pages 部署指南

## 前提条件

1. 安装 Wrangler CLI:
```bash
npm install -g wrangler
```

2. 登录 Cloudflare:
```bash
wrangler login
```

## 数据库设置

1. 创建 D1 数据库:
```bash
wrangler d1 create ai-games-db
```

2. 运行数据库迁移:
```bash
wrangler d1 execute ai-games-db --file=prisma/migrations/20260424115937_init/migration.sql
```

3. 更新 wrangler.toml 中的 database_id

## 本地开发

```bash
npm run cf:dev
```

## 部署到 Cloudflare Pages

```bash
npm run cf:deploy
```

## 环境变量

在 Cloudflare Pages 仪表板中设置以下环境变量:
- `DATABASE_URL`: D1 数据库连接字符串
- `JWT_SECRET`: JWT 密钥

## 注意事项

- Cloudflare Pages 对 Next.js 的支持有限制
- 建议使用 Vercel 部署以获得更好的 Next.js 支持
- 生产环境需要使用 D1 数据库替代 SQLite
