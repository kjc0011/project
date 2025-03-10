# Step 1: Node.js 16 이미지 사용
FROM node:16

# Step 2: 작업 디렉토리 설정
WORKDIR /app

# Step 3: package.json, package-lock.json 복사 및 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# Step 4: 프론트엔드 빌드
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Step 5: 프론트엔드 빌드 결과물을 백엔드 폴더로 이동 (백엔드가 정적 파일 제공)
WORKDIR /app
COPY backend ./backend
RUN mkdir -p backend/public && cp -r frontend/build/* backend/public/

# Step 6: 환경 변수 설정 (포트 설정 및 NODE_ENV 설정)
ENV PORT=5000
ENV NODE_ENV=production

# Step 7: 백엔드 실행
CMD ["node", "backend/server.js"]
