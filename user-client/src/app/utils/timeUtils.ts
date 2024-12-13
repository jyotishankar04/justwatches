import moment from "moment";

const timeAgo = (inputTime: string) => {
  return moment(inputTime).fromNow();
};
const getFormtedTime = (inputTime: string) => {
  return moment(inputTime).format("DD-MM-YYYY");
};

export { timeAgo, getFormtedTime };
