import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Device } from "./types";
import { Form } from "./components/Form";
import { Modal } from "./components/Modal";
import { Header } from "./components/Header";
import { Filters } from "./components/Filters";
import { List } from "./components/List";
import { Delete } from "./components/Delete";
import { ErrorModal } from "./components/ErrorModal";
import "./App.css";

function App() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const handleAddDevice = () => {
    setSelectedDevice(null);
    setIsModalOpen(true);
  };

  const handleEditDevice = (device: Device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const handleDeleteDevice = (device: Device) => {
    setSelectedDevice(device);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedDevice(null);
  };

  return (
    <div className="container">
      <Header onAddDevice={handleAddDevice} />

      <main className="main">
        <h2>{t("devices")}</h2>
        <Filters />
        <List onEdit={handleEditDevice} onDelete={handleDeleteDevice} />
      </main>

      {isModalOpen && (
        <Modal
          title={selectedDevice ? t("editDevice") : t("addDevice")}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <Form
            onClose={handleCloseModal}
            device={selectedDevice || undefined}
          />
        </Modal>
      )}

      {isDeleteModalOpen && selectedDevice && (
        <Modal
          title={t("deleteDevice")}
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
        >
          <Delete device={selectedDevice} onClose={handleCloseDeleteModal} />
        </Modal>
      )}

      <ErrorModal />
    </div>
  );
}

export default App;
