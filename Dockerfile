# Etapa 1: build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: servidor estático
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración custom de Nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD sh -c 'echo "Frontend corriendo en http://localhost:3001" && nginx -g "daemon off;"'
