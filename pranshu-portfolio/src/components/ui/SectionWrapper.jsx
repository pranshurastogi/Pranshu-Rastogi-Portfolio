const SectionWrapper = ({ children }) => {
  return (
    <section className="relative py-8 md:py-12 px-4 overflow-hidden">
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
