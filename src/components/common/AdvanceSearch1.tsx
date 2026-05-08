import React from "react";
import DropdownSelect from "./DropdownSelect";
import type { PropertyFilterOptions } from "@/lib/properties/filterOptions";
import {
  bathroomOptions,
  garageOptions,
  maxSizeOptions,
  minSizeOptions,
  amenitiesList,
} from "@/data/optionfilter";

type AdvanceSearchFilterOptions = Pick<
  PropertyFilterOptions,
  | "bathroomOptions"
  | "garageOptions"
  | "minSizeOptions"
  | "maxSizeOptions"
  | "featureOptions"
>;

interface AdvanceSearchProps {
  allProps: {
    bathrooms: string;
    setBathrooms: (bathrooms: string) => void;
    garages: string;
    setGarages: (garages: string) => void;
    minSize: string;
    setMinSize: (minSize: string) => void;
    maxSize: string;
    setMaxSize: (maxSize: string) => void;
    features: string[];
    setFeatures: (feature: string) => void;
  };
  handleFeatureChange: (feature: string) => void;
  ddContainer: React.RefObject<HTMLDivElement>;
  filterOptions?: AdvanceSearchFilterOptions;
}

export default function AdvanceSearch({
  allProps,
  handleFeatureChange,
  ddContainer,
  filterOptions,
}: AdvanceSearchProps) {
  const resolvedFilterOptions = filterOptions ?? {
    bathroomOptions,
    garageOptions,
    minSizeOptions,
    maxSizeOptions,
    featureOptions: amenitiesList,
  };
  const {
    bathrooms,
    garages,
    minSize,
    maxSize,
    features,
  } = allProps;

  return (
    <div className="wd-search-form" ref={ddContainer}>
      <div className="group-select">
        <div className="tf-grid-layout sm-col-2">
          <div className="box-select">
            <div className="text-button text_primary-color mb_8">Baños</div>
            <DropdownSelect
              options={resolvedFilterOptions.bathroomOptions}
              selected={bathrooms}
              setSelected={allProps.setBathrooms}
            />
          </div>
          <div className="box-select">
            <div className="text-button text_primary-color mb_8">Garajes</div>
            <DropdownSelect
              options={resolvedFilterOptions.garageOptions}
              selected={garages}
              setSelected={allProps.setGarages}
            />
          </div>
        </div>
        <div className="tf-grid-layout sm-col-2">
          <div className="box-select">
            <div className="text-button text_primary-color mb_8">
              Tamaño mínimo
            </div>
            <DropdownSelect
              options={resolvedFilterOptions.minSizeOptions}
              selected={minSize}
              setSelected={allProps.setMinSize}
            />
          </div>
          <div className="box-select">
            <div className="text-button text_primary-color mb_8">
              Tamaño máximo
            </div>
            <DropdownSelect
              options={resolvedFilterOptions.maxSizeOptions}
              selected={maxSize}
              setSelected={allProps.setMaxSize}
            />
          </div>
        </div>
      </div>
      {resolvedFilterOptions.featureOptions.length > 0 && (
        <div className="group-checkbox">
          <div className="text-title text_primary-color mb_12 fw-6">
            Características:
          </div>
          <div className="group-amenities">
            {resolvedFilterOptions.featureOptions.map((feature) => (
              <fieldset key={feature} className="checkbox-item style-1">
                <label>
                  <input
                    type="checkbox"
                    checked={features.includes(feature)}
                    onChange={() => handleFeatureChange(feature)}
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
