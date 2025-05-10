BASE_DIR=$(pwd)

# define the list of services and paths to their dockerfiles
SERVICES=(
	"packages/recording-bot"
)

# loop through each service and build the docker image
for SERVICE in "${SERVICES[@]}"; do
	# define the path to the dockerfile
	DOCKERFILE_PATH="$BASE_DIR/$SERVICE/Dockerfile"
	echo $BASE_DIR

	# check if the dockerfile exists in the directory
	if [ -f "$DOCKERFILE_PATH" ]; then
		# get the service name
		SERVICE_NAME=$(basename "$SERVICE")

		# build the docker image
		echo "building docker image for $SERVICE_NAME..."

		docker build -t "$SERVICE_NAME" "$BASE_DIR/$SERVICE"

	else
		echo "No dockerfile found for $DOCKERFILE_PATH, skipping."
	fi
done

echo "Docker images build successfully."