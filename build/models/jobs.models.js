"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllJobs = exports.isValidJob = exports.getJobByName = void 0;
const jobs = {
    warrior: {
        name: "Warrior",
        hp: 20,
        strength: 10,
        dexterity: 5,
        intelligence: 5,
        attack: (stats) => 0.8 * stats.strength + 0.2 * stats.dexterity,
        speed: (stats) => 0.6 * stats.dexterity + 0.2 * stats.intelligence,
    },
    thief: {
        name: "Thief",
        hp: 15,
        strength: 4,
        dexterity: 10,
        intelligence: 4,
        attack: (stats) => 0.25 * stats.strength + stats.dexterity,
        speed: (stats) => 0.8 * stats.dexterity,
    },
    mage: {
        name: "Mage",
        hp: 12,
        strength: 5,
        dexterity: 6,
        intelligence: 10,
        attack: (stats) => 0.2 * stats.strength + 0.2 * stats.dexterity + 1.2 * stats.intelligence,
        speed: (stats) => 0.4 * stats.dexterity + 0.1 * stats.strength,
    },
};
/**
 * Get job by name
 *
 * @param name - The name of the job to retrieve.
 * @returns The Job object if found, or undefined if not found.
 */
const getJobByName = (name) => {
    try {
        const jobName = name.toLowerCase().trim();
        return jobs[jobName];
    }
    catch (error) {
        throw new Error("Job not found");
    }
};
exports.getJobByName = getJobByName;
const isValidJob = (name) => {
    try {
        const jobName = name.toLowerCase().trim();
        return jobs[jobName] ? true : false;
    }
    catch (error) {
        throw new Error("Job not available");
    }
};
exports.isValidJob = isValidJob;
const getAllJobs = () => {
    try {
        return jobs;
    }
    catch (error) {
        throw new Error("Jobs not available");
    }
};
exports.getAllJobs = getAllJobs;
