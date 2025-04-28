import { useState, useEffect } from "react";
import { Link } from "react-router-dom";    // <-- Only Link is needed now
import icon from './assets/ChatGPT Image Apr 28, 2025, 11_25_37 PM.png';
import landscape from './assets/beautiful-mountains-landscape.jpg';
import daisy from './assets/nature-beauty-colors-meadow-daisy-blossoms-generated-by-ai.jpg';
import nature from './assets/nature-mountain-displays-radiant-colors-sunset-generative-ai.jpg';
import forest from './assets/spooky-old-forest-abandoned-window-reflects-spooky-sunset-water-generated-by-artificial-intelligence.jpg';
import "./Home.css";

const images = [
  { src: landscape, alt: "landscape" },
  { src: daisy, alt: "daisy" },
  { src: nature, alt: "nature" },
  { src: forest, alt: "forest" }
];

const Home = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [text2, setText2] = useState('');
  const [index2, setIndex2] = useState(0);
  const [imageIndex, setImgIndex] = useState(0);

  const fullText = ["AI Image Generator"];
  const fullText2 = ["I am developing an AI-powered image generator that transforms text prompts into stunning visuals, blending creativity with technology to produce unique, high-quality artwork effortlessly."];

  useEffect(() => {
    const currentText = fullText[0];
    const currentText2 = fullText2[0];

    let typingTimer;
    let typingTimer2;

    if (index < currentText.length) {
      typingTimer = setTimeout(() => {
        setText(currentText.substring(0, index + 1));
        setIndex(prev => prev + 1);
      }, 100);
    }

    if (index2 < currentText2.length) {
      typingTimer2 = setTimeout(() => {
        setText2(currentText2.substring(0, index2 + 1));
        setIndex2(prev => prev + 1);
      }, 20);
    }

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(typingTimer2);
    };
  }, [index, index2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    images.forEach((img) => {
      const preloadImg = new Image();
      preloadImg.src = img.src;
    });
  }, []);

  return (
    <div className="Home-Body">
      <div className="Home-Body-2">
        <div className="Home-heading">{text}<span aria-hidden="true"></span></div>
        <div className="Home-contents">
          <div className="Home-Box">
            <div className="Home-matter">{text2}</div>
            <Link to='/generate' className="Home-Generate">
              <img src={icon} className="Home-icon" alt="Generate Icon" />
              <div>Generate Images</div>
            </Link>
          </div>
          <div className="Home-images">
            <div className="Home-slider" style={{ transform: `translateX(-${imageIndex * 100}%)` }}>
              {images.map((img, idx) => (
                <img key={idx} src={img.src} alt={img.alt} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
