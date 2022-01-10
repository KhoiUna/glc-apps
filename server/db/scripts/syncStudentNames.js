require("dotenv").config();
const connection = require("../connection");

const updateBackupStudentNamesTable = async () => {
  await connection.query("truncate backup_student_names restart identity;");
  await connection.query(
    "insert into backup_student_names(full_name) select distinct full_name from students order by full_name;"
  );
  return true;
};

const updateStudentsTable = async () => {
  await connection.query(
    "truncate students, submissions, reservations restart identity;"
  );
  await connection.query(
    "insert into students(full_name) select distinct full_name from backup_student_names order by full_name;"
  );
  return true;
};
//Only run this function when launched after that no more!
const syncStudentNames = async (firstTime = false) => {
  if (firstTime) {
    if (await updateBackupStudentNamesTable()) await updateStudentsTable();
    return true;
  } else {
    console.log("Not first time");
    return;
  }
};

module.exports = {
  updateBackupStudentNamesTable,
  syncStudentNames,
};
