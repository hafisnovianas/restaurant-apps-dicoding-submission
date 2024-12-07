const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
     <i class="fa fa-heart-o heart-icon" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart heart-icon" aria-hidden="true"></i>
  </button>
`;

export {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
