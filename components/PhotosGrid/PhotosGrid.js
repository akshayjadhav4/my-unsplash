import React from "react";
import styles from "./PhotosGrid.module.css";
import Masonry from "react-masonry-css";
const LoaderSkeleton = ({ data }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="mt-4">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.mymasonrygrid}
        columnClassName={styles.mymasonrygrid_column}
      >
        {data.map((photo) => (
          <div className="relative group bg-black" key={photo.id}>
            <img
              src={photo.photoURL}
              alt={photo.label}
              className="group-hover:opacity-75"
            />
            <h4 className="absolute bottom-0 p-3 text-white font-semibold opacity-0 group-hover:opacity-80">
              {photo.label}
            </h4>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default LoaderSkeleton;