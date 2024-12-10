import { Driver } from "./driver";

export class Package {
    _id: string;
    package_id: string;
    package_title: string;
    package_weight: string;
    package_destination: string;
    description: string;
    package_createdAt: string;
    isAllocated: boolean;
    driver_id: any;

    constructor(title: string, weight: string, destination: string, description: string, isAllocated: boolean, driver: string) {
        this._id = '########################';
        this.package_id = '###-###-###';
        this.package_title = title;
        this.package_weight = weight;
        this.package_destination = destination;
        this.description = description;
        this.package_createdAt = '';
        this.isAllocated = isAllocated;
        this.driver_id = driver;
    }
}