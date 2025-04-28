import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarPortal,
	MenubarTrigger,
} from "../ui/menubar";
import { ListCollapse, Menu, Newspaper, RussianRuble } from "lucide-react";

const Header = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="w-full flex h-16 items-center justify-between lg:px-20">
				<div className="flex items-center gap-6">
					<Link
						href="/"
						className="flex items-center gap-2"
					>
						<div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
							<div className="absolute inset-0 flex items-center justify-center text-white font-bold">
								R
							</div>
						</div>
						<span className="font-bold text-xl">Recalify</span>
					</Link>
				</div>
				<nav className="hidden md:flex gap-16">
					<Link
						href="#features"
						className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						Features
					</Link>
					<Link
						href="#pricing"
						className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						Pricing
					</Link>
					<Link
						href="#blog"
						className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						Blog
					</Link>
				</nav>
				<div className="hidden md:flex items-center gap-4">
					<Link href="/login">
						<Button
							variant="ghost"
							size="sm"
						>
							Log in
						</Button>
					</Link>
					<Link href="/signup">
						<Button
							size="sm"
							className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
						>
							Sign up
						</Button>
					</Link>
				</div>

				<Menubar className="md:hidden block">
					<MenubarMenu>
						<MenubarTrigger className="hover:cursor-pointer">
							<Menu />
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem className="hover:text-indigo-500">
								<Link
									href={`#features`}
									className=" flex items-center gap-2"
								>
									<ListCollapse />
									Features
								</Link>
							</MenubarItem>
							<MenubarItem className="hover:text-indigo-500">
								<Link
									href={`#pricing`}
									className=" flex items-center gap-2"
								>
									<RussianRuble />
									Pricing
								</Link>
							</MenubarItem>
							<MenubarItem className="hover:text-indigo-500">
								<Link
									href={`#blog`}
									className=" flex items-center gap-2"
								>
									<Newspaper />
									Blog
								</Link>
							</MenubarItem>
							<MenubarItem className="hover:text-indigo-500">
								<Link
									href={`/login`}
								>
									Login
								</Link>
							</MenubarItem>
							<MenubarItem className="hover:text-indigo-500">
								<Link
									href={`/signup`}
								>
									Signup
								</Link>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
			</div>
		</header>
	);
};

export default Header;
