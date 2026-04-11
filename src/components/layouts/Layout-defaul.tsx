import Footer1 from "../footer/Footer1";
import Footer2 from "../footer/Footer2";
import Header4 from "../header/Header4";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div id="wrapper" className="clearfix">
                <Header4 />
                {children}
                <Footer1 />
            </div>
        </>
    );
}
