import React from "react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="border-t border-border/40 bg-background/95">
			<div className=" py-8">
				<div className="grid gap-8 md:grid-cols-4">
					<div>
						<Link
							href="/"
							className="flex items-center gap-2 mb-4"
						>
							<div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
								<div className="absolute inset-0 flex items-center justify-center text-white font-bold">
									F
								</div>
							</div>
							<span className="font-bold text-xl">Recalify AI</span>
						</Link>
						<p className="text-sm text-muted-foreground">
							Record, transcribe, and summarize your meetings with AI
						</p>
					</div>
					<div>
						<h3 className="mb-4 text-sm font-semibold">Product</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="#features"
									className="text-muted-foreground hover:text-foreground"
								>
									Features
								</Link>
							</li>
							<li>
								<Link
									href="#pricing"
									className="text-muted-foreground hover:text-foreground"
								>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Integrations
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Changelog
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-4 text-sm font-semibold">Resources</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="#blog"
									className="text-muted-foreground hover:text-foreground"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Documentation
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Help Center
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Community
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-4 text-sm font-semibold">Company</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									About
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Careers
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Contact
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Legal
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
					<p>© {new Date().getFullYear()} Recalify AI. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
