FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=frontend /app/build /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]