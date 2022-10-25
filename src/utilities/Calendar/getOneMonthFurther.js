let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
today = yyyy + "-" + mm + "-" + dd + "T08:00";
let newMM = +mm + 1;
if (newMM < 10) {
  newMM = "0" + newMM;
}
export const maxDate = yyyy + "-" + newMM + "-" + dd + "T08:00";
