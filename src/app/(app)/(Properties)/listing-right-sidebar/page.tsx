import Layout from "@/components/layouts/Layout-defaul";
import Properties4Section from "@/components/properties/Properties4Section";
import React from "react";

export const dynamic = "force-dynamic";

export default function page() {
    return (
        <Layout>
            <Properties4Section />
        </Layout>
    );
}
