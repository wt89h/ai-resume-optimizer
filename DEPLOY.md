# 部署指南

## 后端部署到 Render

1. 将代码推送到GitHub仓库
2. 登录 [Render](https://render.com)
3. 点击 "New +" -> "Web Service"
4. 连接GitHub仓库
5. 配置：
   - Name: resume-optimizer-api
   - Runtime: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. 添加环境变量：
   - `DEEPSEEK_API_KEY`: 你的DeepSeek API Key
7. 点击 "Create Web Service"

## 前端部署到 Vercel

1. 将代码推送到GitHub仓库
2. 登录 [Vercel](https://vercel.com)
3. 点击 "New Project"
4. 导入GitHub仓库
5. 配置：
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: `npm run build`
   - Output Directory: dist
6. 添加环境变量：
   - `VITE_API_BASE_URL`: https://resume-optimizer-api.onrender.com
7. 点击 "Deploy"

## 本地开发

### 后端
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 前端
```bash
cd frontend
npm install
npm run dev
```

## 环境变量

### 后端 (.env)
```
DEEPSEEK_API_KEY=your_api_key_here
DEEPSEEK_API_URL=https://api.deepseek.com
```

### 前端 (.env)
```
VITE_API_BASE_URL=http://localhost:8000
```
