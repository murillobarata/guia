
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Post {
    id?: number;
    title?: string;
    content?: string;
}

export abstract class IQuery {
    abstract getPosts(): Post[] | Promise<Post[]>;

    abstract post(id: string): Post | Promise<Post>;
}
