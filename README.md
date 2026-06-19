# AI简历智能修改系统

基于大语言模型的智能简历优化工具，通过解析岗位JD与用户简历，自动匹配岗位需求并生成针对性修改建议。

## 功能特性

- 📄 简历上传与解析（支持PDF、Word）
- 📋 JD文本解析与关键词提取
- 📊 匹配度分析与可视化
- ✨ AI智能修改简历
- 📥 多格式导出（PDF、Word）

## 技术栈

### 前端
- React + TypeScript
- Tailwind CSS
- React Router
- Axios

### 后端
- Python FastAPI
- PyPDF2（PDF解析）
- python-docx（Word解析）
- OpenAI SDK（DeepSeek API）

## 快速开始

### 前端开发

```bash
cd frontend
npm install
npm run dev
```

前端将运行在 http://localhost:5173

### 后端开发

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

后端将运行在 http://localhost:8000

## API文档

启动后端后，访问 http://localhost:8000/docs 查看API文档

## 项目结构

```
简历优化/
├── frontend/              # 前端项目
│   ├── src/
│   │   ├── components/    # 组件
│   │   ├── pages/         # 页面
│   │   ├── services/      # API服务
│   │   └── types/         # 类型定义
│   └── package.json
├── backend/               # 后端项目
│   ├── app/
│   │   ├── api/           # API路由
│   │   ├── core/          # 核心配置
│   │   ├── services/      # 业务服务
│   │   └── models/        # 数据模型
│   └── requirements.txt
└── docs/                  # 文档
```

## 环境变量

后端需要配置以下环境变量：

```bash
DEEPSEEK_API_KEY=your_api_key
DEEPSEEK_API_URL=https://api.deepseek.com
```

## 部署

### 前端部署（Vercel）

1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 配置构建命令：`npm run build`
4. 配置输出目录：`dist`

### 后端部署（Render）

1. 将代码推送到GitHub
2. 在Render中创建Web Service
3. 配置构建命令：`pip install -r requirements.txt`
4. 配置启动命令：`uvicorn app.main:app --host 0.0.0.0 --port $PORT`

## 开发计划

- [x] 项目初始化
- [x] 前端UI组件
- [x] 前端页面
- [x] 后端API
- [x] 简历解析服务
- [x] JD解析服务
- [x] 匹配度分析服务
- [x] AI修改服务
- [ ] DeepSeek API集成
- [ ] 真实数据解析
- [ ] 测试
- [ ] 部署

## 许可证

MIT
