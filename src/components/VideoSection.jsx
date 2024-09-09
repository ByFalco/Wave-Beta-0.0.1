import React, { useRef } from "react";
import Lottie from "lottie-react";
import animationData from "./bgCard.json";

const VideoSection = () => {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);

  return (
    <section ref={sectionRef} id="video-section" className="video-section">
      <div className="video-container">
        <Lottie
          lottieRef={backgroundRef}
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </section>
  );
};

export default VideoSection;
