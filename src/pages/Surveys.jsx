import React, { useEffect } from "react";
import "survey-core/defaultV2.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import {useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificDocument, saveData } from "../redux/document-type/documentTypeSlice";

StylesManager.applyTheme("defaultV2");
function Surveys() {
  const { isSuccessLogin } = useSelector((state) => state.auth);
  const { specificDocument } = useSelector((state) => state.documentType);
  const { id } = useParams();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  let survey = null;
  if (specificDocument) {
    survey = new Model(specificDocument.content);
  }
  var storageName = null;
  if (specificDocument) {
    storageName = specificDocument.id || "temporrary_data";
  }
  function saveSurveyData(survey) {
    var data = survey.data;
    data.pageNo = survey.currentPageNo;
    if (isSuccessLogin) {
      window.localStorage.removeItem("temporrary_data");
      dispatch(saveData({document_type: id, document: data}))
    } else {
      let alert = window.confirm("You are not logged in, please login");

      if (alert) {
        window.localStorage.setItem("temporrary_data", JSON.stringify(data));
        navigation("/signin", {state: {from:{pathname: `/survey/${id}` }}});
      } else {
        navigation("/");
      }
    }
  }

  // survey.onPartialSend.add(function (sender) {
  //   saveSurveyData(sender);
  // });

  survey.onComplete.add(function (sender, options) {
    saveSurveyData(sender);
  });

  if (specificDocument) {
    
    
    survey.sendResultOnPageNext = true;
    var prevData =
      window.localStorage.getItem(id) ||
      window.localStorage.getItem("temporrary_data") ||
      null;
    if (prevData && isSuccessLogin) {
      var data = JSON.parse(prevData);
      survey.data = data;
      if (data.pageNo) {
        survey.currentPageNo = data.pageNo;
      }
    }
  }

  useEffect(() => {
    dispatch(getSpecificDocument(id));
  }, []);

  return (
    <div>
      {survey && specificDocument && <Survey model={survey} />}
      <div className="sd-action-bar sd-footer sd-body__navigation sd-clearfix">
        <div className="sv-action w-full flex justify-center" id="sv-nav-prev">
          <div className="sv-action__content">
            <button
              onClick={() => saveSurveyData(survey)}
              className="sd-btn sd-navigation__prev-btn"
              type="button"
            >
              Save and countinue later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Surveys;
