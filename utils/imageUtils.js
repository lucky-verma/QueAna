export function generateS3Link(url) {
  return `https://${process.env.VUE_APP_AWS_BUCKET_NAME}.s3.${process.env.VUE_APP_REGION}.amazonaws.com${url}`;
}

export const product_picture_folder = "/machine/images";
export const product_picture_link = "machine/images";

export const variant_picture_folder = "/variants/images";
export const variant_picture_link = "variants/images";

export const collection_picture_folder = "/collections/images";
export const collection_picture_link = "collections/images";

export const category_picture_folder = "/category/reference-images";
export const category_picture_link = "category/reference-images";

export const store_picture_folder = "/store/images";
export const store_picture_link = "store/images";

export const brand_picture_folder = "/brand/images";
export const brand_picture_link = "brand/images";
