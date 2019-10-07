export class CreatePostDto {
    readonly title: string;
    readonly content: string;
    readonly user_id: number;
    readonly categories: number[];
}