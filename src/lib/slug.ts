import slugify from "slugify";

const options = {
  remove: `/[*+~.()'"!:@]/g}`,
  lower: true,
  strict: true, // strip special characters except replacement, defaults to `false`
  replacement: "-", // replace spaces with replacement character, defaults to `-`
};

export const getASlug = (title: string): string => {
  return slugify(title);
};

export const addSlugToMissingPosts = () => {};
