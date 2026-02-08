function IdeaListSection() {
  return (
    <section>
      <div className="w-full flex text-white justify-between items-end my-8 px-2">
        <div>
          <h2 className="text-3xl md:text-5xl mb-2 font-bold">Idea Lists</h2>
          <div className="w-1/2 h-2 rounded-full bg-primary-custom"></div>
        </div>

        <a
          href="/developers"
          className="border-b border-transparent hover:border-gray-200 transition-colors cursor-pointer text-sm md:text-base pb-1"
        >
          View all
        </a>
      </div>
    </section>
  );
}

export default IdeaListSection;
