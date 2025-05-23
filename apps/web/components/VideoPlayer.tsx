import React from "react";

const VideoPlayer = ({
	url,
	videoRef,
}: {
	url: string;
	videoRef: React.Ref<HTMLVideoElement>;
}) => {
	return (
		<div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
			<video
				ref={videoRef}
				controls
				className="w-full h-full object-cover"
			>
				<source src={url} />
			</video>
		</div>
	);
};

export default VideoPlayer;
