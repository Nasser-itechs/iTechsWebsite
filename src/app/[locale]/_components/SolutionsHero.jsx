import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "@/i18n/navigation";
import { HEADING_SECTION } from "@/lib/typography";

const solutions = ["geospatial", "defense", "vrar"];

export default async function SolutionsHero() {
  const t = await getTranslations("solutionsHero");
  const locale = await getLocale();
  const isRtl = locale === "ar";

  return (
    <section className="relative w-full min-h-screen lg:h-screen overflow-hidden lg:overflow-hidden flex flex-col">
      <Image
        src="/assets/home page/Solutions_reduced.jpg"
        alt="iTechs Solutions"
        fill
        className="object-cover"
        priority
      />

      {/* itechsBlue gradient */}
      <div className="absolute inset-0 ltr:bg-linear-to-r rtl:bg-linear-to-l from-transparent via-itechsBlue/60 to-itechsBlue" />
      {/* Darkening overlay on the opaque end */}
      <div className="absolute inset-0 ltr:bg-linear-to-r rtl:bg-linear-to-l from-transparent to-black/50" />

      {/* Top border strip — z-20 so it overlays the teal lines */}
      <div className="shrink-0 z-20 pointer-events-none overflow-hidden h-16 ltr:mask-[linear-gradient(to_right,rgba(0,0,0,0.05),rgba(0,0,0,0.80))] rtl:mask-[linear-gradient(to_left,rgba(0,0,0,0.05),rgba(0,0,0,0.80))]">
        <Image
          src="/assets/elements/horizontalColumnBlue.png"
          alt=""
          width={1600}
          height={100}
          className="w-full h-16 object-cover object-bottom brightness-65"
          aria-hidden="true"
        />
      </div>

      {/* Content wrapper — grows to fill space between strips */}
      <div className="relative flex-1 lg:overflow-hidden">
        {/* Main content row — desktop only */}
        <div className="z-10 hidden lg:flex flex-row items-stretch overflow-hidden absolute inset-0">
          {/* Heading anchored to bottom-left */}
          <div className="flex-1 flex flex-col justify-end pb-6 ps-12 lg:ps-20">
            <h2 className={`${HEADING_SECTION} text-white leading-tight`}>
              {t("heading1")}
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-white/80 mt-1">
              {t("heading2")}
            </p>
          </div>

          {/* Solutions column — stacked top-to-bottom in normal flow, even gaps */}
          <div className="w-72 lg:w-96 me-2 flex flex-col justify-start gap-8 py-12">
            {solutions.map((key) => (
              <div key={key} className="flex gap-4 items-start">
                {/* Frame */}
                <div className="relative w-12 h-12 shrink-0">
                  <Image
                    src="/assets/elements/frame.png"
                    fill
                    className="object-contain"
                    alt=""
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base lg:text-lg leading-snug">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="text-white/70 text-xs lg:text-sm mt-1 leading-tight">
                    {t(`${key}Desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chevron */}
          <div className="flex items-center px-4">
            <Link
              href="/services"
              className="text-itechsSkyBlue/60 hover:text-itechsSkyBlue transition-colors"
            >
              <FontAwesomeIcon
                icon={isRtl ? faChevronLeft : faChevronRight}
                className="text-2xl"
              />
            </Link>
          </div>
        </div>

        {/* Mobile stacked layout — hidden at lg and above */}
        <div className="lg:hidden relative z-10 flex flex-col justify-center gap-8 px-6 py-12">
          <div>
            <h2 className={`${HEADING_SECTION} text-white leading-tight`}>
              {t("heading1")}
            </h2>
            <p className="text-sm text-white/80 mt-1">{t("heading2")}</p>
          </div>

          <div className="flex flex-col gap-6">
            {solutions.map((key) => (
              <div key={key} className="flex gap-4 items-start">
                <div className="relative w-10 h-10 shrink-0">
                  <Image
                    src="/assets/elements/frame.png"
                    fill
                    className="object-contain"
                    alt=""
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base leading-snug">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="text-white/70 text-xs mt-1 leading-tight">
                    {t(`${key}Desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/services"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors self-start"
          >
            <span className="text-sm font-medium">{t("learnMore")}</span>
            <FontAwesomeIcon
              icon={isRtl ? faChevronLeft : faChevronRight}
              className="text-sm"
            />
          </Link>
        </div>
      </div>

      {/* Bottom border strip — z-20 */}
      <div className="shrink-0 z-20 pointer-events-none overflow-hidden h-16 ltr:mask-[linear-gradient(to_right,rgba(0,0,0,0.05),rgba(0,0,0,0.80))] rtl:mask-[linear-gradient(to_left,rgba(0,0,0,0.05),rgba(0,0,0,0.80))]">
        <Image
          src="/assets/elements/horizontalColumnBlue.png"
          alt=""
          width={1600}
          height={100}
          className="w-full h-16 object-cover object-top brightness-65"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
