import React from "react";
import { Property } from "@/payload-types";
import Link from "next/link";

export default function Description({ property }: { property: Property }) {
  const description = property.description ?? "";

  return (
    <div>
      <h5 className="properties-title mb_20">Descripción</h5>

      <p className="mb_20 text-body-2">
        {description || "Esta propiedad no cuenta con descripción."}
      </p>

      {description && description.length > 150 && (
        <Link
          href="#"
          className="hover-underline-link text_primary-color text-button"
        >
          Ver más
        </Link>
      )}
    </div>
  );
}
