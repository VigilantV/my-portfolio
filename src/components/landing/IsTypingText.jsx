import { useState, useEffect } from "react";

import isTypingAnimation from "../../animations/isTypingAnimation";

import classes from "../../styles/landing.module.scss";

const IsTyping = ({ showScrollAnimation, landingAnimationRef }) => {
  const texts = new Array(
    "Did you checkout the hidden shortcut",
    "to my resume? ",
    "If not, hover on my name to see the magic!"
  );

  const [isTypingStart, setIsTypingStart] = useState(false);
  const [whichText, setWhichText] = useState(0);
  const [textId, setTextId] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingLines, setTypingLines] = useState(["", "", ""]);
  const [characterDelay, setCharacterDelay] = useState(55);

  useEffect(() => {
    if (showScrollAnimation) {
      setTimeout(() => {
        setIsTypingStart(true);
      }, 4500);
    }
  }, [showScrollAnimation]);

  useEffect(() => {
    if (isTypingStart) {
      let ctx = isTypingAnimation(textId, landingAnimationRef);
      return () => ctx.revert();
    }
  }, [textId, isTypingStart]);

  const characterDelayHandnler = () => {
    if (characterDelay !== 55) {
      setCharacterDelay(55);
    } else if (whichText === 1 && currentIndex === 12) {
      setCharacterDelay(1500);
    } else if (whichText === 2 && currentIndex === 6) {
      setCharacterDelay(1000);
    }
  };

  useEffect(() => {
    switch (whichText) {
      case 0:
        setTextId("#first_line");
        break;
      case 1:
        setTextId("#second_line");
        break;
      case 2:
        setTextId("#third_line");
        break;
    }
  }, [whichText]);

  useEffect(() => {
    if (isTypingStart) {
      characterDelayHandnler();
      if (currentIndex < texts[whichText].length) {
        const timeout = setTimeout(() => {
          setTypingLines((prevTexts) => ({
            ...prevTexts,
            [whichText]: prevTexts[whichText] + texts[whichText][currentIndex],
          }));
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, characterDelay);

        return () => clearTimeout(timeout);
      } else if (whichText !== texts.length - 1) {
        setCurrentIndex(0);
        setWhichText((prevValue) => prevValue + 1);
      }
    }
  }, [typingLines, currentIndex, whichText, isTypingStart]);

  return (
    <div className={classes.is_typing}>
      <p id="first_line">{typingLines[0]}</p>
      <p id="second_line">{typingLines[1]}</p>
      <p id="third_line">{typingLines[2]}</p>
    </div>
  );
};

export default IsTyping;
