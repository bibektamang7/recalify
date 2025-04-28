import Header from "@/components/home/Header";
import Main from "@/components/home/Main";
import Footer from "@/components/home/Footer";

export default function Home() {
	return (
		<div className="relative w-full flex min-h-screen flex-col">
			<Header />
			<Main />
			<Footer />
		</div>
	);
}
