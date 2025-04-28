import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingCardProps {
	title: string;
	price: string;
	period?: string;
	description: string;
	features: string[];
	buttonText: string;
	buttonVariant: "default" | "outline";
	href: string;
	popular?: boolean;
}

export function PricingCard({
	title,
	price,
	period,
	description,
	features,
	buttonText,
	buttonVariant,
	href,
	popular = false,
}: PricingCardProps) {
	return (
		<Card
			className={`flex flex-col ${popular ? "border-primary shadow-lg relative" : ""}`}
		>
			{popular && (
				<div className="absolute -top-4 left-0 right-0 flex justify-center">
					<div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
						Most Popular
					</div>
				</div>
			)}
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<div className="mt-4 flex items-baseline">
					<span className="text-3xl font-bold">{price}</span>
					{period && (
						<span className="ml-1 text-sm text-muted-foreground">{period}</span>
					)}
				</div>
				<CardDescription className="mt-2">{description}</CardDescription>
			</CardHeader>
			<CardContent className="flex-1">
				<ul className="space-y-3">
					{features.map((feature, index) => (
						<li
							key={index}
							className="flex items-start"
						>
							<Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
							<span className="text-sm">{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter>
				<Link
					href={href}
					className="w-full"
				>
					<Button
						variant={buttonVariant}
						className={`w-full ${buttonVariant === "default" ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600" : ""}`}
					>
						{buttonText}
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
