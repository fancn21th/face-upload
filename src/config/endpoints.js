const protocol = "http";
const domain = "10.3.69.41";
const port = ":8010";
const urlPrefix = `${protocol}://${domain}${port}`;
export const ADD_TASK = `${urlPrefix}/add_task`;
export const SIGNUP_TASK = `${urlPrefix}/signup_task`;
export const REMOVE_TASK = `${urlPrefix}/remove_task`;
