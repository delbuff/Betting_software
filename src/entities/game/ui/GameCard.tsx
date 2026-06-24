import {IMAGE_URL} from "../../../shared/constants";
import {Game} from "../game.types";
import React from "react";
interface Props {
    game: Game
}

export const GameCard = ({ game }: Props) => {
    const { gameID, gameName } = game
    const imageSrc = `${IMAGE_URL}/${gameID}.png`
    return (
        <div className="game-card">
            <img
                src={imageSrc}
                alt={gameName}
                loading="lazy"
                className="game-card__image"
            />
            <div className="game-card__title">{gameName}</div>
        </div>
    )
}