import React from "react";
import { useParams } from "react-router-dom";

const LanguagePage = () => {
  const { language } = useParams();

  return (
    <div>
      <h1>{language?.toUpperCase()} Language Page</h1>
    </div>
  );
};

export default LanguagePage;
