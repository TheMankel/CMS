import axios from 'axios';

export const getData = async (url, handleState, handleLoading = () => {}) => {
  handleLoading(true);
  try {
    const res = await axios.get(`http://localhost:8000/api/${url}`);

    const { data } = res;

    if (!data) return;

    handleState(data);

    // return data;
  } catch (err) {
    console.log(err);
  }
  handleLoading(false);
};
