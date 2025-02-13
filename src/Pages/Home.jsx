import React from 'react'
import { WavyBackground } from '../components/ui/wavy-background';
import { TextGenerateEffect } from '../components/ui/text-generate-effect';
import eth from "../assets/Ethereum-01.png";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
          <TextGenerateEffect
            words={"Welcome to the decetralize marketplace for NFTs"}
          />
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
          Explore the world of NFTs and create your own NFTs
        </p>
        <div className='absolute bottom-0 left-[48%]'>
          <img className='w-16' src={eth} alt="ethereum" />
          <div className='text-neutral-800'>Ethereum</div>
        </div>
      </WavyBackground>
    </div>
  );
}

export default Home