const Submissions = require("../db/Submissions");

module.exports = async ({ submissionId, action }) => {
  try {
    const res = await Submissions.update(
      {
        status: action === "approve" ? "approved" : "rejected",
      },
      {
        where: {
          id: submissionId,
        },
      }
    );

    return res;
  } catch (err) {
    console.error(`Error ${action} submission -util`);
    return;
  }
};
