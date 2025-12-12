export class User {
    id: string;
    loginId: string;
    email: string;
    phoneNumber?: string | null;
    countryCode: string;
    profileType: string;
    gender: string;
    birthDay: Date;
    height: number;
    name?: string | null;
    profileImgUrl?: string | null;
    createAccountDate: Date;
    recentMeasureDate?: Date | null;
    recentLoginDate?: Date | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    password?: string;
}
