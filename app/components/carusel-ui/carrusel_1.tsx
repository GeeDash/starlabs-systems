import React, { useState, useEffect, useRef, useMemo } from "react";
import { erpProducts } from "../../utils/dataMuestra";

const ProductShowcase = ({ products = erpProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  const currentProduct = products[currentIndex];

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToProduct = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying || products.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, products.length]);

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  const previewCards = useMemo(() => {
    const cardsToShow = Math.min(5, products.length - 1 || 1);

    return Array.from({ length: cardsToShow }, (_, i) => {
      const realIndex = (currentIndex + 1 + i) % products.length;
      return {
        ...products[realIndex],
        realIndex,
      };
    });
  }, [currentIndex, products]);

  const progressWidth = `${((currentIndex + 1) / products.length) * 100}%`;

  if (!products.length) {
    return <div className="text-center p-8">No hay productos para mostrar</div>;
  }

  return (
    <>
      <style>{`
        @keyframes heroReveal {
          0% { transform: scale(1.06); opacity: 0.65; filter: blur(5px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
        @keyframes contentFadeUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardFloatIn {
          0% { opacity: 0; transform: translateY(24px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-heroReveal { animation: heroReveal 0.9s ease-out forwards; }
        .animate-contentFadeUp { animation: contentFadeUp 0.65s ease-out forwards; }
        .animate-cardFloatIn { animation: cardFloatIn 0.55s ease-out forwards; }
      `}</style>

      <div
        className="relative w-full max-w h-[90vh] mx-auto overflow-hidden rounded-[28px] bg-black shadow-2xl"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        <div className="absolute inset-0">
          <img
            key={`bg-${currentIndex}`}
            src={currentProduct.imageUrl}
            alt={currentProduct.title.replace("\n", " ")}
            className="w-full h-full object-cover animate-heroReveal"
          />
          <div className="absolute inset-0 bg-black/18" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/18 to-black/12" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-black/10" />
        </div>

        <div
          key={`info-${currentIndex}`}
          className="absolute z-20 left-6 md:left-12 top-[22%] md:top-[24%] max-w-[42%] text-white animate-contentFadeUp"
        >
          <div className="mb-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 md:w-10 h-[2px] bg-white/90" />
              <span className="text-sm md:text-lg font-light text-white/95">
                {currentProduct.subtitle || currentProduct.location}
              </span>
            </div>

            <h2
              className="text-[2.4rem] leading-[0.95] md:text-[5rem] md:leading-[0.92] font-semibold uppercase tracking-tight whitespace-pre-line"
              style={{ fontFamily: "inherit" }}
            >
              {currentProduct.title}
            </h2>
          </div>

          <p className="hidden md:block text-sm leading-6 text-white/72 max-w-[520px] mb-7">
            {currentProduct.description}
          </p>

          <div className="flex items-center gap-4">
            <button
              className="w-10 h-10 rounded-full bg-gradient-to-r from-[#51E5FF] to-[#5CDDBD] text-white flex items-center justify-center shadow-lg shadow-[#51E5FF]/25"
              aria-label="Explorar"
            >
              {">"}
            </button>

            <button className="px-5 py-2.5 rounded-full border border-white/35 text-xs md:text-sm tracking-[0.16em] uppercase text-white/95 hover:bg-white/10 transition">
              Solicitar un Acceso
            </button>
          </div>
          <h1 className="mt-5 text-2xl md:text-3xl lg:text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
            WISEBET
            <span className="bg-clip-text text-transparent animate-flow italic font-black tracking-tight text-3xl md:text-4xl lg:text-4xl">
              CORE
            </span>
          </h1>
        </div>

        <div className="absolute z-20 right-0 bottom-0 md:right-6 top-[50%] md:top-[24%] w-[50%] overflow-x-auto">
          <div className="flex gap-4 md:gap-6 px-3 py-4">
            {previewCards.map((product, i) => (
              <button
                key={`${product.id}-${product.realIndex}`}
                onClick={() => goToProduct(product.realIndex)}
                className={`relative shrink-0 rounded-[16px] overflow-hidden text-left shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  i === 0 ? "w-[17vw] h-[50vh]" : "w-[17vw] h-[45vh]"
                }`}
                aria-label={`Ver ${product.title.replace("\n", " ")}`}
              >
                <img
                  src={product.imageUrl}
                  alt={product.title.replace("\n", " ")}
                  className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 ring-2 ring-white/30 rounded-[16px]" />

                <div className="absolute left-4 right-4 bottom-4 text-white">
                  <div className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-white/80 mb-1">
                    {product.location}
                  </div>
                  <div className="text-lg md:text-[1.6rem] leading-[0.92] font-semibold uppercase whitespace-pre-line">
                    {product.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="absolute z-20 bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-[88%] md:w-[70%]">
          <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6 md:ml-[38%]">
            <button
              onClick={prevProduct}
              className="w-11 h-11 rounded-full border border-white/25 bg-white/6 backdrop-blur-md text-white text-xl flex items-center justify-center hover:bg-white/12 transition"
              aria-label="Anterior"
            >
              ‹
            </button>

            <button
              onClick={nextProduct}
              className="w-11 h-11 rounded-full border border-white/25 bg-white/6 backdrop-blur-md text-white text-xl flex items-center justify-center hover:bg-white/12 transition"
              aria-label="Siguiente"
            >
              ›
            </button>

            <div className="hidden md:block relative w-[260px] h-[3px] bg-white/20 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#51E5FF] to-[#7AFF9B]"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductShowcase;
