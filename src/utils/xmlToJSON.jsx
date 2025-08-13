import { XMLParser } from 'fast-xml-parser';

export default function parseSitemap(xml, domain = '') {
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
    });

    const parsed = parser.parse(xml);
    console.log('PARSED', parsed);
    
    const urls = parsed.urlset.url.map((entry) => {
        const updatedLoc = entry.loc.replace(/placeholder/g, domain);
        return {
            ...entry,
            loc: updatedLoc
        };
    });

    return urls;
}