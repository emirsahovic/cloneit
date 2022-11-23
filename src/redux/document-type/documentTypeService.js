import axios from "axios";

//GET DOCUMENT TYPE
const getDocumentType = async () => {
  const response = await axios.get("/document-types");
  return response.data.data;
};

const documentTypeService = {
  getDocumentType,
};

export default documentTypeService;
