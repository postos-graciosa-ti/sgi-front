# Usa uma imagem oficial do Node.js como base
FROM node:18-alpine as builder

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o package.json e package-lock.json
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Constrói a aplicação Vite
RUN npm run build

# Usa uma imagem leve do Nginx para servir os arquivos construídos
FROM nginx:alpine

# Copia os arquivos construídos da etapa anterior para o diretório do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]