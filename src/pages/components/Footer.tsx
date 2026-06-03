import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import parse from "html-react-parser";
import { fetchHomeConfig } from "@/redux/slices/homeSlice";
import Link from "next/link";

const disclaimerList = [
  {
    name: "PMI®, PMBOK® Guide, PMP®, PgMP®, CAPM®, PMI-RMP®, PMI-ACP® are registered marks of the Project Management Institute (PMI)®",
  },
  {
    name: '"ITIL®" is registered trademark of AXELOS, United Kingdom',
  },
  {
    name: "The Swirl logo TM is a Trade Mark of AXELOS",
  },
  {
    name: "PRINCE2® is a Registered Trade Mark of AXELOS, United Kingdom",
  },
  {
    name: "ServiceNow is a Registered Trade Mark of ServiceNow Inc.",
  },
  {
    name: "MongoDB®, Mongo are the registered trademarks of MongoDB, Inc.",
  },
];

const policyLinks = [
  { name: "Terms And Conditions", href: "/terms-and-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Sitemap", href: "/sitemap" },
];

interface FooterProps {
  footerHtml?: string | null;
  template?: string | number;
}

export default function Footer({
  footerHtml,
  template,
}: FooterProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { info, org, contact, footer_course } = useSelector(
    (state: RootState) => state.home
  );

  useEffect(() => {
    const hasColumnData =
      info.data.length > 0 &&
      org.data.length > 0 &&
      contact.data.length > 0;

    const isLoadingColumns =
      info.loading || org.loading || contact.loading;

    if (!hasColumnData && !isLoadingColumns) {
      dispatch(fetchHomeConfig());
    }
  }, [
    contact.data.length,
    contact.loading,
    dispatch,
    info.data.length,
    info.loading,
    org.data.length,
    org.loading,
  ]);

  return (
    <>
      <footer>
        <div
          className={`w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 text-white ${
            String(template) === "3"
              ? "bg-[#1E2C48]"
              : "bg-[#1A1A1A]"
          }`}
        >
          {/* TEMPLATE 1 CONTENT */}
          {String(template) !== "3" && (
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
              <div className="col-span-1 lg:col-span-1">
                {info.data?.length > 0 &&
                info.data[0]?.description
                  ? parse(info.data[0].description)
                  : null}
              </div>

              <div className="col-span-1">
                {org.data?.length > 0 &&
                org.data[0]?.description
                  ? parse(org.data[0].description)
                  : null}
              </div>

              <div className="col-span-1">
                {contact.data?.length > 0 &&
                contact.data[0]?.description
                  ? parse(contact.data[0].description)
                  : null}
              </div>

              <div className="col-span-1">
                <a
                  href="https://www.sitelock.com/verify.php?site=excelr.com"
                  onClick={(event) => {
                    event.preventDefault();

                    window.open(
                      "https://www.sitelock.com/verify.php?site=excelr.com",
                      "SiteLock",
                      "width=600,height=600,left=160,top=170"
                    );
                  }}
                >
                  <Image
                    className="img-responsive"
                    alt="SiteLock"
                    title="SiteLock"
                    width={100}
                    height={100}
                    src="https://shield.sitelock.com/shield/excelr.com"
                  />
                </a>
              </div>
            </div>
          )}

          {/* TEMPLATE 3 FOOTER */}
          {String(template) === "3" ? (
            footerHtml ? (
               <> {parse(footerHtml)} </>
            ) : null
          ) : (
            <>
              {/* DYNAMIC FOOTER */}
              {footerHtml && (
                <div className="col-span-4">
                  {parse(footerHtml)}
                </div>
              )}

              {/* STATIC FOOTER */}
              {!footerHtml && (
                <div>
                  {footer_course.data?.length > 0 &&
                  footer_course.data[0]?.description
                    ? parse(
                        footer_course.data[0].description
                      )
                    : null}
                </div>
              )}
            </>
          )}


          {/* DISCLAIMER */}
          {String(template) !== "3" && (
            <div className="mt-5">
            <p className="text-sm font-semibold">
              DISCLAIMER :
            </p>

            <ul className="list-disc list-inside">
              {disclaimerList.map((d, i) => (
                <li
                  key={i}
                  className="text-xs text-justify my-2"
                >
                  {d.name}
                </li>
              ))}
            </ul>
          </div>
          )}
          
        </div>

        {/* COPYRIGHT */}
        {String(template) === "3" ? (
          <div
            className={`text-center py-5 md:mb-10 bg-[#1E2C48] text-white border-t border-gray-700 `}
          >
            <p className="text-base text-white">
              © {new Date().getFullYear()} ExcelR
              Solutions. All rights reserved.
            </p>
            <ul className="fotrlink mx-auto text-center justify-center mt-2">
                              {policyLinks.map((l) => (
                                <li key={l.name} className="inline-block">
                                  <Link href={l.href} className="text-sm text-white">{l.name}</Link>
                                </li>
                              ))}
                            </ul>
          </div>
            
        ):
        
      (
 <div
          className={`text-center py-5 md:mb-10 bg-black text-white `}
        >
          <p className="text-sm text-white">
            © {new Date().getFullYear()} ExcelR
            Solutions. All rights reserved.
          </p>
        </div>
      )}
       
      </footer>
    </>
  );
}