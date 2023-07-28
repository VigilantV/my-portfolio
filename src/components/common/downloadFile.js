import resumeFile from "../../data files/Mehrab_Gheibi_Resume.pdf";

const downloadFile = () => {
  const aTag = document.createElement("a");
  aTag.href = resumeFile;
  aTag.setAttribute("download", "Mehrab_Gheibi_Resume");
  document.body.appendChild(aTag);
  aTag.click();
  aTag.remove();
};

export default downloadFile;
