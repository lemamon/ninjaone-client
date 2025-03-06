import React from "react";
import { useDevice } from "./../../contexts";
import { useTranslation } from "react-i18next";
import { DeviceTypeFilter, SORT_OPTIONS } from "../../types";
import "./styles.css";


export const Filters: React.FC = () => {
  const { t } = useTranslation();

    const {
      search,
      deviceType,
      sortBy,
      setSearch,
      setDeviceType,
      setSortBy,
    } = useDevice();

  return (
    <div className="filters">
      <input
        type="text"
        placeholder={t("search")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <select
        value={deviceType}
        onChange={(e) => setDeviceType(e.target.value)}
        className="device-type-select"
      >
        {DeviceTypeFilter.map((type: string) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="sort-select"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {t(option)}
          </option>
        ))}
      </select>
    </div>
  );
};
