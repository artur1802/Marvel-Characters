import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { fetchHero } from "../libs/utils";

export default function Herodetails() {
  // Retrieve the "id" parameter from the URL using the useParams hook from react-router-dom

  let { id } = useParams();

  // State to hold the hero data
  const [hero, setHero] = useState();

  // Use the useEffect hook to fetch the hero data when the component mounts

  useEffect(() => {
    fetchHero(id)
      .then(data => setHero(data[0]))
      .catch(err => console.error(err));
  }, []);


  // If the hero data is not yet available, return null or a loading indicator
  if (!hero) return;

  return (
    <div className="container large">
      <div className="hero__details-container">
        <img
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt="hero full size" />
        <div className="hero__details">
          <h4>Name</h4>
          <p>{hero.name}</p>
          {hero.description ? (
            <>
              <h4>Description</h4>
              <p>{hero.description}</p>
            </>
          ) : null}
          <div className="hero__series">
            <h4>Series</h4>
            <ul>
              {hero.series.items.map((s) => (
                <li key={Math.random() * 1000}>{s.name}</li>
              ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}