export interface RepliesDto {
  userId: string;
  commentReplie: string;
  usingProduct: number;
  likes: Array<string>;
  createdAt: string;
}

export interface ProductCommentsDto {
  userId: string;
  userComment: string;
  usingProduct: number;
  likes: Array<string>;
  replies: Array<RepliesDto>;
  createdAt: string;
}

export interface AddCommentDto {
  productId: string;
  productComment: {
    userId: string;
    userComment: string;
  };
}
