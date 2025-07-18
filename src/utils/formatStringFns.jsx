const capitalize = (string) => {
    if (!string) return '';
    const words = string.split(' ');

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    
    return words.join(' ');
}

export default function formatStrings() {
    return {
        capitalize
    }
}