# Etapa única: producción con Bun
FROM oven/bun:1.2

WORKDIR /app

# Copiar dependencias
COPY package.json bun.lock ./

# Instalar dependencias
RUN bun install

# Copiar todo el código
COPY . .

# Build
RUN bun run build

# Exponer puerto 3000
EXPOSE 3000

# Start
CMD ["bun", "start"]

### mensaje de bienvenida
# RUN echo "Hello World"