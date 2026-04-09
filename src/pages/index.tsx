import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { fetchHomeConfig } from "@/redux/slices/homeSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import Meta from "./components/Meta";
import Hero from "./Home/Hero";
import GlobalLeaders from "./Home/GlobalLeadrs";
import Resources from "./Home/Resources";
import OurCourses from "./Home/OurCourses";
import WhyExcelr from "./Home/WhyExcelr";
import NewsEvent from "./Home/NewsEvent";
import OurClients from "./components/OurClients";



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
