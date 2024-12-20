FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# เพิ่ม ARG และตั้งค่า ENV
ARG PORT=3000
ENV PORT=${PORT}

# กำหนด port ที่ container จะ expose
EXPOSE ${PORT}

# คำสั่งเริ่มโปรแกรม
CMD ["npm", "run dev"]
