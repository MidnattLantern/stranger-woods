type ISaveProfile = {
    name: string,
    id: string
}

const mockData: ISaveProfile[] = [
    {
        name: "testuser1",
        id: "test-id-1"
    },
    {
        name: "testuser2",
        id: "test-id-2"
    },
    {
        name: "testuser3",
        id: "test-id-3"
    }
]

function setMockData() {
    localStorage.setItem("saveProfiles", JSON.stringify(mockData));
}

function createSaveProfile(newName: string) {
    if (!newName) return;

    const existingSaveProfilesDirectory = localStorage.getItem("saveProfiles");
    const newSaveProfile: ISaveProfile = {
        name: newName,
        id: crypto.randomUUID()
    }
    const saveProfilesDirectory: ISaveProfile[] =
        existingSaveProfilesDirectory ? JSON.parse(existingSaveProfilesDirectory) : [];
    saveProfilesDirectory.push(newSaveProfile);

    localStorage.setItem("saveProfiles", JSON.stringify(saveProfilesDirectory));
}

function getSaveProfiles() {
    const saveProfileData = localStorage.getItem("saveProfiles");
    if (!saveProfileData) return;
    return JSON.parse(saveProfileData);
}

export const localstorageDB = {
    setMockData,
    getSaveProfiles,
    createSaveProfile
}