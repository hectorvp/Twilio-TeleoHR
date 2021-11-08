const XLSX = require("xlsx"); // reference https://docs.sheetjs.com/

class ExcelHandler {
  constructor(path) {
    this.path = path;

    this.candidateDetails = this.getCandidateDetails();
  }

  getCandidateDetails() {
    let workbook = XLSX.readFile(this.path);
    let firstSheetName = workbook.SheetNames[0];
    let candidateDetails = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
    return candidateDetails;
  }

  getQuestions() {
    let questions = [];
    let flag = false;
    let workbook = XLSX.readFile(this.path);
    let secondSheetName = workbook.SheetNames[1];
    let sheet = workbook.Sheets[secondSheetName];
    var range = XLSX.utils.decode_range(sheet["!ref"]);
    // Range object => { s: { c: 0, r: 0 }, e: { c: 0, r: 7 } }    s=start e=end c=column and r=row

    for (let rows = range.s.r; rows <= range.e.r; rows++) {
      let val =
        sheet[
          XLSX.utils.encode_cell({
            c: 0,
            r: rows,
          })
        ];

      if (!val) continue;

      if (val.v == "Questions") {
        flag = true;
        continue;
      }

      if (val.v == "Exit") {
        flag = false;
        break;
      }
      if (flag) questions.push(val.v); // v = raw value
    }

    return questions;
  }
}

module.exports = ExcelHandler;
