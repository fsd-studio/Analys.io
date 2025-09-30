import FSDImage from './../../ui/FSDImage';
import Section from './../../ui/Section';
import Image from '/public/tooth.png';

function HeroTextImage({
  title = "Your Brand",
  buttonText = "Reserve now",
  buttonLink = "#Reserve",
  src = Image
}) {
  return (
    <Section outerC="bg-gray-200 relative z-30">
        <div className='text-center md:text-start lg:text-center mt-12 md:mt-16 lg:mt-6 mb-10 max-w-[80%] mx-auto'>
            <h1 className='text-7xl md:text-[60px] lg:text-9xl font-primary lg:uppercase font-black'>{title}</h1>
            <h2 className='text-xl md:text-2xl mt-8 w-[50%] hidden md:block lg:hidden'>Bringing dental <span className='font-bold '>hygiene</span> around the world!</h2>
        </div>
        <FSDImage
            src={src}
            alt="burger"
            quality={100}
            placeholder="blur"
            className="drop-shadow-[0_0_100px_rgba(51,191,36,0.6)] w-full -mt-14 md:-mt-4 lg:-mt-20 md:ms-auto lg:mx-auto md:w-[90%] lg:w-[15%] lg:relative lg:z-10"
        />

        <h2 className='text-xl w-[90%] mx-auto text-center mt-6 md:hidden lg:block'>Bringing dental <span className='font-bold '>hygiene</span> around the world!</h2>
    </Section>
  );
}

export default HeroTextImage;
