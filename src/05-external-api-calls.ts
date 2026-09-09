
const API_URL = "https://nzv2q82m-5003.inc1.devtunnels.ms/users";

type PlaceholderUser = {
    id: number;
    name: string;
    email: string;
    company: {
        name: string;
    };
};

type PublicUser = {
    id: number;
    name: string;
    email: string;
    company: string;
};

function transformUser(rawData: PlaceholderUser): PublicUser {
    return {
        id: rawData.id,
        name: rawData.name,
        email: rawData.email,
        company: rawData.company.name,
    };
}

async function fetchExternalUser(): Promise<void> {
    // AbortController lets us cancel an in-progress fetch request
    const controller = new AbortController();

    const timeOut = setTimeout(() => {
        controller.abort();
    }, 5000);

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            signal: controller.signal,
        });

        if (!response.ok) {
            console.error(`Upstream API failed with HTTP ${response.status}`);
            return;
        }

        const rawUser = (await response.json()) as PlaceholderUser;

        const user = transformUser(rawUser);

        console.log(user);
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            console.error(
                "Request failed: upstream API took too long"
            );
            return;
        }

        const message =
            error instanceof Error ? error.message : "Unknown error";

        console.error("External API failed:", message);
    } finally {
        clearTimeout(timeOut);
    }
}

fetchExternalUser();

