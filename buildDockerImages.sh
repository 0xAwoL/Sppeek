#!/bin/bash

# Folder names
folders=("chat" "expressauth" "database" "webclient")

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
