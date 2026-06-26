import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Breadcrumb from '../components/Breadcrumb';
import Meta from '../components/Meta';
import { fetchPageDetail } from '../../redux/slices/pageDetailSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';

const CMSPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector(
    state => state.pageDetail
  );

  const slug = router.query.slug as string | undefined;

  useEffect(() => {
      const accordions = document.querySelectorAll(
        "#accordion13, #accordion14, #accordion4, #accordionfaq, #accordion5"
      );
  
      accordions.forEach((accordion) => {
        accordion.addEventListener("click", (event) => {
          if ((event.target as HTMLElement).tagName.toLowerCase() === "summary") {
            const details = (event.target as HTMLElement)
              .parentNode as HTMLElement;
  
            accordion.querySelectorAll("details").forEach((el) => {
              if (el !== details) el.removeAttribute("open");
            });
          }
        });
      });
  
      return () => {
        accordions.forEach((accordion) => {
          accordion.replaceWith(accordion.cloneNode(true));
        });
      };
    }, [data]);

  useEffect(() => {
    if (router.isReady && slug) {
      dispatch(fetchPageDetail(slug));
    }
  }, [router.isReady, slug, dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return null;
  }

  

  return (
    <>
      <Meta
        title={data.meta_title || data.title}
        description={data.meta_description}
      />
        <div>
        <Breadcrumb />
        </div>
        <div className="w-full md:mx-auto md:py-16 2xl:px-32 xl:px-20 bg-black sm:bg-transparent
         lg:px-10 p-5 relative">
        <div className="hidden md:block absolute inset-0 -z-10">
           <Image
              src={`https://www.excelr.com/uploads/new_page/${data.banner_image}`}
              alt="Enroll Course Banner"
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover -z-10"
              quality={55}
              />
        </div>
        <div className="hidden md:block absolute inset-0 bg-black/60 z-0" />
           <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center uppercase z-50 relative text-white">{data.title}</h1>
         </div>
         <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <div className="grid md:grid-cols-1 grid-cols-1 gap-4 z-10 relative items-center">
          <div className="col-span-1 lg:col-span-1">
            <div>
                <div
        dangerouslySetInnerHTML={{
          __html: data.description,
        }}
      />
            </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default CMSPage;
