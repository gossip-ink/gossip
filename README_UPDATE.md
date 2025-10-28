# 项目更新说明

## 问题已解决 ✅

项目启动错误 `error:0308010C:digital envelope routines::unsupported` 已修复。

### 问题原因
Node.js v24 使用的 OpenSSL 3.0 与旧版本 webpack 不兼容。

### 解决方案
添加了 `cross-env` 工具，并在启动脚本中设置 `NODE_OPTIONS=--openssl-legacy-provider` 环境变量。

### 使用说明

**启动项目：**
```bash
npm start
```
或
```bash
npm run dev
```

**构建项目：**
```bash
npm run build
```

### 新增功能：AI想法助手

在"想法"板块新增了AI对话功能，支持与大模型交互生成PPT灵感片段。

**使用方法：**
1. 点击想法区域的 🤖 机器人图标
2. 配置您的API地址和API Key
3. 输入您的碎片化思路
4. AI会生成结构化的PPT灵感片段
5. 点击"插入到想法区域"将内容添加到想法列表

**技术实现：**
- 新增组件：`src/components/AIAssistantDialog/`
- 修改文件：`src/components/Box/index.js`、`src/components/MainContent/index.js`
- 新增reducer：`src/models/slides.js` 中的 `addIdeaWithValue`
- 新增国际化：`src/models/global.js` 中的 `AI_ASSISTANT`

### 依赖更新记录
详见 `CHANGELOG.md`

