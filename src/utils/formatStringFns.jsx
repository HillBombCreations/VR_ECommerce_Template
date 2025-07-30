const capitalize = (string) => {
    if (!string) return '';
    const words = string.split(' ');

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    
    return words.join(' ');
}

const formatPhoneNumber = (phone) => {
  if (!phone || phone.length !== 10) return phone;
  return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
};

export default function formatStrings() {
    return {
        capitalize,
        formatPhoneNumber
    }
}