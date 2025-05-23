import type { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<SidebarProvider>
				<div className="flex min-h-screen flex-col w-full">
					{/* <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
					<div className="container flex h-14 items-center">
					
					</div>
				</header> */}
					<div className="flex flex-1">
						<DashboardSidebar />
						<main className="flex-1 p-4 md:p-6">{children}</main>
					</div>
				</div>
			</SidebarProvider>
		</SessionProvider>
	);
};

export default DashboardLayout;
