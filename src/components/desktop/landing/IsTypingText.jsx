import { useState, useEffect, useRef } from "react";
import isTypingAnimation from "../../../animations/isTypingAnimation";
import classes from "../../../styles/desktop/landing.module.scss";
import clickSoundSrc from "../../../assests/keyboard_click.mp3";

const IsTyping = ({ showScrollAnimation, landingAnimationRef }) => {
  const texts = [
    "Did you checkout the hidden shortcut",
    "to my resume? ",
    "If not, hover on my name to see the magic!",
  ];

  const [isTypingStart, setIsTypingStart] = useState(false);
  const [whichText, setWhichText] = useState(0);
  const [textId, setTextId] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typingLines, setTypingLines] = useState(["", "", ""]);
  const [characterDelay, setCharacterDelay] = useState(55);

  const audioPoolRef = useRef([]);
  const poolIndexRef = useRef(0);
  const isAudioUnlockedRef = useRef(false);

  useEffect(() => {
    const poolSize = 6;
    const created = new Array(poolSize).fill(null).map(() => {
      const audio = new Audio(clickSoundSrc);
      audio.preload = "auto";
      audio.volume = 0.25;
      return audio;
    });
    audioPoolRef.current = created;

    return () => {
      // Cleanup
      audioPoolRef.current.forEach((a) => {
        try {
          a.pause();
          a.currentTime = 0;
        } catch (_) {}
      });
      audioPoolRef.current = [];
    };
  }, []);

  // Autoplay unlock on first user interaction (mouse click or keyboard only)
  useEffect(() => {
    if (isAudioUnlockedRef.current) return;

    const unlock = async () => {
      if (isAudioUnlockedRef.current) return;
      const pool = audioPoolRef.current;
      if (!pool.length) return;
      try {
        await pool[0].play();
        pool[0].pause();
        pool[0].currentTime = 0;
        isAudioUnlockedRef.current = true;
        ["mousedown", "keydown"].forEach((evt) =>
          window.removeEventListener(evt, unlock)
        );
      } catch (_) {
        // Ignore; keep listeners until a later gesture
      }
    };

    const add = (evt, opts) => window.addEventListener(evt, unlock, opts);
    add("mousedown", { once: false });
    add("keydown", { once: false });
    return () => {
      ["mousedown", "keydown"].forEach((evt) =>
        window.removeEventListener(evt, unlock)
      );
    };
  }, []);

  const playClickSound = () => {
    const pool = audioPoolRef.current;
    if (!pool.length) return;
    const index = poolIndexRef.current;
    poolIndexRef.current = (index + 1) % pool.length;
    const audio = pool[index];
    try {
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {});
      }
    } catch (_) {}
  };

  useEffect(() => {
    if (showScrollAnimation) {
      setTimeout(() => {
        setIsTypingStart(true);
      }, 1000);
    }
  }, [showScrollAnimation]);

  useEffect(() => {
    if (isTypingStart) {
      const ctx = isTypingAnimation(textId, landingAnimationRef);
      return () => ctx.revert();
    }
  }, [textId, isTypingStart]);

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

  const getRealisticTypingDelay = (char) => {
    if (char === "?") return 1000;
    if (char === ",") return 1300;
    if (char === " ") return Math.random() * 60 + 40;
    return Math.random() * 300 + 45;
  };

  const characterDelayHandnler = () => {
    if (currentCharIndex < texts[whichText].length) {
      const currentChar = texts[whichText][currentCharIndex];
      const targetDelay = getRealisticTypingDelay(currentChar);
      setCharacterDelay(targetDelay);
    }
  };

  useEffect(() => {
    if (isTypingStart) {
      characterDelayHandnler();
      if (currentCharIndex < texts[whichText].length) {
        const timeout = setTimeout(() => {
          const nextChar = texts[whichText][currentCharIndex];
          setTypingLines((prevTexts) => ({
            ...prevTexts,
            [whichText]: prevTexts[whichText] + nextChar,
          }));
          if (Math.random() < 0.8) playClickSound();
          setCurrentCharIndex((prevIndex) => prevIndex + 1);
        }, characterDelay);

        return () => clearTimeout(timeout);
      } else if (whichText !== texts.length - 1) {
        setCurrentCharIndex(0);
        setWhichText((prevValue) => prevValue + 1);
      }
    }
  }, [typingLines, currentCharIndex, whichText, isTypingStart]);

  return (
    <div className={classes.is_typing}>
      <p id="first_line">{typingLines[0]}</p>
      <p id="second_line">{typingLines[1]}</p>
      <p id="third_line">{typingLines[2]}</p>
    </div>
  );
};

export default IsTyping;
