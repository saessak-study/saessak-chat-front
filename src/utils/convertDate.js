export const convertTime = ({ date }) => {
  return new Date(date).toTimeString().split(' ')[0];
};

export const convertDate = ({ date }) => {
  return new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-');
};
