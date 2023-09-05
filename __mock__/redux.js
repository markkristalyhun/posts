export const useDeletePostMutation = () => {
  const deletePost = async ({id}) => {
    const success = true;

    if (success) {
      return {success: true};
    } else {
      return {success: false, error: 'Delete failed'};
    }
  };

  return [deletePost, {isLoading: false, isError: false}];
};
