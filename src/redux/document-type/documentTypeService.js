import apiService from "../apiService";

//GET DOCUMENT TYPE
const getDocumentType = async () => {
  const response = await apiService.get("/document-types");
  return response.data.data;
};

const documentTypeService = {
  getDocumentType,
};

export default documentTypeService;
