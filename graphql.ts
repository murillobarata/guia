
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface Post {
    id?: number;
    title?: string;
    content?: string;
}

export interface IQuery {
    getPosts(): Post[] | Promise<Post[]>;
    post(id: string): Post | Promise<Post>;
}
