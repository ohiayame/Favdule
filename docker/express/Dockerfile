FROM node:20

WORKDIR /app

# backend 폴더 안 package.json 복사
COPY backend/package*.json ./

RUN npm install

# backend 코드 복사
COPY backend ./

# 포트 지정 (Express 서버 실행 포트)
EXPOSE 4000

# 운영 환경 실행 (보통 npm start)
CMD ["npm", "start"]

# FROM node:20

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 4000
# CMD ["npm", "run", "dev"]

