export function isEmptyObj(obj: any): boolean {
    if (obj == null) return true;

    if (typeof obj === "string" || Array.isArray(obj)) {
        if ((obj as any).length > 0) return false;
        if ((obj as any).length === 0) return true;
    }

    if (typeof obj !== "object") return true;

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

export function getImportantUrlPart(url: string = ""): string{
    let result = url;

    if (!url.startsWith('https://www.youtube.com/')){
        if (url.includes('?')){
            result = url.split('?')[0];
        }
    }

    return result;
}

export function isArrWithContent<T>(arr: T[] | undefined | null): arr is T[] {
    return Array.isArray(arr) && arr.length > 0;
}

export function isEqualArrays<T>(arr1: T[] | undefined | null, arr2: T[] | undefined | null): boolean {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
}

export function addDefaultAvatar(e: React.SyntheticEvent<HTMLImageElement, Event>): void {
    e.currentTarget.src = "/avatar.png";
}

export type WebsiteCategory = "SocialMedia" | "News" | "Ai" | "Videos" | "Politics" | "Education" | "Other";

// export function getWebsiteCategory(url: string): WebsiteCategory {
//     try {
//         const domain = new URL(url).hostname.toLowerCase();

//         const socialMediaDomains = [
//             "facebook.com",
//             "instagram.com",
//             "twitter.com",
//             "x.com",
//             "tiktok.com",
//             "linkedin.com",
//             "snapchat.com",
//             "pinterest.com",
//             "reddit.com",
//             "threads.net",
//         ];

//         const newsDomains = [
//             "cnn.com",
//             "bbc.com",
//             "nytimes.com",
//             "theguardian.com",
//             "washingtonpost.com",
//             "reuters.com",
//             "forbes.com",
//             "bloomberg.com",
//             "huffpost.com",
//             "foxnews.com",
//         ];

//         const aiDomains = [
//             "openai.com",
//             "chat.openai.com",
//             "perplexity.ai",
//             "anthropic.com",
//             "claude.ai",
//             "huggingface.co",
//             "character.ai",
//             "civitai.com",
//         ];

//         const videoDomains = [
//             "youtube.com",
//             "vimeo.com",
//             "dailymotion.com",
//             "twitch.tv",
//             "rumble.com",
//         ];

//         const politicsDomains = [
//             "politico.com",
//             "thehill.com",
//             "newsmax.com",
//             "breitbart.com",
//             "msnbc.com",
//             "npr.org",
//             "c-span.org",
//         ];

//         const educationDomains = [
//             "coursera.org",
//             "edx.org",
//             "khanacademy.org",
//             "udemy.com",
//             "udacity.com",
//             "skillshare.com",
//             "futurelearn.com",
//             "academic.oup.com",
//             "harvard.edu",
//             "mit.edu",
//         ];

//         if (socialMediaDomains.some(d => domain.endsWith(d))) return "SocialMedia";
//         if (newsDomains.some(d => domain.endsWith(d))) return "News";
//         if (aiDomains.some(d => domain.endsWith(d))) return "Ai";
//         if (videoDomains.some(d => domain.endsWith(d))) return "Videos";
//         if (politicsDomains.some(d => domain.endsWith(d))) return "Politics";
//         if (educationDomains.some(d => domain.endsWith(d))) return "Education";
//         return "Other";

//     } catch (error) {
//         return "Other";
//     }
// }