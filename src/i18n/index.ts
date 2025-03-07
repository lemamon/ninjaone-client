import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          addDevice: "Add device",
          editDevice: "Edit device",
          deleteDevice: "Delete device?",
          systemName: "System Name",
          deviceType: "Device Type",
          hddCapacity: "HDD Capacity (GB)",
          cancel: "Cancel",
          submit: "Submit",
          delete: "Delete",
          edit: "Edit",
          devices: "Devices",
          search: "Search",
          sortBy: "Sort by",
          sortByHDDDesc: "Sort by: HDD Capacity (Descending)",
          sortByHDDAsc: "Sort by: HDD Capacity (Ascending)",
          deleteConfirmation:
            "You are about to delete the device {{deviceName}}. This action cannot be undone.",
          deviceCreated: "Device created successfully",
          deviceUpdated: "Device updated successfully",
          deviceDeleted: "Device deleted successfully",
        },
      },
      pt: {
        translation: {
          addDevice: "Adicionar dispositivo",
          editDevice: "Editar dispositivo",
          deleteDevice: "Excluir dispositivo?",
          systemName: "Nome do Sistema",
          deviceType: "Tipo do Dispositivo",
          hddCapacity: "Capacidade do HD (GB)",
          cancel: "Cancelar",
          submit: "Enviar",
          delete: "Excluir",
          edit: "Editar",
          devices: "Dispositivos",
          search: "Buscar",
          sortBy: "Ordenar por",
          sortByHDDDesc: "Ordenar por: Capacidade do HD (Decrescente)",
          sortByHDDAsc: "Ordenar por: Capacidade do HD (Crescente)",
          deleteConfirmation:
            "Você está prestes a excluir o dispositivo {{deviceName}}. Esta ação não pode ser desfeita.",
          deviceCreated: "Dispositivo criado com sucesso",
          deviceUpdated: "Dispositivo atualizado com sucesso",
          deviceDeleted: "Dispositivo excluído com sucesso",
        },
      },
    },
  });

export default i18n;