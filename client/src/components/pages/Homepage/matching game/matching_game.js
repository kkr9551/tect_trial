import React, {useState, useEffect} from "react";
import SingleCard from "./SingleCard/SingleCard";
import "./matching_game.css";
import {Grow} from "@mui/material"



const cardImage = [
    {"src": '/img/card1.png', matched: false, alt: 'language'}, 
    {"src": '/img/card3.png', matched: false, alt: 'estrangement'}, 
    {"src": '/img/card5.png', matched: false, alt: 'shape_ideo'},
    {"src": '/img/card7.png', matched: false, alt: 'ideo'}, 
    {"src": '/img/card9.png', matched: false, alt: 'anachronism'}, 
    {"src": '/img/card11.png', matched: false, alt: 'subtle'}, 
];

const cardImage_2 = [
    {"src": '/img/card2.png', matched: false, alt: 'language'},
    {"src": '/img/card4.png', matched: false, alt: 'estrangement'},
    {"src": '/img/card6.png', matched: false, alt: 'shape_ideo'},
    {"src": '/img/card8.png', matched: false, alt: 'ideo'},
    {"src": '/img/card10.png', matched: false, alt: 'anachronism'},
    {"src": '/img/card12.png', matched: false, alt: 'subtle'},
];

/*const storyBoard = [
    {"src" : "/img/story1.png"},
    {"src" : "/img/story2.png"},
    {"src" : "/img/story3.png"},
    {"src" : "/img/story4.png"},
];*/

