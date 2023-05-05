const AtCoderSiteStr = "AtCoder"
const CodeforcesSiteStr = "Codeforces"
const AOJSiteStr = "AOJ"
const yukicoderSiteStr = "yukicoder"
class Site {

    constructor(siteStr) {
        this.siteStr = siteStr
    }

    getStr() {
        return this.siteStr
    }

    isSame(site) {
        return this.getStr() === site.getStr()
    }
}

class SiteFactory {
    AtCoder() {
        return new Site(AtCoderSiteStr)
    }
    Codeforces() {
        return new Site(CodeforcesSiteStr)
    }
    AOJ() {
        return new Site(AOJSiteStr)
    }
    yukicoder() {
        return new Site(yukicoderSiteStr)
    }
}

export const sitefactory = new SiteFactory()
