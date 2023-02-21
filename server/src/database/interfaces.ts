// client management
export interface UserSchema {
    id: string,
    firstName: string,
    lastName: string,
    companyName: string,
    siret: string,
    tel: string,
    email: string,
    profile_image: string,
    banner: string,
    password: string,
    billing_addr: Array<string>,
    website: string,
    createdAt: string,
    lastLogin: string, 
    modifiedAt: string, 
    role: string,
    public: boolean,
    subscriptionId: string,
    auditId: string,
    idGraphicOrders: Array<string>,
    sitesVitrineOrders: Array<string>,
    sitesEcomOrders: Array<string>,
    sitesMesureOrders: Array<string>, 
}

export interface MailListSchema {
    email: string,
}

export interface Addresses {
    id: string,
    userId: string,
    address: string,
    city: string,
    region: string,
    postcode: string,
}

// orders management
// subscription
export interface SubscriptionOrderSchema {
    id: string,
    customerId: string,
    price: number,
    type: string,
    category: string,
    questDejaIdGraph: boolean,
    questSecteurActivite: string,
    questObjectiveCreation: string,
    instagram: boolean,
    facebook: boolean,
    linkedin: boolean,
    tiktok: boolean,
    linkInstagram: string,
    linkFacebook: string,
    linkLinkedin: string,
    linkTiktok: string,
    infoSuppl: string,
    createdAt: string,
    isActive: boolean,
    expirationDate: string,
}

// graphical id
export interface IdGraphicOrderSchema {
    id: string,
    customerId: string,
    category: string,
    createdAt: string,
    oldLogoDir: string,
    newLogo: string,
    newCarteVisite: string,
    newFlyer: string,
    newDeplyant: string,
    newDeclinaisonResaux: string,
    newIdGraphComplete: string,
    newMoreInfo: string,
    questDejaIdGraph: string,
    questSecteurActivite: string,
    questObjectiveCreation: string,
    status: string, // toContact, inProgress, sentProposition, signedProposition, completed 
}

// websites/web apps
export interface SiteVitrineSchema {
    id: string,
    customerId: string,
    category: string,
    createdAt: string,
    oldSiteUrl: string,
    newSiteUrl: string,
    questDejaSite: boolean,
    questSecteurActivite: string,
    questObjectiveSite: string,
    questPossedezIdGraph: boolean,
    questNumPages: string,
    newMoreInfo: string,
    status: string, // toContact, inProgress, sentProposition, signedProposition, completed,
}

export interface SiteEComSchema {
    id: string,
    customerId: string,
    category: string,
    createdAt: string,
    oldSiteUrl: string,
    newSiteUrl: string,
    questDejaSite: boolean,
    questSecteurActivite: string,
    questObjectiveSite: string,
    questPossedezIdGraph: boolean,
    questNumCategories: string,
    questNumProducts: string,
    newMoreInfo: string,
    status: string, // toContact, inProgress, sentProposition, signedProposition, completed 
}

export interface SiteMesureSchema {
    id: string,
    customerId: string,
    category: string,
    createdAt: string,
    newSiteUrl: string,
    questDejaSite: boolean,
    questSecteurActivite: string,
    questObjectiveSite: string,
    questNumUsers: string,
    newMoreInfo: string,
    status: string, // toContact, inProgress, sentProposition, signedProposition, completed 
}