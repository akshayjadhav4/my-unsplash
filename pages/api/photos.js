// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getPhotos } from "../../utils/db";

export default async (_, res) => {
  const result = await getPhotos();
  if (result.error) {
    res.status(500).json({ error: result.error });
  }
  res.status(200).json({ photos: result.allPhotos });
};
