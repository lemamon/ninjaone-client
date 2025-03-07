import { useState, useMemo } from "react";
import { useDevice } from "../../contexts/DeviceContext";
import { useTranslation } from "react-i18next";
import { Device, DeviceTypeForm } from "../../types";
import { Select } from "../Select";
import { Input } from "../Input";
import { Button } from "../Button";

import "./styles.css";

interface FormProps {
  onClose: () => void;
  device?: Device;
  onSuccess?: (message: string) => void;
}

export function Form({ onClose, device, onSuccess }: FormProps) {
  const { t } = useTranslation();
  const { addDevice, editDevice } = useDevice();
  const [formData, setFormData] = useState<Partial<Device>>(() => ({
    system_name: device?.system_name || "",
    type: device?.type || "",
    hdd_capacity: device?.hdd_capacity || "",
  }));

  const isFormValid = useMemo(
    () => !!formData.system_name && !!formData.type && !!formData.hdd_capacity,
    [formData]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      hdd_capacity: String(formData.hdd_capacity),
    };

    if (device?.id) {
      await editDevice({ ...submissionData, id: device.id } as Device);
      onSuccess?.(t("deviceUpdated"));
    } else {
      await addDevice(submissionData as Device);
      onSuccess?.(t("deviceCreated"));
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
          value={formData.system_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <Select
          label={t("deviceType")}
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={DeviceTypeForm}
        />
      </div>

      <div className="form-group">
        <Input
          label={t("hddCapacity") + " *"}
          id="hdd_capacity"
          name="hdd_capacity"
          type="text"
          value={formData.hdd_capacity}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <Button type="button" onClick={onClose} className="cancel-button">
          {t("cancel")}
        </Button>
        <Button type="submit" className="submit-button" disabled={!isFormValid}>
          {t("submit")}
        </Button>
      </div>
    </form>
  );
}
