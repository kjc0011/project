# Step 1: Node.js 16 이미지 사용
FROM node:16

# Step 2: 작업 디렉토리 설정
WORKDIR /app

# Step 3: package.json, package-lock.json 복사 및 의존성 설치
COPY package.json package-lock.json ./
RUN npm install --omit=dev --unsafe-perm  # 개발 의존성 제외하고 설치

# Step 4: 프론트엔드 코드 복사 및 설치
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm install --omit=dev --unsafe-perm  # 개발 의존성 제외하고 설치

# Step 5: 백엔드 코드 복사 및 실행 준비
WORKDIR /app
COPY backend ./backend

# Step 6: 환경 변수 설정
ENV PORT=8080
ENV NODE_ENV=production

# Step 7: 백엔드 실행
CMD ["npm", "start"]


