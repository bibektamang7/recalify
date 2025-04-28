import Header from "@/components/home/Header";
import Main from "@/components/home/Main";
import Footer from "@/components/home/Footer";

export default function Home() {
	return (
		<div className="w-full flex min-h-screen flex-col overflow-hidden">
			<Header />
			<Main />
			<Footer />
		</div>
	);
}
