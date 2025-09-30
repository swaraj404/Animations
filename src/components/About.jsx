import React from "react";

const About = () => {
  return (
   <div id="about">
    <div className="mb-16 md:px-0 px-5">
        <div className="content">
            <div className="md:col-span-8">
                <p className="badge">Best Cocktails</p>
                <h2>
                    Where every detail matters<span className="text-white">-</span>
                    from muddle to garnish
                </h2>
            </div>
            <div className="sub-content">
                <p>
                    Every cocktail we serve is a reflection of our obsession with detail from the first muddle to the final garnish. That care is what turns a simple drink into something truly memorable.
                </p>
                <div>
                    <p className="md: text-3xl text-xl font-bold">
                        <span>4.5</span>/5
                    </p>
                </div>
            </div>
        </div>
    </div>
   </div>
  );
};

export default About;
