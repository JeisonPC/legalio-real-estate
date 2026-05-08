import React from "react";
import DropdownSelect2 from "./DropdownSelect2";
import type { PropertyFilterOptions } from "@/lib/properties/filterOptions";

interface AdvanceSearchProps {
  ddContainer: React.RefObject<HTMLDivElement>;
  filterOptions: Pick<
    PropertyFilterOptions,
    | "bathroomOptions"
    | "garageOptions"
    | "minSizeOptions"
    | "maxSizeOptions"
    | "featureOptions"
  >;
  features: string[];
  onBathroomsChange: (value: string) => void;
  onGaragesChange: (value: string) => void;
  onMinSizeChange: (value: string) => void;
  onMaxSizeChange: (value: string) => void;
  onFeatureChange: (feature: string) => void;
}

export default function AdvanceSearchDefault({
  ddContainer,
  filterOptions,
  features,
  onBathroomsChange,
  onGaragesChange,
  onMinSizeChange,
  onMaxSizeChange,
  onFeatureChange,
}: AdvanceSearchProps) {
  return (
    <div className="wd-search-form" ref={ddContainer}>
      <div className="group-select">
        <div className="tf-grid-layout sm-col-2">
          <div className="box-select">
            <div className="text-button text_primary-color mb_8">Baños</div>
            <DropdownSelect2
              options={filterOptions.bathroomOptions}
              onChange={onBathroomsChange}
            />
          </div>
          <div className="box-select">
            <div className="text-button text_primary-color mb_8">Garajes</div>
            <DropdownSelect2
              options={filterOptions.garageOptions}
              onChange={onGaragesChange}
            />
          </div>
        </div>
        <div className="tf-grid-layout sm-col-2">
          <div className="box-select">
            <div className="text-button text_primary-color mb_8">
              Tamaño mínimo
            </div>
            <DropdownSelect2
              options={filterOptions.minSizeOptions}
              onChange={onMinSizeChange}
            />
          </div>
          <div className="box-select">
            <div className="text-button text_primary-color mb_8">
              Tamaño máximo
            </div>
            <DropdownSelect2
              options={filterOptions.maxSizeOptions}
              onChange={onMaxSizeChange}
            />
          </div>
        </div>
      </div>
      {filterOptions.featureOptions.length > 0 && (
        <div className="group-checkbox">
          <div className="text-title text_primary-color mb_12 fw-6">
            Características:
          </div>
          <div className="group-amenities">
            {filterOptions.featureOptions.map((feature) => (
              <fieldset key={feature} className="checkbox-item style-1">
                <label>
                  <input
                    type="checkbox"
                    checked={features.includes(feature)}
                    onChange={() => onFeatureChange(feature)}
                  />
                  <span className="btn-checkbox"></span>
                  <span className="text-body-default">{feature}</span>
                </label>
              </fieldset>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
