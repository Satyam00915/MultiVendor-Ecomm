import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadFile = async (file: Blob): Promise<string | null> => {
  if (!file) return null;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((res, rej) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            rej(error);
          } else {
            res(result?.secure_url as string);
          }
        },
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
