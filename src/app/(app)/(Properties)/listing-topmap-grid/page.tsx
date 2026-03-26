import Layout from "@/components/layouts/Layout-defaul";
import Properties1Section from "@/components/properties/Properties1Section";
import React from "react";

export const dynamic = "force-dynamic";

export default function page() {
    return (
        <Layout>
            <Properties1Section />
        </Layout>
    );
}
