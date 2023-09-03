export interface CommentModel {
  readonly postId: number;
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly body: string;
}
