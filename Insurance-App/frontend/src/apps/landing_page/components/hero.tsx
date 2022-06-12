import '../static/style.css';

const Hero = () => {
  return (
    <section id="hero" className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="text-center lg:w-2/4 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Získajte toho správneho partnera a vykročte vpred!
          </h1>
          <p className="mb-8 leading-relaxed">Spolu to dokážeme!</p>
          <div className="flex justify-center">
            <a
              href="/insurance"
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Chcem sa poistiť
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
