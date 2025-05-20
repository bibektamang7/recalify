import { Loader } from "lucide-react";
const MyLoader = () => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<Loader className="animate-spin" />;
		</div>
	);
};

export default MyLoader;
