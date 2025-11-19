// src/pages/career/[slug].tsx
import Head from "next/head";
import Breadcrumb from "../../components/Breadcrumb"
import OurClients from "../../components/OurClients"
// import intlTelInput from "intl-tel-input";
// import "intl-tel-input/build/css/intlTelInput.css";

type Career = {
  slug: string;
  title: string;
  location: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
};

const careers: Career[] = [
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    location: "Bangalore, India",
    description: `
      <p>We are looking for a passionate Frontend Developer skilled in React, Next.js, and modern web technologies.</p>
      <h3>Responsibilities:</h3>
      <ul>
        <li>Build reusable and scalable frontend components.</li>
        <li>Collaborate with designers and backend engineers.</li>
        <li>Optimize UI performance and accessibility.</li>
      </ul>
      <h3>Requirements:</h3>
      <ul>
        <li>2+ years of experience in React or Next.js.</li>
        <li>Strong understanding of HTML, CSS, and Tailwind CSS.</li>
        <li>Good communication and teamwork skills.</li>
      </ul>
    `,
    metaTitle: "Frontend Developer | Excelr Careers",
    metaDescription: "Join Excelr as a Frontend Developer and build modern web experiences.",
  },
  {
    slug: "backend-engineer",
    title: "Backend Engineer",
    location: "Hyderabad, India",
    description: `
      <p>Join our backend team to design scalable APIs using Node.js, Express, and PostgreSQL.</p>
      <h3>Responsibilities:</h3>
      <ul>
        <li>Develop and maintain RESTful APIs.</li>
        <li>Integrate third-party services and handle data security.</li>
        <li>Work closely with frontend teams for API integration.</li>
      </ul>
    `,
    metaTitle: "Backend Engineer | Excelr Careers",
    metaDescription: "Work on scalable APIs and backend architecture at Excelr.",
  },
];

export async function getStaticPaths() {
  const paths = careers.map((career) => ({
    params: { slug: career.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const career = careers.find((c) => c.slug === params.slug);
  return {
    props: {
      career: career || null,
    },
  };
}

export default function CareerDetailPage({ career }: { career: Career }) {
  if (!career) return <h1>Career not found</h1>;

  return (
    <>
      <Head>
        <title>{career.metaTitle}</title>
        <meta name="description" content={career.metaDescription} />
      </Head>
      <div>
        <Breadcrumb />
      </div>
      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 career-bg_grad">
           <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center z-50 relative text-white">{career.title}</h1>
        </div>
     <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
           <h1 className="text-3xl font-bold mb-2">{career.title}</h1>
        <p className="text-gray-600 mb-6">{career.location}</p>
        <article
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: career.description }}
        />
        </div>
  <div className="col-span-1">
    <div className="shadow p-5">
      <p className="text-lg mb-4 font-medium text-left text-[#4593d0]">
               Apply for this position
              </p>
      
              <form className="space-y-4">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    className="border border-gray-200 text-gray-900 bg-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
              {/* ✅ Mobile (with intl-tel-input) */}
                <div className="relative">
                  
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile No. *"
                    className="border border-gray-200 text-gray-900 bg-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                {/* Email */}
                <div className="relative">
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    className="border border-gray-200 text-gray-900 bg-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
      
                
      
                {/* Preferred Date */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="EMP Name / Code *"
                    className="border border-gray-200 text-gray-900 bg-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                  <small className="text-gray-400">*Applicable for ExcelR employees referral only</small>
                </div>
              <div className="relative">
                  <textarea
                    name="name"
                    placeholder="Cover Letter *"
                    className="border border-gray-200 text-gray-900 bg-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="mb-1.5 text-sm block">Upload CV *</label>
                  <input
                    type="file"
                    name="name"
                    className="border border-gray-200 text-gray-900 bg-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                 
      
                {/* Terms & Conditions */}
                <div className="flex items-start space-x-2 text-sm">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terms" className="text-gray-500">
                    I hereby agree to the{" "}
                    <a href="/terms" className="text-blue-600 underline" target="_blank">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" className="text-blue-600 underline" target="_blank">
                      Privacy Policy
                    </a>{" "}
                    of Excelr Solutions.
                  </label>
                </div>
      
                {/* Submit */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="border cursor-pointer border-solid border-[#0071BC] bg-[#0071BC] text-white hover:bg-[#4ba7de] font-medium text-sm py-2.5 px-5 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
    </div>
  </div>
      </div>
       
      </section>
      <OurClients />
    </>
  );
}
