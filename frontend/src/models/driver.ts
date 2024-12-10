import { Package } from "./package";

export class Driver {
    _id: string;
    driver_id: string;
    driver_name: string;
    driver_department: string;
    driver_licence: string;
    driver_isActive: boolean;
    driver_createdAt: string;
    assigned_packages: Package[];

    constructor(name: string, department: string, licence: string, isActive: boolean) {
        this._id = '########################';
        this.driver_id = '###-###-###';
        this.driver_name = name;
        this.driver_department = department;
        this.driver_licence = licence;
        this.driver_isActive = isActive;
        this.driver_createdAt = '';
        this.assigned_packages = []
    }
}