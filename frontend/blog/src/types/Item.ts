export type Item = {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    content: {
        type: "paragraph";
        children: {
            type: "text";
            text: string;
        }[];
    }[];
    publishStatus: "draft" | "published" | "archived";
    coverImage: {
        id: number;
        documentId: string;
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: {
            thumbnail: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
            small: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
            medium: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
            large: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
        };
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any | null;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
    comments: {
        id: number;
        documentId: string;
        content: string;
        authorName: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }[];
    author: {
        id: number;
        documentId: string;
        username: string;
        email: string;
        provider: string;
        confirmed: boolean;
        blocked: boolean;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
};
