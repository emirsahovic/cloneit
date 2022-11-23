import React from "react";
import "survey-core/defaultV2.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useLocation } from "react-router-dom";

StylesManager.applyTheme("defaultV2");
function Surveys() {
  const location = useLocation();
  let survey = null;
  if (location.state) {
    survey = new Model(location.state.json);
  }

  var storageName = location.state.id;
  function saveSurveyData(survey) {
    var data = survey.data;
    data.pageNo = survey.currentPageNo;
    window.localStorage.setItem(storageName, JSON.stringify(data));
  }

  // survey.onPartialSend.add(function (sender) {
  //   saveSurveyData(sender);
  // });

  // survey.onComplete.add(function (sender, options) {
  //   saveSurveyData(sender);
  // });

  survey.sendResultOnPageNext = true;
  var prevData = window.localStorage.getItem(storageName) || null;
  if (prevData) {
    var data = JSON.parse(prevData);
    survey.data = data;
    if (data.pageNo) {
      survey.currentPageNo = data.pageNo;
    }
  }

  return (
    <div className="h-screen overflow-y-scroll">
      {survey && <Survey model={survey} />}
      <div className="sd-action-bar sd-footer sd-body__navigation sd-clearfix">
        <div className="sv-action" id="sv-nav-prev">
          <div className="sv-action__content">
            <button onClick={() => saveSurveyData(survey)} className="sd-btn sd-navigation__prev-btn" type="button">
              Save and countinue later
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Surveys;
