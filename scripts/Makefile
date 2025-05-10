# define the paths to your packages

PACKAGE_DIRS := \
./packages/recording-bot \


#define teh image names based on the package names

IMAGES := recording-bot

#default target: build all docker images

all: build

# build docker image for recording bot
recording-bot:
	@echo "Building docker image for recording-bot..."
	docker build -t recording-bot ./packages/recording-bot


# celan up images (optional)
clean:
	@echo "Removing docker images..."
	docker rmi ${IMAGES}

.PHONY: all build clean recording-bot