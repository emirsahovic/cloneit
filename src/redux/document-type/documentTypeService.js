import axios from "axios";
import apiService from "../apiService";
//GET DOCUMENT TYPES
const getDocumentType = async () => {
  const response = await apiService.get("/document-types");
  return response.data.data;
};

//GET SPECIFIC DOCUEMNT
const getSpecificDocument = async (id) => {
  const response = await apiService.get(`/document-types/${id}`);
  return response.data.data;
};


//SAVE DOCUMENT
const saveDocument = async (data) =>{
  const response = await apiService.post(`/document`, data, {withCredentials: true});
  return response.data.data;
}


const documentTypeService = {
  getDocumentType,
  getSpecificDocument,
  saveDocument
};

export default documentTypeService;
