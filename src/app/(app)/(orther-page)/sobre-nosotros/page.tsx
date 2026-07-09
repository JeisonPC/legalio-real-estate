// import Agents from "@/components/common/Agents";
import Banner1 from "@/components/common/Banner1";
import Process1 from "@/components/common/Process1";
import Layout from "@/components/layouts/Layout-defaul";
import AboutUs from "@/components/otherpage/about/AboutUs";
import OurHistory from "@/components/otherpage/about/OurHistory";
import PageTitle from "@/components/otherpage/about/PageTitle";
import WhyChoose from "@/components/otherpage/about/WhyChoose";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre Legalio | Inmobiliaria en Palmira con respaldo legal",
    description:
        "Conoce a Legalio, una inmobiliaria en Palmira que combina gestión comercial, tecnología y respaldo legal para operaciones inmobiliarias seguras.",
    alternates: {
        canonical: "/sobre-nosotros",
    },
};

export default function Page() {
    return (
        <Layout>
            <PageTitle />
            <div className="tf-spacing-1">
                <AboutUs />
            </div>
            <div className="section-history tf-spacing-1">
                <OurHistory />
            </div>
            <div className="section-process tf-spacing-1">
                <Process1 />
            </div>
            <div className="section-why tf-spacing-1">
                <WhyChoose />
            </div>
            {/* <div className="section-testimonials tf-spacing-1">
                <Testimonial1 />
            </div> */}
            <Banner1 />
            {/* <div className="section-agents tf-spacing-1">
                <Agents />
            </div> */}
        </Layout>
    );
}
