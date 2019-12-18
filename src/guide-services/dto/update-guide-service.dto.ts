export class UpdateGuideServiceDto {
    readonly title: string;
    readonly description: string;
    readonly eventDate: string;
    readonly phone: string;
    readonly address: string;
    readonly user_id: number;
    readonly categories_id: number[];
    readonly images: string[];
}