let domain = null;
const version = process.env.VERSION_API || 'v1';
if (process.env.NODE_ENV === 'development') {
    domain = `//${process.env.DOMAIN_API || 'localhost:8082'}/`;
} else {
    var url = window.location.href;
    domain = url.split('#')[0];
}

export const _SERVER = {
    baseUrl: domain,
    apiUrl: `${domain}api/${version}`,
    publicUrl: `${domain}api/public`
};

export const _KEYS = {
    SESSION: process.env.SESSION || '###',
    SECRET: process.env.SECRET || '###',
    IV: process.env.IV || '###',
    ENCODING: process.env.ENCODING || '###',
    TOKEN: process.env.TOKEN || '###'
};
