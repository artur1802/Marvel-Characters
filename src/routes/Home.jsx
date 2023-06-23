import React, { useState } from "react";

import Container from "../components/Container";
import SearchBar from "../components/SearchBar";
import Grid from '../components/Grid';
import Card from "../components/Card";


const IMAGE_SIZE = 'portrait_uncanny';

export default function Home() {

    // State to hold the array of heroesportrait_incredible
    const [heroes, setHeroes] = useState([]);

    let cards;

    // If there are heroes in the array, create Card components for each hero
    if (heroes) {

        cards = heroes.map((hero) => (


            <Card
                name={hero.name}
                id={hero.id}
                key={hero.id}
                thumbnail={`${hero.thumbnail.path}/${IMAGE_SIZE}.${hero.thumbnail.extension}`}
            />
        ));

    }
    return (
        <Container >
            <div className="menu">


                <div className="tittle">
                    <h1>Discover Marvel Heroes</h1>

                </div>
                <div>
                    <SearchBar setter={setHeroes} />
                </div>

            </div>

            <Grid>
                {cards ? cards : null}
            </Grid>

        </Container>
    );
}