import React from "react";

import {FaFacebookF, FaTwitter, FaLinkedin} from 'react-icons/fa'

function Footer() {
  return (
    <div className="absolute bottom-0 bg-zinc-100 py-2">
      <div>
       <div className="flex justify-center w-full p-1">
        <div>
        <p className="text-zinc-400">(855) 335-9779, Monday-Friday, 9AM - 7PM EDT</p>
        <div className="flex space-x-5 justify-center m-2">
          <FaFacebookF color="#1ab394" size={20} />
          <FaTwitter color="#1ab394" size={20} />
          <FaLinkedin color="#1ab394" size={20} />
        </div>
        </div>
       
      </div>

      <div className="flex justify-center w-full">
        <div className="max-w-[80%] border-t-2 border-zinc-300 p-2">
          <p className="text-justify text-xs text-zinc-400">
            Copyright 2022 Legal Templates LLC. Legal Templates LLC is not a
            lawyer, or a law firm and does not engage in the practice of law.
            Legal Templates cannot and does not provide legal advice or legal
            representation. All information, software and services provided on
            the site are for informational purposes and self-help only and are
            not intended to be a substitute for a lawyer or professional legal
            advice. Use of this site is subject to our Terms of Use.
            Legaltemplates.net is owned and operated by Resume Technologies
            Limited, London with offices in London United Kingdom.”
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Footer;
