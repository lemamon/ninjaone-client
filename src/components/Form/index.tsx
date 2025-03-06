import { useState, useMemo } from "react";
import { useDevice } from "../../contexts/DeviceContext";
import { useTranslation } from "react-i18next";
import { Device, DeviceTypeForm } from "../../types";
import { Select } from "../Select";
import { Input } from "../Input"; // Import the new Input component

import "./styles.css";

interface FormProps {
  onClose: () => void;
  device?: Device;
}

export function Form({ onClose, device }: FormProps) {
  const { t } = useTranslation();
  const { addDevice, editDevice } = useDevice();
  const [formData, setFormData] = useState<Partial<Device>>(device || {});

  const isFormValid = useMemo(
    () => !!formData.system_name && !!formData.type && !!formData.hdd_capacity,
    [formData]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (device?.id) {
      await editDevice(formData as Device);
    } else {
      await addDevice(formData as Device);
    }
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log({
      name,
      value,
    });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="device-form">
      <div className="form-group">
        <Input
          label={t("systemName") + " *"}
          id="system_name"
          name="system_name"
          value={formData?.system_name || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <Select
          label={t("deviceType")}
          id="type"
          name="type"
          value={formData?.type || ""}
          onChange={handleChange}
          options={DeviceTypeForm}
        />
      </div>

      <div className="form-group">
        <Input
          label={t("hddCapacity") + " *"}
          id="hdd_capacity"
          name="hdd_capacity"
          type="number"
          value={formData?.hdd_capacity || ""}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} className="cancel-button">
          {t("cancel")}
        </button>
        <button type="submit" className="submit-button" disabled={!isFormValid}>
          {t("submit")}
        </button>
      </div>
    </form>
  );
}
