"use client";

import React, { useEffect, useRef } from "react";
import { CourseData } from "@/redux/slices/courseSlice";
import parse from "html-react-parser";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { createRoot } from "react-dom/client";

interface CourseFaqProps {
  data: CourseData;
}

export default function CourseFaq({ data }: CourseFaqProps) {

  const faqData = data?.sticky_section?.faqs;

  const faqWrapperRef = useRef<HTMLDivElement>(null);


  if (!faqData || !faqData.content_html) {
    return null;
  }



  useEffect(() => {

    const wrapper = faqWrapperRef.current;

    if (!wrapper) return;



    const tabContainer = wrapper.querySelector(
      "#default-tab"
    ) as HTMLElement | null;


    const tabButtons =
      wrapper.querySelectorAll<HTMLButtonElement>(
        "[data-tabs-target]"
      );


    const tabPanels =
      wrapper.querySelectorAll<HTMLElement>(
        "[role='tabpanel']"
      );



    if (!tabContainer || !tabButtons.length) return;



    /**
     * DYNAMIC ACCORDION
     * Works for any number of admin tabs
     */

    const accordionHandlers: {
      detail: HTMLDetailsElement;
      handler: () => void;
    }[] = [];


    tabPanels.forEach((panel)=>{


      const detailsList =
        panel.querySelectorAll<HTMLDetailsElement>(
          "details"
        );


      detailsList.forEach((detail)=>{


        const handler = ()=>{


          if(!detail.open) return;



          detailsList.forEach((other)=>{


            if(other !== detail){

              other.removeAttribute(
                "open"
              );

            }


          });


        };



        detail.addEventListener(
          "toggle",
          handler
        );


        accordionHandlers.push({
          detail,
          handler
        });


      });


    });





    /**
     * MOBILE TAB SLIDER
     */

    let leftArrow: HTMLButtonElement | null = null;
    let rightArrow: HTMLButtonElement | null = null;



    const parent = tabContainer.parentElement;


    if(parent){

      parent.classList.add(
        "relative"
      );


      leftArrow =
        document.createElement("button");


      rightArrow =
        document.createElement("button");



      const leftRoot = createRoot(leftArrow);
      const rightRoot = createRoot(rightArrow);



      leftRoot.render(
        <RiArrowLeftSLine size={22}/>
      );


      rightRoot.render(
        <RiArrowRightSLine size={22}/>
      );



      leftArrow.className =
        `
        md:hidden
        absolute
        left-0
        top-1/2
        -translate-y-1/2
        z-20
        bg-white
        shadow
        rounded-full
        w-7
        h-7
        flex
        items-center
        justify-center
        text-xl
        `;



      rightArrow.className =
        `
        md:hidden
        absolute
        right-0
        top-1/2
        -translate-y-1/2
        z-20
        bg-white
        shadow
        rounded-full
        w-7
        h-7
        flex
        items-center
        justify-center
        text-xl
        `;



      parent.insertBefore(
        leftArrow,
        tabContainer
      );


      parent.appendChild(
        rightArrow
      );



      leftArrow.onclick = ()=>{

        tabContainer.scrollBy({
          left:-180,
          behavior:"smooth"
        });

      };



      rightArrow.onclick = ()=>{

        tabContainer.scrollBy({
          left:180,
          behavior:"smooth"
        });

      };

    }





    const applyMobileSlider = ()=>{


      if(window.innerWidth < 768){


        tabContainer.classList.add(
          "flex-nowrap",
          "overflow-x-auto",
          "scroll-smooth",
          "justify-start"
        );


        tabContainer.classList.remove(
          "flex-wrap",
          "justify-center"
        );


        tabContainer.style.scrollbarWidth =
          "none";



        tabButtons.forEach(btn=>{

          btn.classList.add(
            "shrink-0",
            "whitespace-nowrap"
          );

        });


      }
      else{


        tabContainer.classList.remove(
          "flex-nowrap",
          "overflow-x-auto",
          "justify-start"
        );


        tabContainer.classList.add(
          "flex-wrap",
          "justify-center"
        );


      }

    };



    applyMobileSlider();



    window.addEventListener(
      "resize",
      applyMobileSlider
    );





    /**
     * TAB CLICK
     */

    const handleTabClick = (
      event: Event
    )=>{


      const button =
        event.currentTarget as HTMLButtonElement;



      const targetSelector =
        button.getAttribute(
          "data-tabs-target"
        );



      if(!targetSelector) return;




      tabButtons.forEach(btn=>{


        btn.classList.remove(
          "bg-blue-600",
          "text-white",
          "border-blue-600"
        );


        btn.classList.add(
          "bg-transparent",
          "text-[#171717]",
          "border-blue-600"
        );


        btn.setAttribute(
          "aria-selected",
          "false"
        );


      });





      button.classList.remove(
        "bg-transparent",
        "text-[#171717]"
      );



      button.classList.add(
        "bg-blue-600",
        "text-white",
        "border-blue-600"
      );



      button.setAttribute(
        "aria-selected",
        "true"
      );





      tabPanels.forEach(panel=>{

        panel.classList.add(
          "hidden"
        );

      });




      wrapper
        .querySelector(
          targetSelector
        )
        ?.classList.remove(
          "hidden"
        );




      if(window.innerWidth < 768){


        button.scrollIntoView({
          behavior:"smooth",
          inline:"center",
          block:"nearest"
        });


      }


    };





    tabButtons.forEach(
      (button,index)=>{


        button.addEventListener(
          "click",
          handleTabClick
        );



        if(index===0){

          button.click();

        }


      }
    );





    return ()=>{


      window.removeEventListener(
        "resize",
        applyMobileSlider
      );



      tabButtons.forEach(button=>{


        button.removeEventListener(
          "click",
          handleTabClick
        );


      });




      accordionHandlers.forEach(
        ({detail,handler})=>{

          detail.removeEventListener(
            "toggle",
            handler
          );

        }
      );



      leftArrow?.remove();
      rightArrow?.remove();


    };



  },[faqData.content_html]);






  return (

    <div
      id={faqData.id || "faqs"}
      ref={faqWrapperRef}
      className="
      w-full
      md:mx-auto
      md:py-10
      2xl:px-25
      xl:px-20
      lg:px-10
      p-5
      bg-[#E5EFFF]
      text-gray-900
      "
      style={{
        colorScheme:"light"
      }}
    >


      <h2
        className="
        text-center md:text-3xl text-xl font-semibold md:mb-8 mb-4
        "
      >
        Frequently Asked Questions
      </h2>



      <div
        className="
        course-faq-content-tm
        coursetm2
        "
      >

        {parse(
          faqData.content_html ?? ""
        )}

      </div>


    </div>

  );

}