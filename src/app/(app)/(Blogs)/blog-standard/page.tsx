import BlogStandard from "@/components/blog/BlogStandard";
import PageTitle from "@/components/blog/PageTitle";
import SideBar from "@/components/blog/SideBar";
import Layout from "@/components/layouts/Layout-defaul";
import React from "react";

export default function page() {
    return (
        <Layout>
            <PageTitle />
            <div className="main-content">
                <div className="tf-container tf-spacing-1">
                    <div className="row">
                        <div className="col-lg-8">
                            <BlogStandard />
                        </div>
                        <div className="col-lg-4">
                            <SideBar />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
