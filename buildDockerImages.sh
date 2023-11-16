#!/bin/bash

# Folder paths
folders=("chat" "expressauth" "database" "webclient")
# build dist folder in thses folders,  use correct npm run  
# change urls and only make dev in public repo ?? 

# Build Docker images in each folder
for folder in ${folders[@]}; do
    (docker image rm  -f "$folder")
    if [ "$folder" == "webclient" ]; then 
        (cd "$folder" && npm install && npm run buildDebug && docker build . -t "${folder}")
    elif [ "$folder" == "database" ]; then  
        (cd "$folder"  && docker build . -t "${folder}")
    else
        ( cd "$folder" && npm install && docker build . -t "${folder}" )
    fi
done

echo "Now run docker-compose up -d "
