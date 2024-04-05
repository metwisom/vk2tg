export interface VkAnswer {
	response: Response;
}

export interface Response {
	count: number;
	items: (ItemsEntity)[];
}

export interface ItemsEntity {
	id: number;
	from_id: number;
	owner_id: number;
	date: number;
	marked_as_ads: number;
	edited?: number | null;
	post_type: string;
	text: string;
	is_pinned?: number | null;
	attachments?: (AttachmentsEntity)[] | null;
	post_source: PostSource;
	comments: Comments;
	likes: Likes;
	reposts: Reposts;
	views: Views;
	donut: Donut;
	short_text_rate: number;
	carousel_offset?: number | null;
	hash: string;
}

export interface AttachmentsEntity {
	type: string;
	photo?: Photo | null;
	link?: Link | null;
	doc?: Doc | null;
}

export interface Photo {
	album_id: number;
	date: number;
	id: number;
	owner_id: number;
	access_key?: string | null;
	sizes?: (SizesEntity)[] | null;
	text: string;
	user_id: number;
	has_tags: boolean;
	post_id?: number | null;
	square_crop?: string | null;
}

export interface SizesEntity {
	height: number;
	type: string;
	width: number;
	url: string;
}

export interface Link {
	url: string;
	title: string;
	description: string;
	target?: string | null;
	caption?: string | null;
	photo?: Photo1 | null;
}

export interface Photo1 {
	album_id: number;
	date: number;
	id: number;
	owner_id: number;
	sizes?: (SizesEntity)[] | null;
	text: string;
	user_id: number;
	has_tags: boolean;
}

export interface Doc {
	id: number;
	owner_id: number;
	title: string;
	size: number;
	ext: string;
	date: number;
	type: number;
	url: string;
	access_key: string;
}

export interface PostSource {
	platform?: string | null;
	type: string;
	data?: string | null;
}

export interface Comments {
	can_post: number;
	count: number;
	groups_can_post: boolean;
}

export interface Likes {
	can_like: number;
	count: number;
	user_likes: number;
	can_publish: number;
}

export interface Reposts {
	count: number;
	user_reposted: number;
}

export interface Views {
	count: number;
}

export interface Donut {
	is_donut: boolean;
}
