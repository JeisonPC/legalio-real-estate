import BlogGrid from "@/components/blog/BlogGrid";
import PageTitle from "@/components/blog/PageTitle";
import Layout from "@/components/layouts/Layout-defaul";
import React from "react";

export default function page() {
    return (
        <Layout>
            {/* main-content */}
            <PageTitle />
            <div className="main-content">
                <BlogGrid />
            </div>
            {/* End main-content */}
        </Layout>
    );
}
