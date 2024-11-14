FROM  oven/bun:alpine@sha256:490d28250f51bf30fd88c3277f43c2c2bd721599d9ae373458c487d27bcb10f3

WORKDIR /home/bun/app
COPY tsconfig.json ./
COPY src/ ./src/
COPY scripts/ ./scripts/
COPY package.json bun.lockb ./

ENV NODE_ENV=production
RUN bun install

ENTRYPOINT ["bun"]
CMD ["start"]
