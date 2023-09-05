import i18next from 'i18next';
import {CommentModel, PostModel, UserModel} from '../../model';
import {
  PostDetailsListItemModel,
  PostDetailsListModel,
} from './post-details.types';

export const postDetailListAdapter: (
  post: PostModel,
  user: UserModel,
  comments: CommentModel[],
) => PostDetailsListModel[] = (post, user, comments) => {
  const commentsListModel: PostDetailsListItemModel[] = comments.map(
    comment => ({
      id: `comment_${comment.id}`,
      cell: 'comment',
      data: comment,
    }),
  );

  const sectionListModel: PostDetailsListModel[] = [
    {
      data: [
        {
          id: `post_${post.id}`,
          cell: 'post',
          data: post,
        },
        {
          id: `user_${user.id}`,
          cell: 'user',
          data: user,
        },
      ],
    },
    {
      title: i18next.t('post.details.comment.section.title'),
      data: commentsListModel,
    },
  ];
  return sectionListModel;
};
