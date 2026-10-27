/** A laptop frame so every project screenshot shows at the same size and shape. */
export const Laptop = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative mx-auto w-full max-w-[640px]">
    {/* soft glow under the laptop */}
    <div aria-hidden className="absolute inset-x-[8%] -bottom-6 h-10 rounded-full bg-primary/40 blur-2xl" />

    {/* lid + screen */}
    <div className="relative rounded-t-[1.1rem] border border-[#3a3f52] bg-[#12141f] p-[2.2%] pb-[2.6%] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]">
      <span aria-hidden className="absolute left-1/2 top-[0.9%] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#2c3145] ring-1 ring-[#3a3f52]" />
      <div className="overflow-hidden rounded-[0.45rem] bg-[#0b0d16]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
    </div>

    {/* keyboard deck */}
    <div className="relative mx-[-4.5%] h-3 rounded-b-[1.2rem] rounded-t-[2px] bg-gradient-to-b from-[#d5d9e3] via-[#aab0c0] to-[#7f8597] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)]">
      <span aria-hidden className="absolute left-1/2 top-0 h-[5px] w-[18%] -translate-x-1/2 rounded-b-md bg-[#8a90a2]" />
    </div>
  </div>
);
