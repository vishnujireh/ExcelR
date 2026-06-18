import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { fetchHomeConfig } from "@/redux/slices/homeSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import dynamic from "next/dynamic";
import Meta from "./components/Meta";
import Hero from "./Home/Hero"; // Above fold — keep static so LCP image loads immediately

// All sections below the hero are dynamically imported with ssr:false.
// This removes their JS from the critical bundle so the browser parses less
// code before it can paint the LCP element (the hero banner).
// The home page fetches all its data client-side anyway (useEffect dispatch),
// so ssr:false has zero SEO impact here.
const GlobalLeaders = dynamic(() => import("./Home/GlobalLeadrs"), { ssr: false });
const Resources     = dynamic(() => import("./Home/Resources"),    { ssr: false });
const OurCourses    = dynamic(() => import("./Home/OurCourses"),   { ssr: false });
const WhyExcelr     = dynamic(() => import("./Home/WhyExcelr"),    { ssr: false });
const NewsEvent     = dynamic(() => import("./Home/NewsEvent"),     { ssr: false });
const OurClients    = dynamic(() => import("./components/OurClients"), { ssr: false });



export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const homeConfig = useAppSelector((state) => state.home.config.data);
  const homeConfigLoading = useAppSelector((state) => state.home.config.loading);

  useEffect(() => {
    if (!homeConfig && !homeConfigLoading) {
      dispatch(fetchHomeConfig());
    }
  }, [dispatch, homeConfig, homeConfigLoading]);

  return (
    <>
      <Meta
        title={homeConfig?.meta_title || undefined}
        description={homeConfig?.meta_description || undefined}
        keywords={homeConfig?.meta_keyword || undefined}
      />
      <Hero />
      <GlobalLeaders />
      <Resources />
      <OurCourses />
      <WhyExcelr />
      <NewsEvent />
      <OurClients />
    </>
  );
}
