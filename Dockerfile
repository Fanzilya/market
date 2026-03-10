FROM node:20.19.5-alpine

WORKDIR /app

# Копируем package.json
COPY package*.json ./

# Устанавливаем ВСЕ зависимости (включая devDependencies)
RUN npm ci --include=dev

# Или так:
# RUN npm install

COPY . .

# Собираем приложение
RUN npm run build

EXPOSE 5013

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5013"]