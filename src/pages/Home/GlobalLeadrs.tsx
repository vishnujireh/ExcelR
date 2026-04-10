        "use client";
        import React, {useState} from "react";
        import Image from "next/image";
        import Link from "next/link";
        import course from "/public/course.png"
        import partner from "/public/university.svg"
        import clients from "/public/franchise.png"
        import homeyoutube from "/public/home_youtube.jpg"

        const count = [
            { name: "75+", desc: "Courses", glicon: course },
            { name: "", desc: "Partner of Future Prime Skills by Nasscom", glicon: partner },
            { name: "400+", desc: "Corporate Clients", glicon: clients },
        ]
        export default function GlobalLeaders() {

            const [modalOpen, setModalOpen] = useState(false);
            const [videoUrl, setVideoUrl] = useState("");

            const openVideo = () => {
    setVideoUrl("https://www.youtube.com/embed/6OOU5fIuMuk?autoplay=1");
    setModalOpen(true);
  };

  const closeVideo = () => {
    setModalOpen(false);
    setVideoUrl("");
  };

        return (
            <>
            <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bgouglobal relative overflow-hidden">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4 z-10 relative">
        <div className="col-span-1 lg:col-span-1">
            <h1 className="text-2xl font-bold mb-1 text-center md:text-left">Global Leaders In Training</h1>
            <p className="text-[#666] text-sm leading-7">
                ExcelR is a global leader delivering a wide gamut of management and technical training over 40 countries. We are a trusted training delivery partner of 400+ corporate clients and universities/educational institutions across the globe with 800,000+ professionals trained across various courses. ExcelR helps individuals and organizations to excel by providing courses based on practical knowledge and theoretical concepts. Our industry reputation speaks for itself. We offer the best value in training services combined with the support of our creative minds to establish a solution that suits your learning needs. We just don’t train, we help in building careers and shaping up the future leaders.
            </p>
        </div>
        <div className="col-span-2 justify-self-end max-w-full">
            <div>
                <ul className="b-progress-list-2">
                {count.map((item) => (
                    <li key={item.desc} className="inline-block 2xl:mr-12 xl:mr-8 mr-0 mb-5 b-progress-list__item">
                        <Image src={item.glicon} alt={item.desc} width={30} height={30} className="text-center mx-auto my-4" />
                        <h2 className="text-3xl font-bold text-[#4593d0]">{item.name}</h2>
                        <p className="text-[#222] text-sm leading-7">{item.desc}</p>
                    </li>
                ))}
                </ul>
            </div>
        </div>
        </div>
                
                </div>
                <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 relative overflow-hidden yesexpr">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 z-10 relative">
            <div className="col-span-1 lg:col-span-1">
                <div>
                    <h3 className="text-[#222] text-lg text-center md:text-left"><span className="font-medium md:text-9xl text-5xl text-[#4593d0] opacity-90 italic">10</span><span className="font-medium md:text-8xl text-5xl ml-2 text-[#4593d0] opacity-90">+</span> <span className="relative md:-top-7 -top-3 ml-1 italic">Years of Experience</span></h3>
                </div>
                <div className="mt-5">
                    <h2 className="text-md italic font-bold mb-1">We Don&apos;t Just Train, We Build Careers !! </h2>
                    <p className="text-[#666] text-sm leading-7">As a new-age training institute and with a global footprint, we at ExcelR understand the constantly changing nature of  the business and emerging needs across the globe. Keeping industry skill requirements in mind, we offer a wide gamut of technical and management courses as well as courses in emerging technologies. The curriculum of each course has been meticulously designed to match the contemporary needs of the industry. We offer different levels of courses from beginner to advanced, ensuring that we meet the talent requirements of both students and working professionals. Our courses aim to prepare students for future advancements in technology, strategic thinking and planning, ensuring that they are future-ready and build a lucrative career ahead.</p>
                </div>
            </div>
            <div className="col-span-1 lg:col-span-1">
                <div className="relative md:mt-10 mt-3 home-youtube text-center">
                    <button onClick={openVideo} className="relative cursor-pointer">
                        <Image src={homeyoutube} alt="worldmap" className="img-fluid text-center mx-auto" />
                    </button>
                </div>
            </div>
                    </div>
                </div>
                

                {/* Video Modal */}
            {modalOpen && (
                <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                onClick={() => setModalOpen(false)}
                >
                <div
                    className="relative w-full max-w-4xl m-5 sm:m-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                    onClick={closeVideo}
                    className="absolute cursor-pointer -top-4 -right-4 bg-orange-500 text-white w-10 h-10 rounded-full"
                    >
                    ×
                    </button>

                    <div className="aspect-video bg-black">
                    <iframe
                        src={videoUrl}
                        className="w-full h-full"
                        allowFullScreen
                    />
                    </div>
                </div>
                </div>
            )}
                </>
        );
        }