"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, Star, LogOut } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

const DashboardSidebar = () => {
	const session = useSession();
	const pathname = usePathname();

	const isActive = (path: string) => {
		return pathname === path || pathname?.startsWith(`${path}/`);
	};

	return (
		<Sidebar>
			<SidebarHeader className="border-b border-border/40 py-4">
				<Link
					href="/dashboard"
					className="flex items-center gap-2 px-2"
				>
					<div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
						<div className="absolute inset-0 flex items-center justify-center text-white font-bold">
							R
						</div>
					</div>
					<span className="font-bold text-xl">Recalify AI</span>
				</Link>
			</SidebarHeader>
			<SidebarContent className="mt-2 px-2">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							isActive={isActive("/dashboard")}
						>
							<Link href="/dashboard">
								<Home className="h-5 w-5" />
								<span>Overview</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							isActive={isActive("/dashboard/new-meeting")}
						>
							<Link href="/dashboard/new-meeting">
								<Plus className="h-5 w-5" />
								<span>New Meeting</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							isActive={isActive("/dashboard/favorites")}
						>
							<Link href="/dashboard/favorites">
								<Star className="h-5 w-5" />
								<span>Favorites</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter className="border-t border-border/40 p-4">
				<div className="flex items-center gap-3 px-2">
					<Avatar>
						<AvatarImage
							src="/placeholder.svg?height=32&width=32"
							alt="User"
						/>
						<AvatarFallback>JD</AvatarFallback>
					</Avatar>
					<div className="flex-1 overflow-hidden">
						<p className="text-sm font-medium leading-none truncate">
							{session.data?.user?.name}
						</p>
						<p className="text-xs text-muted-foreground truncate">
							{session.data?.user?.email}
						</p>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="hover:cursor-pointer"
						onClick={async () => await signOut({ redirectTo: "/" })}
					>
						<LogOut className="h-5 w-5" />
					</Button>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
};
export default DashboardSidebar;
