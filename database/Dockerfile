FROM postgres
ENV POSTGRES_USER postgres
ENV POSTGRES_DB main
# Should be the same as in the expressauth service .env file
ENV POSTGRES_PASSWORD your_db_password 
ADD create_tables.sql /docker-entrypoint-initdb.d/
