import Link from "next/link";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";

interface BlogCardProps {
	title: string;
	excerpt: string;
	date: string;
	author: string;
	authorImage: string;
	slug: string;
}

export function BlogCard({
	title,
	excerpt,
	date,
	author,
	authorImage,
	slug,
}: BlogCardProps) {
	return (
		<Card className="overflow-hidden transition-all hover:shadow-md">
			<CardHeader className="p-0">
				<div className="h-48 w-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
					<div className="text-4xl">📝</div>
				</div>
			</CardHeader>
			<CardContent className="p-6">
				<div className="text-sm text-muted-foreground mb-2">{date}</div>
				<Link href={slug}>
					<h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
						{title}
					</h3>
				</Link>
				<p className="text-muted-foreground">{excerpt}</p>
			</CardContent>
			<CardFooter className="p-6 pt-0 flex items-center gap-3">
				<Image
					src={authorImage || "/placeholder.svg"}
					alt={author}
					width={32}
					height={32}
					className="rounded-full"
				/>
				<span className="text-sm font-medium">{author}</span>
			</CardFooter>
		</Card>
	);
}
