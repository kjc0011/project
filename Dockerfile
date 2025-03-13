# Step 1: Node.js 16 이미지 사용
FROM node:16

# Step 2: 작업 디렉토리 설정
WORKDIR /app

# Step 3: package.json 복사 및 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# Step 4: 프론트엔드 코드 복사 (Webpack 빌드 과정 제거)
COPY frontend ./frontend

# Step 5: 백엔드 코드 복사
COPY backend ./backend

# Step 6: 환경 변수 설정
ENV PORT=5000
ENV NODE_ENV=production

# Step 7: 백엔드 실행 (정적 파일 제공)
CMD ["node", "backend/server.js"]