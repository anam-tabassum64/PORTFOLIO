interface EditorialSectionHeaderProps {
  number: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  className?: string;
}

const EditorialSectionHeader = ({
  number,
  eyebrow,
  title,
  accent,
  description,
  className = '',
}: EditorialSectionHeaderProps) => {
  return (
    <div className={`relative text-center ${className}`}>
      <div className="mb-4 flex items-center justify-center gap-4">
        <span className="block h-px w-12 bg-[#c3a06f]" />
        <span className="font-syne text-[10px] font-bold uppercase tracking-[.35em] text-olive-500">
          {eyebrow}
        </span>
        <span className="block h-px w-12 bg-[#c3a06f]" />
      </div>

      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2 select-none font-playfair text-[clamp(4.25rem,11vw,7rem)] font-bold italic leading-none text-[#e6d7c1]"
          style={{ letterSpacing: '-.04em' }}
        >
          {number}
        </span>

        <h2 className="relative z-10 font-playfair text-[clamp(1.85rem,4.6vw,3rem)] font-medium leading-[1.02] tracking-tight text-olive-800">
          {title}
          {accent ? (
            <>
              <br />
              <em className="italic text-[#b4884b]">{accent}</em>
            </>
          ) : null}
        </h2>

        {description ? (
          <p className="relative z-10 mx-auto mt-2 font-mono text-[11px] text-[#b4884b]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default EditorialSectionHeader;
