// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getPhotos } from "../../utils/db";

export default async (_, res) => {
  try {
    const { photos } = await getPhotos();
    res.status(200).json({ photos });
  } catch (error) {
    res.status(500).json({ error: "ERROR WHILE FETCHING PHOTOS" });
  }
};
