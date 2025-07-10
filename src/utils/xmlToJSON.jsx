export default function parseFn (xml) {
    const json = {};
    for (const res of xml.matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
        const key = res[1] || res[3];
        const value = res[2] && parseFn(res[2]);

        const currentValue = ((value && Object.keys(value).length) ? value : res[2]) || null;
        const activeVal = json[key];
        
        if (!activeVal) {
          json[key] = currentValue;
        } else if (activeVal && Array.isArray(activeVal)) {
          json[key].push(currentValue);
        } else {
          json[key] = [json[key], currentValue];
        }
    }
  
    return json;
}