import React, {useState, useEffect} from "react";
import SingleCard from "./SingleCard/SingleCard";
import "./matching_game.css";
import {Grow} from "@mui/material"
import { Link } from 'react-router-dom';


const cardImage = [
    {"src": '/img/card1-matching-game.png', matched: false, alt: 'the_original'}, 
    {"src": '/img/card3-matching-game.png', matched: false, alt: 'russian_translation'}, 
    {"src": '/img/card5-matching-game.png', matched: false, alt: 'religion'},
    {"src": '/img/card7-matching-game.png', matched: false, alt: 'impeccable'}, 
    {"src": '/img/card9-matching-game.png', matched: false, alt: 'ideological_opposition'}, 
    {"src": '/img/card11-matching-game.png', matched: false, alt: 'ideals'}, 
];

const cardImage_2 = [
    {"src": '/img/card2-matching-game.png', matched: false, alt: 'the_original'},
    {"src": '/img/card4-matching-game.png', matched: false, alt: 'russian_translation'},
    {"src": '/img/card6-matching-game.png', matched: false, alt: 'religion'},
    {"src": '/img/card8-matching-game.png', matched: false, alt: 'impeccable'},
    {"src": '/img/card10-matching-game.png', matched: false, alt: 'ideological_opposition'},
    {"src": '/img/card12-matching-game.png', matched: false, alt: 'ideals'},
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
                if (choiceOne.alt === "the_original") {
                    setUnlockS1(true);
                } else if (choiceOne.alt === "russian_translation") {
                    setUnlockS2(true);
                } else if (choiceOne.alt === "religion") {
                    setUnlockS3(true);
                } else if (choiceOne.alt === "impeccable") {
                    setUnlockS4(true);
                } else if (choiceOne.alt === "ideals") {
                    setUnlockS5(true);
                } else if (choiceOne.alt === "ideological_opposition") {
                    setUnlockS6(true);
                }
                resetTurn();
                countPairs();
            } else {
                setTimeout(() => {
                    resetTurn();
                }, 5000);
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
                <div classname="matching_desc">
                    <h1 className="matching_game-title">Play a game, discover typical manipulation</h1>
                    <p className="sub-title-game">
                    Stories behind white papers
                    </p>
                    <p className="sub-title-game">After each flip, you have around five seconds to read the card</p>
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
                                            //if two cards matached, they won't be flipped to backside; if not matched, they would flip backside.
                                            //if clicking one card, you can flip it to frontside
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
                                <p className="storyText">Estonian translators in Soviet Estonia could translate literature, referring to the original. Retaining the original text that was neither ideologically dangerous nor sensitive is a strategy to negate nagetive influences from strict censorship. For instance, Semper translated Pablo Neruda's poems directly from the original. But he still faced attack after the translation was published. What happened on earth?</p>
                                
                                <img className="illustration_1" src="https://www.digar.ee/arhiiv/covers/9/4/2/195249/full.jpg" alt="NerudaTranslation" />
                                
                            </div>
                        </>)}
                        {unlockS2 && (
                        <>
                            {/*<img src={storyBoard[1].src} alt="story2" />*/}
                            <div className="storyContent">
                                <h3>The 2nd Story</h3>
                                <p className="storyText">Semper &#40;image below&#41; received censure from the State Publishing House because he unsettled the assumption: Neruda is pro-communism, and thus translating his work into Russian and referring to the Russian translation were the optimum. This manufactured narration was vulnerable to Semper's work which was under suspicion of dedication to the Western world outside USSR. Any sign of turning direction is likely to mar the imagination that "we are one".</p>
                                <img className="illustration_2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReBhoxnDS-EV03gPhIXFEZQ9ViExzdfPK9IQ&usqp=CAU" alt="Semper" />
                            </div>
                        </>)}
                        {unlockS3 && (
                        <>
                            {/*<img src={storyBoard[2].src} alt="story3" />*/}
                            <div className="storyContent">
                                <h3>The 3rd Story</h3>
                                <p className="storyText">In translating children's literature which should be far less ideologically dangerous, tranlators still had to winnow text that contradicts communist culture. One target is religion-related content. For instance, words like "God" and "Paradise". In translating Rodari's "The Adventures of Cipollino, Kurtna referred to the Russian translation, omitting religion-related text. Religion censorship was prevalent in communist countries.</p>
                                <img className="illustration_3" src="https://vaimuvara.ee/wp-content/uploads/2020/05/Gianni-Rodari-Cipollino-seiklused.jpg" alt="onionAdventure" />
                            </div>
                        </>)}
                        {unlockS4 && (
                        <>
                            {/*<img src={storyBoard[3].src} alt="story4" />*/}
                            <div className="storyContent">
                                <h3>The 4th Story</h3>
                                <p className="storyText">Another standard that translators had to follow was to remove or rewrite text suspected to tarnish the representation of Russians and communists. Despite being popular in the USSR and other Eastern Pact countries, Hemingway's works suffered rewriting. For instance, in "For Whom the Bell Tolls", the character's recollection of Karkov &#40;the well-connected Russian correspondent&#41;'s bad teeth and the plot of Karkov living with wife and mistress could never remain. The <a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/General_Directorate_for_the_Protection_of_State_Secrets_in_the_Press">Glavlit</a> weighed heavily on any subtle change that might preclude generating correct Russian characters.</p>
                                <img className="illustration_4" src="https://static.dw.com/image/19386329_804.jpg" alt="hemingway" />
                            </div>
                        </>)}
                        {unlockS5 && (
                        <>
                            <div className="storyContent">
                                <h3>The 5th Story</h3>
                                <p className="storyText">Rewriting also serves to reinforce the ideal of communism and make it self-evident. "Our common cause", this word is the usual worn-out cliché in the Russian press. The case study "Hemingway's Transformations in Soviet Union" points out that "our common cause" or "the common cause" suggests no need to explain what is that cause and why it is good. This case reveals that censorship manipulation means not only omitting text the communist authority will never expect to see but also rewriting and re-producing new text. Rewriting can pass deleted text in an obscure manner or strengthen the ideology.</p>
                                <img className="illustration_5" src="https://osta.img-bcg.eu/item/13/5581/29005581.jpg" alt="hemingwaytranslation" />
                            </div>
                        </>)}
                        {unlockS6 && (
                        <>
                            <div className="storyContent">
                                <h3>The 6th Story</h3>
                                <p className="storyText">Another feature of censorship manipulation was to enforce the ideological opposition. Not only can it be as complicated as the conflict between communist countries and the Western world, but also the daily opposition between right and wrong. Let's go back to the Estonian translation of "The Adventures of Cipollino". There is no modifier before "Prince Lemon" in the original; in the Russian translation, negative adjectives "arrogant, cruel, but cowardly" were added. This strategy forms the stark contrast between good and bad characters, thus strengthening the ideological struggle.</p>
                                <img className="illustration_6" src="http://media.voog.com/0000/0040/2501/photos/Aleksander%20Kurtna.jpg" alt="kurtna" />
                            </div>
                        </>)}
                    </div>
                </Grow>
                <Grow in>
                    <div className="container_d">{
                        pairs === 6 && (
                            <>
                                <p className="textGuide">
                                    If you want to know more about censorship manipulations, let's play a role of the editor in the Glavlit. 
                                    <br />
                                    <Link className="linkToBL" to="/booklist">Let's go</Link>
                                </p>
                                
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
