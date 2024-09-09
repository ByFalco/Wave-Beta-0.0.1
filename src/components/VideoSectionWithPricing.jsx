import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import VideoSection from "./VideoSection";
import PricingCard from "./PricingCard";
import Modal from "./Modal";
import byWaveImage from "../assets/waveWatermark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const VideoSectionWithPricing = () => {
  const [isTagged, setIsTagged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRetail, setIsRetail] = useState(true);
  const thirdCardRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const timerRef = useRef(null);
  const autoCloseTimerRef = useRef(null);

  const retailPlans = [
    {
      title: "Base",
      price: 599,
      description: "Presenza online di base per piccole imprese",
      features: [
        "Ottimizzazione SEO locale",
        "5 pagine web responsive",
        "Servizio fotografico professionale",
        "Configurazione Google My Business",
        "Monitoraggio base delle performance",
        "Assistenza prioritaria per 3 mesi",
      ],
    },
    {
      title: "Standard",
      price: 999,
      description: "Soluzione completa per aziende in crescita",
      features: [
        "SEO locale avanzato",
        "10 pagine web personalizzate",
        "Pacchetto foto e video",
        "Design con branding personalizzato",
        "Integrazione codice QR",
        "Dashboard WAVE Pro",
        "Assistenza prioritaria per 6 mesi",
      ],
    },
    {
      title: "Premium",
      price: 1799,
      description: "Pacchetto completo per grandi imprese",
      features: [
        "Strategia SEO completa",
        "Pagine web illimitate ottimizzate",
        "Pacchetto media esteso",
        "Ottimizzazione UX/UI",
        "CRM e automazione marketing",
        "Strategia omnichannel",
        "Dashboard WAVE Pro",
        "Assistenza prioritaria per 12 mesi",
      ],
    },
  ];

  const eCommercePlans = [
    {
      title: "Starter",
      price: 499,
      description: "Soluzione e-commerce di base per piccole imprese",
      features: [
        "Catalogo di 50 prodotti",
        "Gateway di pagamento sicuri",
        "Design ottimizzato per conversioni",
        "SEO base per i prodotti",
        "Ottimizzazione schede prodotto",
        "Assistenza prioritaria per 3 mesi",
      ],
    },
    {
      title: "Business",
      price: 899,
      description: "Piattaforma avanzata per aziende in crescita",
      features: [
        "Catalogo di 500 prodotti",
        "Gestione avanzata dell'inventario",
        "Strategia SEO per e-commerce",
        "Design UX personalizzato",
        "Funzioni upsell e cross-sell",
        "Dashboard WAVE Pro",
        "Assistenza prioritaria per 6 mesi",
      ],
    },
    {
      title: "Enterprise",
      price: 1699,
      description: "Soluzione completa per grandi imprese",
      features: [
        "Prodotti e varianti illimitati",
        "Gestione multi-store",
        "A/B testing e personalizzazione",
        "CRM e automazione marketing",
        "Integrazione ERP",
        "Ottimizzazione per mercati globali",
        "Dashboard WAVE Pro",
        "Assistenza prioritaria per 12 mesi",
      ],
    },
  ];

  const togglePlanType = useCallback(() => {
    setIsRetail((prev) => !prev);
  }, []);

  const toggleTag = useCallback(() => {
    setIsTagged((prev) => !prev);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    // Imposta un timer per chiudere automaticamente il modal dopo 5 secondi
    autoCloseTimerRef.current = setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    timerRef.current = setTimeout(() => {
      openModal();
    }, 700); // 0.7 secondi
  }, [openModal]);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const handleModalInteraction = useCallback(() => {
    // Cancella il timer di chiusura automatica quando l'utente interagisce con il modal
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="video-section-with-pricing" ref={sectionRef}>
      <VideoSection />
      <div className="pricing-overlay">
        <motion.div
          className="plan-type-switch-container"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="plan-type-label">
            {isRetail ? "Tipo di Piani" : "Tipo di Piani"}
          </span>
          <div className="plan-type-switch">
            <label className="switch">
              <input
                type="checkbox"
                checked={isRetail}
                onChange={togglePlanType}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <p className="plan-type-info">
            {isRetail
              ? "Per attività commerciali fisiche"
              : "Per attività commerciali solamente online"}
          </p>
        </motion.div>
        <motion.h2
          className="pricing-title"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {isRetail ? "Piani Retail" : "Piani E-Commerce"}
        </motion.h2>
        <motion.div
          className="price-cards-container"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {(isRetail ? retailPlans : eCommercePlans).map((plan, index) => (
            <motion.div key={index} custom={index} variants={cardVariants}>
              <PricingCard
                {...plan}
                isTagged={isTagged}
                ref={index === 2 ? thirdCardRef : null}
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="tag-switch-container"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="tag-label">TAG Wave</span>
          <div className="tag-switch">
            <label className="switch">
              <input type="checkbox" checked={isTagged} onChange={toggleTag} />
              <span className="slider round"></span>
            </label>
          </div>
          <p className="tag-info">
            {isTagged ? "Sconto del 30% con il nostro " : "Prezzo pieno senza "}
            <span
              className="watermark-link"
              onClick={openModal}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              watermark
              <i className="fas fa-question-circle watermark-icon"></i>
            </span>
          </p>
        </motion.div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onInteraction={handleModalInteraction}
      >
        <div className="modal-text">
          <div className="modal-title-with-image">
            <img
              src={byWaveImage}
              alt="Watermark Wave"
              className="watermark-wave-image"
            />
          </div>
          <p>
            Il TAG Watermark Wave è una soluzione innovativa che offre vantaggi
            significativi sia per noi che per i nostri clienti:
          </p>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} />
              Watermark discreto posizionato in basso a sinistra nel vostro sito
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} />
              Uno strumento di promozione per la nostra azienda sui siti che
              realizziamo
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} />
              Un'opportunità per i clienti di ottenere uno sconto del 30% sul
              prezzo finale
            </li>
          </ul>
          <h3>Perché la differenza di prezzo?</h3>
          <p>
            Questa partnership strategica ci permette di offrire i nostri
            servizi a un prezzo più vantaggioso, mantenendo al contempo la
            massima qualità e professionalità.
          </p>
          <div className="price-comparison">
            <div className="price-column">
              <p>Senza TAG Wave</p>
              <p className="price">Prezzo standard</p>
            </div>
            <div className="price-column">
              <p>Con TAG Wave</p>
              <p className="price">
                <span className="discount">30% di sconto</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VideoSectionWithPricing;
