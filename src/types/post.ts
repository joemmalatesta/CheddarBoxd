export interface Post {
    imageUrl: string,
    cheeseType: string, 
    title: string,
	rating: number;
	winePairing?: string | undefined;
	comment?: string | undefined;
	postedAt: string;
	postedBy: string;
	postedByImg: string;
}
