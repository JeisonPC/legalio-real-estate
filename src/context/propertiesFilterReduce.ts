import type { Property } from "@/payload-types";

export type PropertiesFilterState = {
  bedrooms: string;
  bathrooms: string;
  garages: string;
  city: string;
  businessType: string;
  price: string;
  minSize: string;
  maxSize: string;
  features: string[];
  filtered: Property[];
  sortingOption: string;
  sorted: Property[];
  currentPage: number;
  itemPerPage: number;
};

export type PropertiesFilterAction =
  | { type: "SET_BEDROOMS"; payload: string }
  | { type: "SET_BATHROOMS"; payload: string }
  | { type: "SET_GARAGES"; payload: string }
  | { type: "SET_CITY"; payload: string }
  | { type: "SET_BUSINESS_TYPE"; payload: string }
  | { type: "SET_PRICE"; payload: string }
  | { type: "SET_MINSIZE"; payload: string }
  | { type: "SET_MAXSIZE"; payload: string }
  | { type: "SET_FEATURES"; payload: string[] }
  | { type: "SET_FILTERED"; payload: Property[] }
  | { type: "SET_SORTING_OPTION"; payload: string }
  | { type: "SET_SORTED"; payload: Property[] }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "SET_ITEM_PER_PAGE"; payload: number }
  | { type: "CLEAR_FILTER" };

export const initialState: PropertiesFilterState = {
  bedrooms: "Todas las Habitaciones",
  bathrooms: "Todos los Baños",
  garages: "Todos los Garajes",
  city: "Todas las Ciudades",
  price: "Precio Max.",
  businessType: "Ambos",
  maxSize: "Max (Mts/2)",
  minSize: "Min (Mts/2)",
  features: [],
  filtered: [],
  sortingOption: "Ordenar por (Predeterminado)",
  sorted: [],
  currentPage: 1,
  itemPerPage: 9,
};

export function reducer(
  state: PropertiesFilterState,
  action: PropertiesFilterAction,
): PropertiesFilterState {
  switch (action.type) {
    case "SET_BEDROOMS":
      return { ...state, bedrooms: action.payload };
    case "SET_BATHROOMS":
      return { ...state, bathrooms: action.payload };
    case "SET_GARAGES":
      return { ...state, garages: action.payload };
    case "SET_BUSINESS_TYPE":
      return { ...state, businessType: action.payload };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_MAXSIZE":
      return { ...state, maxSize: action.payload };
    case "SET_MINSIZE":
      return { ...state, minSize: action.payload };
    case "SET_FEATURES":
      return { ...state, features: action.payload };
    case "SET_FILTERED":
      return {
        ...state,
        filtered: Array.isArray(action.payload) ? [...action.payload] : [],
      };
    case "SET_SORTING_OPTION":
      return { ...state, sortingOption: action.payload };
    case "SET_SORTED":
      return {
        ...state,
        sorted: Array.isArray(action.payload) ? [...action.payload] : [],
      };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_ITEM_PER_PAGE":
      return { ...state, itemPerPage: action.payload };
    case "CLEAR_FILTER":
      return {
        ...initialState,
        filtered: [],
        sorted: [],
      };
    default:
      return state;
  }
}
