FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=/api/v1
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production BIOLIFE_HOST=0.0.0.0 BIOLIFE_PORT=8787
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY server.js ai.js auth.js storage.js telegram.js env.js ./
COPY db ./db
EXPOSE 8787
CMD ["node","server.js"]
