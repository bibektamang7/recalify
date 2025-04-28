import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { PricingCard } from "../pricing-card";
import { BlogCard } from "../blog-card";

const Main = () => {
	return (
		<main className="flex-1">
			<section className="relative overflow-hidden py-20 md:py-32">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
				<div className="relative z-10 w-full">
					<div className="mx-auto max-w-3xl text-center">
						<h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
							<span className="block">Never miss a detail in your</span>
							<span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
								meetings again
							</span>
						</h1>
						<p className="mb-10 text-xl text-muted-foreground">
							Recalify AI records, transcribes, and summarizes your meetings so
							you can focus on the conversation.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/signup">
								<Button
									size="lg"
									className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
								>
									Get started for free
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>
							<Link href="#features">
								<Button
									size="lg"
									variant="outline"
								>
									See how it works
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			<div className="xl:mx-20">
				<section id="features" className="py-20 bg-gradient-to-b from-background to-background/80">
					<div>
						<div className="mx-auto max-w-3xl text-center mb-16">
							<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
								<span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
									Powerful features
								</span>
							</h2>
							<p className="mt-4 text-lg text-muted-foreground">
								Everything you need to get more out of your meetings
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-3">
							{[
								{
									title: "Automatic Transcription",
									description:
										"Get accurate transcripts of your meetings in real-time with our advanced AI technology.",
									icon: "📝",
								},
								{
									title: "AI Summaries",
									description:
										"Receive concise summaries of your meetings, highlighting key points and action items.",
									icon: "✨",
								},
								{
									title: "Smart Search",
									description:
										"Quickly find what you're looking for with our powerful search functionality.",
									icon: "🔍",
								},
								{
									title: "Meeting Analytics",
									description:
										"Gain insights into your meetings with detailed analytics and metrics.",
									icon: "📊",
								},
								{
									title: "Collaborative Notes",
									description:
										"Take notes together in real-time and share them with your team.",
									icon: "👥",
								},
								{
									title: "Integrations",
									description:
										"Connect with your favorite tools like Google Meet, Zoom, and Microsoft Teams.",
									icon: "🔄",
								},
							].map((feature, index) => (
								<div
									key={index}
									className="rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-border"
								>
									<div className="mb-4 text-3xl">{feature.icon}</div>
									<h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
									<p className="text-muted-foreground">{feature.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="py-20" id="pricing">
					<div>
						<div className="mx-auto max-w-3xl text-center mb-16">
							<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
								<span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
									Simple, transparent pricing
								</span>
							</h2>
							<p className="mt-4 text-lg text-muted-foreground">
								No hidden fees, no surprises. Choose the plan that works for
								you.
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-3">
							<PricingCard
								title="Free"
								price="$0"
								description="Perfect for trying out Recalify AI"
								features={[
									"5 meeting recordings per month",
									"Basic transcription",
									"24-hour data retention",
									"Email support",
								]}
								buttonText="Get started"
								buttonVariant="outline"
								href="/signup"
							/>
							<PricingCard
								title="Pro"
								price="$19"
								period="per month"
								description="For individuals and small teams"
								features={[
									"50 meeting recordings per month",
									"Advanced transcription",
									"Unlimited data retention",
									"Priority support",
									"Custom meeting summaries",
								]}
								buttonText="Start free trial"
								buttonVariant="default"
								href="/signup"
								popular
							/>
							<PricingCard
								title="Enterprise"
								price="Custom"
								description="For organizations with advanced needs"
								features={[
									"Unlimited meeting recordings",
									"Premium transcription",
									"Advanced analytics",
									"Dedicated account manager",
									"Custom integrations",
									"SSO and advanced security",
								]}
								buttonText="Contact sales"
								buttonVariant="outline"
								href="/contact"
							/>
						</div>
					</div>
				</section>

				<section className="py-20 bg-gradient-to-b from-background/80 to-background" id="blog">
					<div>
						<div className="mx-auto max-w-3xl text-center mb-16">
							<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
								<span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
									Latest from our blog
								</span>
							</h2>
							<p className="mt-4 text-lg text-muted-foreground">
								Tips, tricks, and insights to help you get the most out of your
								meetings
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-3">
							<BlogCard
								title="How AI is Transforming Meeting Productivity"
								excerpt="Discover how artificial intelligence is revolutionizing the way we conduct and follow up on meetings."
								date="June 15, 2023"
								author="Sarah Johnson"
								authorImage="/placeholder.svg?height=40&width=40"
								slug="/blog/ai-transforming-meetings"
							/>
							<BlogCard
								title="5 Tips for More Effective Remote Meetings"
								excerpt="Learn how to make your remote meetings more engaging and productive with these simple tips."
								date="May 22, 2023"
								author="Michael Chen"
								authorImage="/placeholder.svg?height=40&width=40"
								slug="/blog/effective-remote-meetings"
							/>
							<BlogCard
								title="The Future of Meeting Transcription Technology"
								excerpt="Explore the latest advancements in transcription technology and what they mean for the future of meetings."
								date="April 10, 2023"
								author="Emily Rodriguez"
								authorImage="/placeholder.svg?height=40&width=40"
								slug="/blog/future-transcription-technology"
							/>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
};

export default Main;
