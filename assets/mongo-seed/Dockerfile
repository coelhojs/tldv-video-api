FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db test --collection videos --type json --file /init.json --jsonArray