const Cardgame = () => {
    const [cards, setCards] = useState([]);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [turns, setTurns] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const [unlockS1, setUnlockS1] = useState(false);
    const [unlockS2, setUnlockS2] = useState(false);
    const [unlockS3, setUnlockS3] = useState(false);
    const [unlockS4, setUnlockS4] = useState(false);
    const [unlockS5, setUnlockS5] = useState(false);
    const [unlockS6, setUnlockS6] = useState(false);

    const [pairs, setPairs] = useState(0);

    //shuffling cards. 
    //Imagining the process of shuffling cards as the process of generating shadow copies of cardImages
    //so we use sort() and map()
    const shuffleCards = () => {
        const shuffledCards = [...cardImage, ...cardImage_2]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random()}))
        
        //everytime start the new game, the choice one and two will be reset, 
        //cards are shuffled again, and turns are reset
        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
        setUnlockS1(false);
        setUnlockS2(false);
        setUnlockS3(false);
        setUnlockS4(false);
        setUnlockS5(false);
        setUnlockS6(false);
        setPairs(0);
    };

    useEffect(() => {
        shuffleCards();
    }, []);
    
    //determine two choices per turn to be choice one or two
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    //comparing and matching cards
    useEffect(() => {
        //when the dependency array changes, we run the callback function inside useEffect
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.alt === choiceTwo.alt) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.alt === choiceOne.alt) {
                            return {...card, matched: true};
                        } else {
                            return card;
                        }
                    }); 
                });
                if (choiceOne.alt === "language") {
                    setUnlockS5(true);
                } else if (choiceOne.alt === "estrangement") {
                    setUnlockS1(true);
                } else if (choiceOne.alt === "shape_ideo") {
                    setUnlockS2(true);
                } else if (choiceOne.alt === "ideo") {
                    setUnlockS3(true);
                } else if (choiceOne.alt === "subtle") {
                    setUnlockS6(true);
                } else if (choiceOne.alt === "anachronism") {
                    setUnlockS4(true);
                }
                resetTurn();
                countPairs();
            } else {
                setTimeout(() => {
                    resetTurn();
                }, 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    };

    const countPairs = () => {
        setPairs(prevPairs => prevPairs + 1);
    }
    return(
        <>
            <div className="matching_game">
                <div className="matching_game-title">
                    <h1>Play a game, discover typical manipulation</h1>
                    <p className="sub-title-game">
                    Stories behind white papers
                    </p>
                </div>
                
                <button className="shuffle_btn" onClick={shuffleCards}>
                    New Game
                </button>

                <div className="card-grid">
                    {cards.map(card => (<SingleCard
                                            key={card.id}
                                            card={card}
                                            handleChoice={handleChoice}
                                            flipped={card === choiceOne || card === choiceTwo || card.matched}
                                            disabled={disabled} 
                                        />))
                    }
                </div>

                <div className="displayTurns">
                    <p className="turnsTitle">Turns: {turns}</p>
                    <p className="pairsTitle">Pairs: {pairs}</p>
                    <div>{pairs === 6 && (<>
                        <p>You win</p>
                    </>)}</div> 
                </div>
                <Grow in>
                    <div className='story_board'>
                        {unlockS1 && (
                        <>
                            {/*<img src={storyBoard[0].src} alt="story1" />*/}
                            <div className="storyContent">
                                <h3>The 1st Story</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque mi sed elit maximus, et malesuada neque ultricies. Pellentesque sit amet efficitur metus, interdum aliquam arcu. Etiam varius erat sapien, sit amet placerat augue efficitur vel. Curabitur in neque molestie, sodales elit ac, tincidunt ante. Nullam et nulla elementum, venenatis dui quis, aliquet risus. Pellentesque lacus lacus, maximus ut mauris in, volutpat congue dui. Donec facilisis justo eu lectus congue, fermentum faucibus magna vehicula.</p>
                                <button className="lmBtn">Learn more</button>
                            </div>
                        </>)}
                        {unlockS2 && (
                        <>
                            {/*<img src={storyBoard[1].src} alt="story2" />*/}
                            <div className="storyContent">
                                <h3>The 2nd Story</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque mi sed elit maximus, et malesuada neque ultricies. Pellentesque sit amet efficitur metus, interdum aliquam arcu. Etiam varius erat sapien, sit amet placerat augue efficitur vel. Curabitur in neque molestie, sodales elit ac, tincidunt ante. Nullam et nulla elementum, venenatis dui quis, aliquet risus. Pellentesque lacus lacus, maximus ut mauris in, volutpat congue dui. Donec facilisis justo eu lectus congue, fermentum faucibus magna vehicula.</p>
                                <button className="lmBtn">Learn more</button>
                            </div>
                        </>)}
                        {unlockS3 && (
                        <>
                            {/*<img src={storyBoard[2].src} alt="story3" />*/}
                            <div className="storyContent">
                                <h3>The 3rd Story</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque mi sed elit maximus, et malesuada neque ultricies. Pellentesque sit amet efficitur metus, interdum aliquam arcu. Etiam varius erat sapien, sit amet placerat augue efficitur vel. Curabitur in neque molestie, sodales elit ac, tincidunt ante. Nullam et nulla elementum, venenatis dui quis, aliquet risus. Pellentesque lacus lacus, maximus ut mauris in, volutpat congue dui. Donec facilisis justo eu lectus congue, fermentum faucibus magna vehicula.</p>
                                <button className="lmBtn">Learn more</button>
                            </div>
                        </>)}
                        {unlockS4 && (
                        <>
                            {/*<img src={storyBoard[3].src} alt="story4" />*/}
                            <div className="storyContent">
                                <h3>The 4th Story</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque mi sed elit maximus, et malesuada neque ultricies. Pellentesque sit amet efficitur metus, interdum aliquam arcu. Etiam varius erat sapien, sit amet placerat augue efficitur vel. Curabitur in neque molestie, sodales elit ac, tincidunt ante. Nullam et nulla elementum, venenatis dui quis, aliquet risus. Pellentesque lacus lacus, maximus ut mauris in, volutpat congue dui. Donec facilisis justo eu lectus congue, fermentum faucibus magna vehicula.</p>
                                <button className="lmBtn">Learn more</button>
                            </div>
                        </>)}
                        {unlockS5 && (
                        <>
                            <div className="storyContent">
                                <h3>The 5th Story</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque mi sed elit maximus, et malesuada neque ultricies. Pellentesque sit amet efficitur metus, interdum aliquam arcu. Etiam varius erat sapien, sit amet placerat augue efficitur vel. Curabitur in neque molestie, sodales elit ac, tincidunt ante. Nullam et nulla elementum, venenatis dui quis, aliquet risus. Pellentesque lacus lacus, maximus ut mauris in, volutpat congue dui. Donec facilisis justo eu lectus congue, fermentum faucibus magna vehicula.</p>
                                <button className="lmBtn">Learn more</button>
                            </div>
                        </>)}
                        {unlockS6 && (
                        <>
                            <div className="storyContent">
                                <h3>The 6th Story</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque mi sed elit maximus, et malesuada neque ultricies. Pellentesque sit amet efficitur metus, interdum aliquam arcu. Etiam varius erat sapien, sit amet placerat augue efficitur vel. Curabitur in neque molestie, sodales elit ac, tincidunt ante. Nullam et nulla elementum, venenatis dui quis, aliquet risus. Pellentesque lacus lacus, maximus ut mauris in, volutpat congue dui. Donec facilisis justo eu lectus congue, fermentum faucibus magna vehicula.</p>
                                <button className="lmBtn">Learn more</button>
                            </div>
                        </>)}
                    </div>
                </Grow>
                <Grow in>
                    <div className="container_d">{
                        pairs === 6 && (
                            <>
                                <p>
                                    If you would like to delve into stories behind these white papers, we recommend reading Prof. Monticelli's research papers and relative book chapters
                                </p>
                                <button>Learn more</button>
                            </>
                        )
                    }
                        
                    </div>
                </Grow>
            </div>
        </>
    );
};

export default Cardgame;
