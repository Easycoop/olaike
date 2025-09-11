import toastManager from '../components/ui/toast/ToasterManager';

const copyToClipBoard = async (text) => {
    await navigator.clipboard.writeText(text)
    toastManager.addToast({
      message: `copied`,
      type: "success",
  });
}

const generateRandomString = async (num) => {
    const length = num;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};

const genders = [
  { id: "Male", name: "Male" },
  { id: "Female", name: "Female" },
];

export {copyToClipBoard, generateRandomString, genders};

