import { useDevice } from "./../../contexts";
import { useTranslation } from "react-i18next";
import { DeviceTypeFilter, SORT_OPTIONS } from "../../types";
import { Select } from "../Select";
import { Input } from "../Input";

import "./styles.css";

export const Filters: React.FC = () => {
  const { t } = useTranslation();

  const { search, deviceType, sortBy, setSearch, setDeviceType, setSortBy } =
    useDevice();

  return (
    <div className="filters">
      <Input
        type="text"
        placeholder={t("search")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
        icon="search"
      />

      <Select
        value={deviceType}
        onChange={(e) => setDeviceType(e.target.value)}
        options={DeviceTypeFilter.map((type: string) => ({
          key: type,
          value: type,
          text: type,
        }))}
        className="device-type-select"
      />

      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        options={SORT_OPTIONS.map((option) => ({
          key: option,
          value: option,
          text: t(option),
        }))}
        className="sort-select"
      />
    </div>
  );
};
