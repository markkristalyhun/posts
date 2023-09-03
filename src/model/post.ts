export interface PostModel {
  readonly userId: number;
  readonly id: number;
  readonly title: string;
  readonly body: string;
  favourite?: boolean;
}
