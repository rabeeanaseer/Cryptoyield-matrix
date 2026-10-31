import { useEffect, useRef } from "react";

export function TradingViewScreener() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 500,
      defaultColumn: "overview",
      defaultScreen: "top_gainers",
      market: "crypto",
      showToolbar: true,
      colorTheme: "dark",
      locale: "en",
      isTransparent: true,
    });

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container w-full h-full"
      style={{ minHeight: 500 }}
    />
  );
}
