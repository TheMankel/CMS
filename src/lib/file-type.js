export const verifyImage = async (file) => {
  if (!file) return;

  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    let status;

    fileReader.onloadend = async (e) => {
      try {
        if (e.target.readyState === FileReader.DONE) {
          const uint = new Uint8Array(e.target.result);
          const bytes = [];

          uint.forEach((byte) => {
            bytes.push(byte.toString(16));
          });

          const hex = bytes.join('').toUpperCase();
          console.log(hex);

          switch (hex) {
            case 'FFD8FFE0': //jpg
              status = 'Ok';
              break;
            case '3C3F786D': //png
              status = 'Ok';
              break;
            case '00020': //avif
              status = 'Ok';
              break;
            default:
              status = 'Error';
          }

          resolve(status);
        }
      } catch (err) {
        reject(err);
      }
    };

    const blob = file.slice(0, 4);
    fileReader.readAsArrayBuffer(blob);
  });
};
