import {CommentModel, PostModel, UserModel} from '../../model';

type CellType = 'user' | 'comment' | 'post';

export interface PostDetailsListItemModel {
  id: string;
  cell: CellType;
  data: UserModel | CommentModel | PostModel;
}

export interface PostDetailsListModel {
  title?: string;
  data: PostDetailsListItemModel[];
}
