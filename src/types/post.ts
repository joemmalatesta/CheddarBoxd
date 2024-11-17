export interface Post {
    imageUrl: string,
    cheeseType: string, 
    title: string,
	rating: number;
	winePairing?: string | undefined;
	comment?: string | undefined;
}