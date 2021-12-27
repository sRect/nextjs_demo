# 1. 构建基础镜像
FROM alpine:3.15 AS base
#纯净版镜像

ENV NODE_ENV=production \
  APP_PATH=/app

WORKDIR $APP_PATH

# 使用国内镜像，加速下面 apk add下载安装alpine不稳定情况
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# 使用apk命令安装 nodejs 和 yarn
RUN apk add --no-cache --update nodejs=16.13.1-r0 yarn=1.22.17-r0

# 2. 基于基础镜像安装项目依赖
FROM base AS install

COPY package.json yarn.lock ./

RUN yarn install

# 3. 基于基础镜像进行最终构建
FROM base

# 拷贝 上面生成的 node_modules 文件夹复制到最终的工作目录下
COPY --from=install $APP_PATH/node_modules ./node_modules

# 拷贝当前目录下的所有文件(除了.dockerignore里排除的)，都拷贝到工作目录下
COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

# ===>3
# FROM alpine:3.15
# #纯净版镜像

# # 使用国内镜像，加速下面 apk add下载安装alpine不稳定情况
# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# # 使用apk命令安装 nodejs 和 yarn
# RUN apk add --no-cache --update nodejs=16.13.1-r0 yarn=1.22.17-r0

# EXPOSE 3000

# ENV NODE_ENV=production \
# APP_PATH=/app

# # 设置工作目录
# WORKDIR $APP_PATH

# COPY . $APP_PATH

# # 设置npm镜像为国内淘宝镜像，加快安装速度
# # RUN yarn config set registry https://registry.npm.taobao.org

# RUN yarn install

# RUN yarn run build

# CMD ["yarn", "start"]

## ===>2
# FROM node:14-alpine
# COPY . /usr/share/nginx/next_js
# WORKDIR /usr/share/nginx/next_js
# RUN npm install
# RUN npm run build
# EXPOSE 3000
# CMD ["npm", "start"]

## ===>1
# https://www.nextjs.cn/docs/deployment#docker-image
# next.js官方提供的Dockerfile
# # Install dependencies only when needed
# FROM node:alpine AS deps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# # Rebuild the source code only when needed
# FROM node:alpine AS builder
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# # Production image, copy all the files and run next
# FROM node:alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# # You only need to copy next.config.js if you are NOT using the default configuration
# # COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# USER nextjs

# EXPOSE 80

# ENV PORT 80

# # Next.js collects completely anonymous telemetry data about general usage.
# # Learn more here: https://nextjs.org/telemetry
# # Uncomment the following line in case you want to disable telemetry.
# # ENV NEXT_TELEMETRY_DISABLED 1

# CMD ["node_modules/.bin/next", "start"]
