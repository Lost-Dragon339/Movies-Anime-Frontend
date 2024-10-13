import React, { useEffect, useState } from "react";

function AnimeListItem({title, description, imagesrc, hrefHiAnime}) {
  // console.log(hrefHiAnime);
  return (
    <>
      <div className="movie-list-item">
      <a href={`https://hianime.to/search?keyword=${hrefHiAnime}`} className="links" target="_blank"  >
        <img className="movie-list-item-img" src={imagesrc} alt={title} />
        
        <span className="movie-list-item-title">{title}</span>
        {/* <p className="movie-list-item-desc">{description}</p> */}
        </a>
      </div>
    </>
  );
}

export default AnimeListItem;
