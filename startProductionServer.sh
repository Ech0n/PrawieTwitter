#!/bin/bash

IMAGE_NAME="prawie_twitter_image"
CONTAINER_NAME="prawie_twitter_container"
DOCKERFILE_PATH="."

IMAGE_EXISTS=$(docker images -q $IMAGE_NAME)

CONTAINER_RUNNING=$(docker ps -q -f name=$CONTAINER_NAME)

docker buildx build -t $IMAGE_NAME $DOCKERFILE_PATH



echo "Starting the container..."
docker run --rm -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME