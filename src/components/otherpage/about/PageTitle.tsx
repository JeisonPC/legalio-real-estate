import Image from "next/image";
import Link from "next/link";

export default function PageTitle() {
    return (
        <div className="page-title style-default">
            <div className="thumbs">
                <Image
                    src="/assets/images/page-title/page-title-13.webp"
                    width={1920}
                    height={300}
                    alt=""
                    priority
                />
            </div>
            <div className="content text-center">
                <div className="tf-container">
                    <h2 className="title text_white mb_12">Sobre nosotros</h2>
                    <ul className="breadcrumb justify-content-center text-button fw-4">
                        <li>
                            <Link href="/">Inicio</Link>
                        </li>
                        <li>Sobre nosotros</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
