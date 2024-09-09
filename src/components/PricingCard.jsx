import React, { forwardRef, useEffect } from "react";

const PricingCard = forwardRef(
  ({ title, price, description, features, isTagged }, ref) => {
    // Modifichiamo questa riga per applicare uno sconto del 30% invece del 40%
    const discountedPrice = isTagged ? Math.round(price * 0.7) : price;

    const handleScroll = () => {
      const quoteCard = document.querySelector(".quote-card");
      if (quoteCard) {
        const startPosition = window.pageYOffset;
        const quoteCardRect = quoteCard.getBoundingClientRect();
        const targetPosition =
          quoteCardRect.top +
          window.pageYOffset -
          window.innerHeight / 2 +
          quoteCardRect.height / 2;
        const distance = targetPosition - startPosition;
        const duration = 1000; // Durata dell'animazione in millisecondi
        let start = null;

        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          window.scrollTo(
            0,
            easeInOutCubic(progress, startPosition, distance, duration)
          );
          if (progress < duration) {
            window.requestAnimationFrame(step);
          } else {
            // Animazione completata, aggiungi la classe per l'effetto di risalto
            quoteCard.classList.add("highlight-effect");
            // Rimuovi la classe dopo 2 secondi
            setTimeout(() => {
              quoteCard.classList.remove("highlight-effect");
            }, 2000);
          }
        }

        window.requestAnimationFrame(step);
      }
    };

    // Funzione di easing per un'animazione più fluida
    function easeInOutCubic(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    }

    return (
      <div className="price-card" ref={ref}>
        <div>
          <h3>{title}</h3>
          <p className="price">
            <span className="amount">{discountedPrice}</span>
            <span className="currency">€</span>
          </p>
          <p className="description">{description}</p>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="cta-button-container">
          <button className="cta-button primary" onClick={handleScroll}>
            Scegli
          </button>
        </div>
      </div>
    );
  }
);

export default PricingCard;
