import MarqueeText from "react-marquee-text";

const Marquee = async () => {
 
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const data = await res.json();
  
  const headlines = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];

  if (headlines.length === 0) {
    return null; 
  }

  return (
    <div>
      <MarqueeText>
        {headlines.map(
         
          (h: { nameBn: string; today: number }, i: number) => (
            <span key={i}>
              <span>{h.nameBn ?? ""} {h.today} টাকা/কেজি</span>
              <span className="mx-5">●</span>
            </span>
          )
        )}
      </MarqueeText>
    </div>
  );
};

export default Marquee;